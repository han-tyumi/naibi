/**
 * The rules a JSON Schema cannot express.
 *
 * A schema checks shape: that `players.max` is a number, that `tags` is an array
 * of known strings. It cannot check that the number and the strings agree with
 * each other, and that is where the real defects have been -- a deal table that
 * skips a player count, a diagram whose zones contradict its repeat, a "quick"
 * game that runs an hour. Every function here started as a bug someone found by
 * reading the output.
 *
 * These are pure: entries in, problem strings out, no filesystem and no exit
 * codes. validate.ts does the reading, the schema pass and the reporting; this
 * does the thinking, and is what the tests exercise.
 */

import { basename } from "node:path";

import type { CardGame } from "naibi";
import { NESTED_FIELDS, PROSE_FIELDS, fieldKind, nestedProse } from "naibi";

/** A parsed entry, before it is known to be a valid CardGame. */
export type Entry = Record<string, unknown>;

/** One entry as the validator sees it on disk. */
export type NamedEntry = { file: string; data: Entry };

/**
 * One entry twice: as it is written, and as a check read it.
 *
 * `data` is the file, which is what the schema, the filename rule and every
 * cross-file rule have to see. `read` is the same entry with its shared figures
 * spliced in -- what `loadGames` hands the originality tool, and therefore what
 * a stamp was made over.
 *
 * They are carried together because they came apart. The nested fingerprint was
 * computed from the resolved entry and the coverage line counted the written
 * one, so the four poker entries' fingerprints each covered 593 characters of
 * shared hand-ranking captions that the line reporting how much prose is
 * covered did not count. Resolving once and handing the same object to
 * everything that needs it is the remedy `nestedProse` already applied to the
 * walk.
 */
export type ReadEntry = NamedEntry & { read: Entry };

/**
 * A fingerprint of an entry's prose, over a given set of fields.
 *
 * Passed in rather than computed here, because the walk lives in `naibi` and
 * this module is the part with no filesystem and no imports of the corpus. A
 * function rather than the string it used to be, because a check record now
 * says which fields it covered and the only way to test it is to hash those
 * fields and no others. Called with nothing, it hashes everything the walk
 * reads today, which is what a record that does not say covers.
 */
export type Fingerprint = (only?: readonly string[]) => string;

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" ? value : null;
}

/** "20-45" -> [20, 45]; "60+" -> [60, null]. */
export function durationBounds(value: unknown): [number, number | null] | null {
  if (typeof value !== "string") return null;
  const range = /^(\d{1,3})-(\d{1,3})$/.exec(value);
  if (range) return [Number(range[1]), Number(range[2])];
  const open = /^(\d{1,3})\+$/.exec(value);
  if (open) return [Number(open[1]), null];
  return null;
}

/**
 * Meaning the schema cannot police: tags that contradict the numbers beside
 * them. A "solo" game that seats four, or a "quick" game that runs an hour,
 * makes the filters on the site lie to the reader.
 */
export function checkTagSemantics(data: Entry): string[] {
  const problems: string[] = [];

  const players = asRecord(data["players"]);
  const max = asNumber(players?.["max"]);
  const min = asNumber(players?.["min"]);
  const tags = Array.isArray(data["tags"]) ? (data["tags"] as string[]) : [];
  const has = (tag: string) => tags.includes(tag);

  if (max !== null) {
    if (has("solo") && max !== 1) {
      problems.push(`tagged "solo" but seats up to ${max} players`);
    }
    if (!has("solo") && max === 1) {
      problems.push(`is a 1-player game but is not tagged "solo"`);
    }
    if (data["category"] === "solitaire" && max !== 1) {
      problems.push(`category "solitaire" but seats up to ${max} players`);
    }
    if (has("partnership") && max < 4) {
      problems.push(`tagged "partnership" but seats only ${max}`);
    }
    if (has("large-group") && max < 6) {
      problems.push(`tagged "large-group" but seats only ${max}`);
    }
  }

  if (min !== null && max !== null && has("two-player") && (min > 2 || max < 2)) {
    problems.push(`tagged "two-player" but seats ${min}-${max}`);
  }

  const bounds = durationBounds(data["duration_minutes"]);
  if (bounds) {
    const [low, high] = bounds;
    if (high !== null && low >= high) {
      problems.push(`duration_minutes "${data["duration_minutes"]}" is not ascending`);
    }
    // Conventions documented in the README so filtering means something.
    if (has("quick") && high !== null && high > 30) {
      problems.push(`tagged "quick" but runs up to ${high} minutes (limit 30)`);
    }
    if (has("long-game") && high !== null && high < 60) {
      problems.push(`tagged "long-game" but tops out at ${high} minutes (needs 60)`);
    }
  }

  return problems;
}

export function checkPlayers(data: Entry): string[] {
  const players = asRecord(data["players"]);
  if (!players) return [];

  const min = asNumber(players["min"]);
  const max = asNumber(players["max"]);
  const ideal = asNumber(players["ideal"]);
  if (min === null || max === null || ideal === null) return [];

  const problems: string[] = [];
  if (min > max) {
    problems.push(`players.min (${min}) is greater than players.max (${max})`);
  }
  if (ideal < min || ideal > max) {
    problems.push(`players.ideal (${ideal}) is outside the range ${min}-${max}`);
  }
  return problems;
}

/**
 * A variant may serve a different table from the game it belongs to — Officers'
 * Skat is two-handed inside a three-to-four player entry, Six-handed 500 is six
 * inside a three-to-five. The picker offers those rows, so the range has to be a
 * real range, has to actually differ from the game's own (a restatement would
 * just double the game's rows), and where it seats MORE it has to say what that
 * costs in packs.
 *
 * That last rule is the one worth having. It is what keeps the picker from
 * offering a game the reader cannot pack for, which is the one thing it must
 * never do — and it makes that checkable rather than a matter of care.
 */
export function checkVariantPlayers(data: Entry): string[] {
  const players = asRecord(data["players"]);
  const variants = Array.isArray(data["variants"]) ? data["variants"] : [];
  if (!players || variants.length === 0) return [];

  const gameMin = asNumber(players["min"]);
  const gameMax = asNumber(players["max"]);
  if (gameMin === null || gameMax === null) return [];

  const equipment = asRecord(data["equipment"]) ?? {};
  const steps = asRecord(equipment["decks_by_players"]);
  const covered = Object.keys(steps ?? {}).map(Number);

  const problems: string[] = [];
  for (const raw of variants) {
    const variant = asRecord(raw);
    if (!variant) continue;
    const range = asRecord(variant["players"]);
    if (!range) continue;

    const name = typeof variant["name"] === "string" ? variant["name"] : "a variant";
    const min = asNumber(range["min"]);
    const max = asNumber(range["max"]);
    if (min === null || max === null) continue;

    if (min > max) {
      problems.push(`variant "${name}": players.min (${min}) is greater than players.max (${max})`);
      continue;
    }
    if (min === gameMin && max === gameMax) {
      problems.push(`variant "${name}": player range ${min}-${max} does not differ from the game's`);
      continue;
    }
    // decks_by_players is read as "the value for the largest key at or below the
    // table size", so a key at 5 already answers for 8. What it must not be is a
    // key inside the game's own range: that speaks to the main game and says
    // nothing about the extension the variant is asking the picker to offer.
    if (max > gameMax && !covered.some((key) => key > gameMax && key <= max)) {
      problems.push(
        `variant "${name}": seats up to ${max} but no decks_by_players entry covers past ${gameMax}`,
      );
    }
  }
  return problems;
}

/**
 * A reference to a figure that does not exist resolves to nothing, so the entry
 * silently loses a figure it believes it has. Cheap to catch, invisible if not.
 */
export function checkFigureRefs(data: Entry, shared: ReadonlySet<string>): string[] {
  const refs = data["figure_refs"];
  if (!Array.isArray(refs)) return [];

  return refs
    .filter((id) => typeof id === "string" && !shared.has(id))
    .map((id) => `figure_refs names "${id}", which is not in shared/figures.json`);
}

/**
 * Zero standard decks means the game needs a pack you cannot build from
 * ordinary cards, so it has to say which one -- otherwise the entry claims you
 * need no cards at all.
 */
export function checkEquipment(data: Entry): string[] {
  const equipment = asRecord(data["equipment"]);
  if (!equipment) return [];

  if (equipment["standard_decks"] === 0 && !equipment["special_deck"]) {
    return [
      "equipment.standard_decks is 0, so equipment.special_deck must name the " +
        "pack the game needs",
    ];
  }
  return [];
}

/**
 * A deal table has to answer the question for every group that can play.
 *
 * This was a real defect: 500 Rummy seats 2 to 8 but its table stopped at 5,
 * so a table of six looked it up and found nothing. A gap is worse than no
 * table at all, because the reader trusts it and comes away misinformed.
 */
export function checkDeal(data: Entry): string[] {
  const deal = data["deal"];
  if (!Array.isArray(deal)) return [];

  const players = asRecord(data["players"]);
  const min = asNumber(players?.["min"]);
  const max = asNumber(players?.["max"]);
  if (min === null || max === null) return [];

  const problems: string[] = [];
  const listed = new Set<number>();

  for (const row of deal) {
    const count = asRecord(row)?.["players"];
    if (typeof count !== "number") continue;
    if (listed.has(count)) {
      problems.push(`deal lists ${count} players more than once`);
    }
    listed.add(count);
    if (count < min || count > max) {
      problems.push(`deal covers ${count} players, outside the game's ${min}-${max}`);
    }
  }

  const missing: number[] = [];
  for (let count = min; count <= max; count += 1) {
    if (!listed.has(count)) missing.push(count);
  }
  if (missing.length > 0) {
    problems.push(
      `deal has no row for ${missing.join(", ")} ` +
        `player${missing.length === 1 && missing[0] === 1 ? "" : "s"}, ` +
        `but the game seats ${min}-${max}`,
    );
  }

  return problems;
}

/**
 * A layout that disagrees with itself draws a wrong diagram silently, which is
 * worse than not having one. The schema cannot tie `cards` to `repeat`.
 */
export function checkLayout(data: Entry): string[] {
  const layout = asRecord(data["layout"]);
  if (!layout) return [];

  const problems: string[] = [];
  const rows = Array.isArray(layout["rows"]) ? layout["rows"] : [];

  rows.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) return;
    row.forEach((zone, zoneIndex) => {
      const z = asRecord(zone);
      if (!z) return;
      const where = `layout.rows[${rowIndex}][${zoneIndex}]`;
      const repeat = typeof z["repeat"] === "number" ? z["repeat"] : 1;

      if (Array.isArray(z["cards"]) && z["cards"].length !== repeat) {
        problems.push(
          `${where}: cards has ${z["cards"].length} entries but repeat is ${repeat}`,
        );
      }

      if (z["kind"] === "gap" && (z["label"] || z["cards"] || z["face"])) {
        problems.push(`${where}: a gap is a spacer and takes no label, cards or face`);
      }
    });
  });

  // A diagram cannot overlap more rows than it has, and one overlapping row is
  // a contradiction in terms: it has nothing to overlap.
  const overlapping = asNumber(layout["overlapping_rows"]);
  if (overlapping !== null && overlapping > rows.length) {
    problems.push(
      `layout.overlapping_rows is ${overlapping} but there are only ${rows.length} rows`,
    );
  }

  return problems;
}

/**
 * An entry whose prose moved on after it was checked.
 *
 * This is the one that stops the record becoming a comfortable lie. Anyone can
 * rewrite a rule after a check and leave the date sitting there; the fingerprint
 * makes that visible instead of silent. Re-read the entry against its sources
 * and re-stamp it, or drop the record — but do not leave it claiming cover it
 * no longer has.
 *
 * `checked.reworded` is the one case where the prose is allowed to have moved
 * without the check moving with it: a wording-only rewrite, which is what
 * removing a verbatim run is. It amends rather than replaces — `checked.prose`
 * goes on naming the text that was read against the sources — so the rule below
 * stays unconditional, and an entry edited after the amendment reports as
 * changed exactly as one edited after a check does. See
 * docs/decisions/0025-a-wording-fix-amends-the-check.md.
 */
export function checkChecked(
  data: Entry,
  fingerprint: Fingerprint | null,
  nestedFingerprint: Fingerprint | null = null,
): string[] {
  const checked = asRecord(data["checked"]);
  if (!checked || fingerprint === null) return [];

  const attributed = new Set(
    Array.isArray(data["sources_consulted"]) ? (data["sources_consulted"] as string[]) : [],
  );

  // The nested record is the same record over a different set of fields, so it
  // gets the same rules rather than a second set that could drift from them.
  // 0026 chose the shape for exactly this reason.
  const nested = asRecord(checked["nested"]);
  if (nested && nestedFingerprint !== null) {
    const problems = checkRecord(
      nested,
      nestedFingerprint,
      NESTED_FIELDS,
      attributed,
      "checked.nested",
      "nested prose",
    );
    if (problems.length > 0) return problems;
  }

  return checkRecord(checked, fingerprint, PROSE_FIELDS, attributed, "checked", "prose");
}

/**
 * One check record against the prose it claims to cover.
 *
 * Shared by `checked` and `checked.nested`, which differ only in which fields
 * they fingerprint. `label` names the record in a message and `what` names the
 * prose, so a reader is sent to the right half of a two-part stamp.
 */
function checkRecord(
  checked: Record<string, unknown>,
  fingerprint: Fingerprint,
  walk: readonly string[],
  attributed: ReadonlySet<string>,
  label: string,
  what: string,
): string[] {
  const reworded = asRecord(checked["reworded"]);
  if (reworded) {
    // A no-op amendment records a rewrite nobody made, which is the one way
    // this envelope could be used to say nothing while looking like a claim.
    if (reworded["prose"] === checked["prose"]) {
      return [
        `${label}.reworded repeats ${label}.prose, so it records a rewrite that did not ` +
          "happen; remove it",
      ];
    }
    if (
      typeof reworded["date"] === "string" &&
      typeof checked["date"] === "string" &&
      reworded["date"] < checked["date"]
    ) {
      return [
        `${label}.reworded is dated ${reworded["date"]}, before the check it amends ` +
          `(${checked["date"]})`,
      ];
    }
  }

  const covers = reworded ? reworded["prose"] : checked["prose"];

  // What the record says it was compared over. Absent means the record predates
  // this field, and the only honest reading of it is the one it was written
  // under: the whole walk as it stands now. That is what the comparison below
  // falls back to, and `validate` counts how many records are in that state
  // rather than letting them pass as though they had said.
  const recorded = Array.isArray(checked["fields"]) ? (checked["fields"] as string[]) : null;

  // An empty list restricts the fingerprint to the hash of the empty string,
  // which is the same sixteen characters for every entry in the corpus and
  // would match forever. The schema refuses it too; this is the half that still
  // refuses it when someone hand-edits a record past the schema.
  if (recorded && recorded.length === 0) {
    return [
      `${label}.fields is empty, so it records a check over nothing and would match any ` +
        "entry; record what the check covered, or remove the record",
    ];
  }

  // A field the record covered that the walk has since stopped reading. Decided
  // by comparing the two lists, before any fingerprint: restricting a walk to a
  // field it can no longer emit silently drops that field's passages, and the
  // comparison below would report an edit nobody made.
  const dropped = recorded?.filter((field) => !walk.includes(field)) ?? [];
  if (dropped.length > 0) {
    return [
      `${label}.fields records ${dropped.map((field) => `\`${field}\``).join(", ")}, which the ` +
        "check no longer reads; the record claims cover over prose nothing compares now",
    ];
  }

  // The edit test, over the fields the record says it covered rather than over
  // everything the walk reads today. A field that joined the walk after the
  // stamp moves the full fingerprint without a word of the entry changing, and
  // for two days that was reported as "edited since it was checked" -- on all 80
  // entries at once, 79 of which had not been edited. What is genuinely new
  // and uncovered is reported by `uncoveredByStamp` instead, which is a gap in
  // cover and not a stale record. See
  // docs/decisions/0030-a-stamp-records-which-fields-it-covered.md.
  if (fingerprint(recorded ?? undefined) !== covers) {
    return [
      reworded
        ? `${what} has been edited since the wording fix of ${reworded["date"]}; ` +
          "re-read it against its sources and re-stamp, or record the rewrite"
        : `${what} has been edited since it was checked on ${checked["date"]}; ` +
          "re-read it against its sources and re-stamp, or remove the record",
    ];
  }

  // A source that was read but never attributed is a source the reader cannot
  // follow, so `checked.sources` has to draw from `sources_consulted` rather
  // than name something of its own. The schema can require two names; only this
  // can require they be the entry's own.
  const read = checked["sources"];
  if (Array.isArray(read)) {
    const stray = read.filter((name) => !attributed.has(name as string));
    if (stray.length > 0) {
      return [
        `${label}.sources names ${stray.map((s) => `"${s}"`).join(", ")}, ` +
          "which sources_consulted does not list; add it there or correct the name",
      ];
    }
  }
  return [];
}

export function checkFilename(file: string, data: Entry): string[] {
  const id = data["id"];
  const stem = basename(file, ".json");
  if (typeof id === "string" && id !== stem) {
    return [`id "${id}" does not match filename "${basename(file)}"`];
  }
  return [];
}

/**
 * Two variants of an entry must not share a name.
 *
 * A duplicate reads as a stutter on the page and says nothing new, and the
 * schema cannot see it: both objects are individually valid. This started as a
 * bug -- an edit script renamed a variant and appended it again, and the entry
 * shipped the same paragraph twice through a green `npm run check`, found only
 * by reading `rendered/`.
 */
export function checkVariants(data: Entry): string[] {
  const variants = data["variants"];
  if (!Array.isArray(variants)) return [];
  const seen = new Set<string>();
  const problems: string[] = [];
  for (const variant of variants) {
    const name = key(asRecord(variant)?.["name"]);
    if (name === null) continue;
    if (seen.has(name)) problems.push(`two variants are both named "${name}"`);
    seen.add(name);
  }
  return problems;
}

/** Every within-entry check, in reporting order. */
export function checkEntry(
  file: string,
  data: Entry,
  shared: ReadonlySet<string>,
  fingerprint: Fingerprint | null = null,
  nestedFingerprint: Fingerprint | null = null,
): string[] {
  return [
    ...checkFilename(file, data),
    ...checkChecked(data, fingerprint, nestedFingerprint),
    ...checkPlayers(data),
    ...checkVariantPlayers(data),
    ...checkTagSemantics(data),
    ...checkLayout(data),
    ...checkDeal(data),
    ...checkEquipment(data),
    ...checkVariants(data),
    ...checkFigureRefs(data, shared),
  ];
}

function key(value: unknown): string | null {
  return typeof value === "string" ? value.trim().toLowerCase() : null;
}

/**
 * Checks that need to see the whole corpus: two entries claiming one id, two
 * claiming one name, or one claiming another's name as an alias -- which makes
 * the pair indistinguishable when searching. Where two games genuinely share a
 * name, the prose explains the clash instead.
 *
 * Returns problems per file, in the order the files were given.
 */
export function crossFileProblems(entries: readonly NamedEntry[]): string[][] {
  const problems = entries.map(() => [] as string[]);

  const idOwner = new Map<string, string>();
  const nameOwner = new Map<string, string>();

  entries.forEach(({ file, data }, index) => {
    const id = key(data["id"]);
    if (id !== null) {
      const previous = idOwner.get(id);
      if (previous) problems[index]!.push(`duplicate id, also used by ${previous}`);
      else idOwner.set(id, file);
    }

    const name = key(data["name"]);
    if (name !== null) {
      const previous = nameOwner.get(name);
      if (previous) problems[index]!.push(`duplicate name, also used by ${previous}`);
      else nameOwner.set(name, file);
    }
  });

  // Second pass: an alias can collide with a name defined in any file, including
  // one read later, so every name has to be known before this can run.
  entries.forEach(({ data }, index) => {
    const aliases = Array.isArray(data["aliases"]) ? (data["aliases"] as string[]) : [];
    const own = key(data["name"]);
    for (const alias of aliases) {
      const aliasKey = key(alias);
      if (aliasKey === null || aliasKey === own) continue;
      const owner = nameOwner.get(aliasKey);
      if (owner) {
        problems[index]!.push(
          `alias "${alias}" is the name of another game (${owner}); ` +
            `explain the clash in the prose instead`,
        );
      }
    }
  });

  return problems;
}

/**
 * What the index card prints under a game's name, as one comparable string.
 *
 * Not the card's markup -- the four facts a reader picks between two games
 * with. Kept here beside the alias reading it serves, and deliberately not
 * importing the site's own formatting: this is "are these two rows different",
 * not "what exactly do they say".
 */
function cardFacts(data: Entry): string {
  const players = asRecord(data["players"]);
  return [
    `${players?.["min"] ?? "?"}-${players?.["max"] ?? "?"}`,
    String(data["duration_minutes"] ?? "?"),
    String(data["difficulty"] ?? "?"),
    String(data["category"] ?? "?"),
  ].join(" · ");
}

/**
 * Aliases that more than one entry answers to.
 *
 * Reported, never failed, and the asymmetry with the rule above is deliberate.
 * An alias that is another game's *name* is a conflict: someone typing the
 * exact title of one game should not find a different game competing at the top
 * of the results. An alias two games share has no primary claimant -- neither
 * Speed nor Spit is "the" Slam -- and both really are called it, so dropping
 * either would mean a reader searching the name they know finds nothing.
 *
 * What has to be true instead is that a search returns every claimant and says
 * why each one is there. That is asserted in the web tests, against the real
 * index, rather than here. This exists so the count stays visible as the corpus
 * grows: one shared alias in 292 labels today, and collisions grow faster than
 * the corpus does.
 *
 * `alike` marks the case a reader cannot resolve on the index at all -- the
 * cards print the same four facts, so the only thing separating them is the
 * name they were not searching by. That is reported too and not failed: there
 * is no wording that fixes it, and two close relatives sharing a name is a fact
 * about card games rather than a defect in the entry. Someone reading the
 * report can decide whether the pair is really one game twice.
 *
 * @returns one row per shared alias, each naming the files that carry it.
 */
export function sharedAliases(
  entries: readonly NamedEntry[],
): { alias: string; files: string[]; alike: boolean }[] {
  const holders = new Map<string, { alias: string; files: string[]; cards: string[] }>();

  for (const { file, data } of entries) {
    const aliases = Array.isArray(data["aliases"]) ? (data["aliases"] as string[]) : [];
    for (const alias of aliases) {
      const aliasKey = key(alias);
      if (aliasKey === null) continue;
      const seen = holders.get(aliasKey);
      if (seen) {
        seen.files.push(file);
        seen.cards.push(cardFacts(data));
      } else {
        holders.set(aliasKey, { alias, files: [file], cards: [cardFacts(data)] });
      }
    }
  }

  return [...holders.values()]
    .filter((row) => row.files.length > 1)
    .map(({ alias, files, cards }) => ({
      alias,
      files,
      alike: new Set(cards).size < cards.length,
    }))
    .sort((a, b) => a.alias.localeCompare(b.alias));
}

/**
 * Characters of an entry's prose that sit outside `PROSE_FIELDS`.
 *
 * Counted rather than guessed: the shape of an entry makes it easy to assume
 * variants are a footnote, and they are not. Which fields those are is
 * `nestedProse` in `naibi` and is not repeated here -- this function used to
 * carry its own copy of the walk, which is one of the two copies decision 0026
 * collapsed.
 */
/**
 * Fields that carry characters but not prose.
 *
 * (This block sits above NOT_PROSE. `unreadProse`'s own comment is below it.)
 *
 * Identifiers, enumerations, the names of cards, hashes and dates. Named one by
 * one rather than guessed at, because "it looked like metadata" is exactly how
 * `deal[].note` spent a month outside both fingerprints while the coverage line
 * reported a gap of zero.
 */
export const NOT_PROSE = new Set([
  "id",
  "name",
  "aliases[]",
  "category",
  "difficulty",
  "duration_minutes",
  "tags[]",
  "sources_consulted[]",
  "figure_refs[]",
  "checked.date",
  "checked.prose",
  "checked.sources[]",
  "checked.nested.date",
  "checked.nested.prose",
  "checked.nested.sources[]",
  // Field paths, not prose: the list a stamp records of what it was compared
  // over. Added here in the same commit that added them to the schema, because
  // the test below goes red the moment a string the schema allows lands in no
  // bucket -- which is the whole reason that test walks the schema rather than
  // the corpus.
  "checked.fields[]",
  "checked.nested.fields[]",
  "checked.reworded.date",
  "checked.reworded.prose",
  // The nested record carries its own `reworded`, by the schema and on purpose
  // (0026: "same shape, including its own reworded"). Leaving these two out
  // meant the first wording-only fix to a nested passage -- the very thing
  // 0025 provides for -- would have turned `npm run check` red and had validate
  // report a SHA-256 prefix and an ISO date as uncovered prose.
  "checked.nested.reworded.date",
  "checked.nested.reworded.prose",
  // "any one 2", "2\u2666" -- the names of cards, which this project does not
  // paraphrase and a checker can learn nothing from.
  "deal[].removed",
  "scoring_table[].value",
  "layout.rows[][].kind",
  "layout.rows[][].face",
  "figures[].kind",
  "figures[].rows[].cards[].face",
]);

/**
 * Text in an entry that neither fingerprint covers and that nobody has called
 * metadata, with how many characters of it there are.
 *
 * The covered set is read back out of `nestedProse` rather than written down
 * again here. A second list would be a second thing to forget, which is the
 * defect this exists to report.
 */
export function uncoveredProse(data: Entry): Map<string, number> {
  const covered = new Set<string>(PROSE_FIELDS as readonly string[]);
  for (const passage of nestedProse(data as unknown as CardGame)) {
    covered.add(fieldKind(passage.where));
  }

  const found = new Map<string, number>();
  const walk = (node: unknown, path: string): void => {
    if (typeof node === "string") {
      const where = fieldKind(path);
      if (covered.has(where) || NOT_PROSE.has(where)) return;
      found.set(where, (found.get(where) ?? 0) + node.length);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((item, i) => walk(item, `${path}[${i}]`));
      return;
    }
    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) {
        walk(value, path ? `${path}.${key}` : key);
      }
    }
  };
  walk(data, "");
  return found;
}

/**
 * Prose an entry's stamps do not reach, because the walk grew after they were made.
 *
 * The other half of `uncoveredProse`. That one reports text no fingerprint
 * covers anywhere in the corpus; this reports text a fingerprint covers now but
 * a particular entry's record was never compared over -- which is what a field
 * joining the walk creates, and what used to be hidden by every stamp in the
 * corpus reporting itself edited on the same day.
 *
 * Reported rather than failed, and that is a real trade. Until 2026-09-16 a
 * widening turned `npm run check` red until somebody re-read the corpus, which
 * is a ratchet; this replaces it with a line that has to be read. The line is
 * therefore per entry and names the fields, so it cannot shrink to a number
 * that stops being looked at.
 *
 * A record with no `fields` is not reported here. It is not known to be short
 * of anything -- it simply never said -- and `validate` counts those separately
 * rather than letting them look either covered or uncovered.
 */
export function uncoveredByStamp(
  data: Entry,
): { label: string; fields: string[]; chars: number }[] {
  const checked = asRecord(data["checked"]);
  if (!checked) return [];

  const passages = nestedProse(data as unknown as CardGame);
  const out: { label: string; fields: string[]; chars: number }[] = [];
  const consider = (
    record: Record<string, unknown>,
    label: string,
    walk: readonly string[],
    carried: (field: string) => number,
  ) => {
    const recorded = Array.isArray(record["fields"]) ? (record["fields"] as string[]) : null;
    if (!recorded) return;
    // Only fields this entry actually has. A record short of the walk is short
    // for every entry at once, but an entry with no figures has no uncovered
    // caption -- reporting one would fill the line with gaps nobody can close
    // and bury the entries that really do carry unread prose.
    const short = walk.filter((field) => !recorded.includes(field) && carried(field) > 0);
    if (short.length > 0) {
      out.push({
        label,
        fields: short,
        chars: short.reduce((total, field) => total + carried(field), 0),
      });
    }
  };

  consider(checked, "checked", PROSE_FIELDS, (field) =>
    typeof data[field] === "string" ? (data[field] as string).length : 0,
  );
  const nested = asRecord(checked["nested"]);
  if (nested) {
    consider(nested, "checked.nested", NESTED_FIELDS, (field) =>
      passages
        .filter((passage) => fieldKind(passage.where) === field)
        .reduce((total, passage) => total + passage.text.length, 0),
    );
  }
  return out;
}

/** How many of an entry's two check records do not say which fields they covered. */
export function recordsWithoutFields(data: Entry): number {
  const checked = asRecord(data["checked"]);
  if (!checked) return 0;
  const nested = asRecord(checked["nested"]);
  const says = (record: Record<string, unknown>) => Array.isArray(record["fields"]);
  return (says(checked) ? 0 : 1) + (nested && !says(nested) ? 1 : 0);
}

export function unreadProse(data: Entry): number {
  return nestedProse(data as unknown as CardGame)
    .reduce((total, passage) => total + passage.text.length, 0);
}
