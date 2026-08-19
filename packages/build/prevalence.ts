/**
 * Count sentences that claim how commonly something is played.
 *
 *   npm run prevalence                 # counts per entry and per marker
 *   npm run prevalence -- --sample 50  # a deterministic spread, to read by hand
 *   npm run prevalence -- --game speed # one entry, every hit
 *   npm run prevalence -- --baseline   # rewrite the gate's baseline from the corpus
 *
 * REPORTING ONLY. This does not gate anything, on purpose.
 * [The spec](../../docs/specs/2026-08-11-prevalence-markers-and-the-write-time-gate.md)
 * designs a write-time gate and then says what has to happen first: "Is the
 * vocabulary right? It was chosen from the audit records' findings, not measured
 * for precision... Nobody has read them. Sampling fifty by hand before building
 * would be the honest first step, and might change the vocabulary or kill the
 * idea." So this is the instrument for that sampling.
 *
 * The sampling has since happened twice (2026-08-13, and a second reader on
 * 2026-08-17) and the counts-or-hashes question was measured against the whole
 * history on 2026-08-18. The gate those runs unblocked lives at the bottom of
 * this file and is wired into `npm run validate`; see docs/decisions/0027. The
 * reporting above it still gates nothing, on purpose.
 *
 * WHY IT CONTROLS ITSELF
 *
 * The spec's own first run "returned zero across all 80 entries, which reads
 * exactly like a clean corpus and was a broken regex -- a word boundary escaped
 * one level too many by the shell", and it requires that "any tool built from
 * this spec must do the same": prove it flags a planted claim and ignores a clean
 * procedural sentence BEFORE it reports anything. A marker check that silently
 * matches nothing is indistinguishable from a corpus with no claims in it.
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

import type { CardGame } from "naibi";
import { PROSE_FIELDS, loadGames } from "naibi";

import { sentences } from "./originality.ts";

/**
 * Words that make a claim about how widely something is done.
 *
 * Straight from the spec, unchanged, because the point of this run is to measure
 * THIS vocabulary rather than a better-guessed one. Trimming it before measuring
 * it would destroy the only evidence about which words are worth keeping.
 */
export const MARKERS = [
  "most",
  "usually",
  "commonly",
  "common",
  "generally",
  "widespread",
  "typically",
  "popular",
  "often",
  "universal",
  "majority of",
  "the norm",
  "prevalent",
  "standard",
] as const;

/**
 * Collocations where the word is not a claim about prevalence.
 *
 * Also from the spec. "1 standard deck (52 cards)" is in almost every entry and
 * says nothing about how anybody plays.
 */
const NOT_A_CLAIM = [
  /\bstandard (deck|pack|52|32|40|24|playing|international)/i,
  /\bthe most cards\b/i,
  /\bmost of the (pack|deck)\b/i,
  /\bstandard scoring\b/i,
  /\bnon-standard/i,
  /\bstandardis/i,
];

/**
 * A second vocabulary, and the collocations the first one was missing.
 *
 * Measured rather than guessed: the 50-sentence sample in
 * `test/prevalence-sample.json` was read by hand, and
 * [the write-up](../../docs/specs/2026-08-13-prevalence-vocabulary-precision.md)
 * has the per-word numbers. `common`, `commonly`, `usually` and `widespread`
 * came out at 70% and better; `most`, `often` and `standard` at 46%, 43% and 33%
 * while carrying two thirds of the volume.
 *
 * `standard` is dropped rather than filtered. Every one of its noise cases is
 * attributive — "the standard poker rankings", "standard FreeCell", "the standard
 * tactic", "in the standard game" — and exempting attributive uses would have
 * kept 1 of its 3 real claims while dropping 6 of its 6 noise cases. A marker
 * with that recall is not worth a rule; it is worth removing.
 *
 * Kept as a SEPARATE list rather than edited in place, because the 455 was
 * measured against the first one and a tuned number quoted against an untuned
 * baseline is not a comparison. `--v2` selects this; the default stays the
 * vocabulary the spec designed.
 */
export const MARKERS_V2 = [
  "usually",
  "commonly",
  "common",
  "generally",
  "widespread",
  "typically",
  "popular",
  "universal",
  "majority of",
  "the norm",
  "prevalent",
  "most",
  "often",
] as const;

/**
 * Every collocation in the sample where `most` or `often` was not a claim.
 *
 * These are the concrete misses, each one a sentence somebody read. `most` is a
 * proportion far more often than it is a prevalence claim ("most of the skill",
 * "most of a stack", "most of the twentieth century"), and the original filter
 * covered only `most of the pack|deck`. `\bthe most cards\b` missed "holds most
 * cards" on the article alone.
 */
const NOT_A_CLAIM_V2 = [
  ...NOT_A_CLAIM,
  /\bmost of (the|a|them|it|his|her|their|your)\b/i,
  /\bfor most of\b/i,
  /\bmost likely\b/i,
  /\bholds? most cards\b/i,
  /\bmost (coins|cards|points|tricks|sets)\b/i,
  // `differ most` was here and was removed the same day. It was added for
  // tien-len's "this is where tables differ most", which the sampling judged
  // innocent and the audit of that entry, hours later, removed as an unmeasured
  // superlative. The audit reading won, so the shape is a claim and must not be
  // exempted. See the write-up's section on the sentence with two judgements.
  /\bas often as\b/i,
  /\bhow often\b/i,
  /\bmore often than\b/i,
];

export type Hit = {
  game: string;
  field: string;
  markers: string[];
  sentence: string;
};

/** Every marker in a sentence, or none if a not-a-claim collocation covers it. */
export function markersIn(sentence: string, v2 = false): string[] {
  let text = sentence;
  const exemptions = v2 ? NOT_A_CLAIM_V2 : NOT_A_CLAIM;
  // Replace every occurrence, not the first: "most of the skill" and a real
  // "most tables" can share a sentence, and stopping at the first would let the
  // exemption swallow the claim.
  for (const exempt of exemptions) {
    text = text.replace(new RegExp(exempt.source, `${exempt.flags.replace("g", "")}g`), " ");
  }
  return (v2 ? MARKERS_V2 : MARKERS).filter((marker) =>
    new RegExp(`\\b${marker.replace(/ /g, "\\s+")}\\b`, "i").test(text),
  );
}

/**
 * The passages this scans, which are the ones the spec scanned: the four prose
 * fields plus every variant description.
 *
 * Captions, figure labels and scoring-table notes are scanned separately by
 * --outside, and kept out of the headline number so it stays comparable to the
 * spec's 471.
 */
function passages(game: CardGame): { field: string; text: string }[] {
  // Annotated rather than inferred: mapping over PROSE_FIELDS narrows `field` to
  // the four literal names, and the variant labels pushed on below are not among
  // them.
  const out: { field: string; text: string }[] = PROSE_FIELDS.filter((f) => game[f]).map((f) => ({
    field: f as string,
    text: game[f] as string,
  }));
  for (const [i, v] of (game.variants ?? []).entries()) {
    out.push({ field: `variants[${i}] ${v.name}`, text: v.description });
  }
  return out;
}

function outsidePassages(game: CardGame): { field: string; text: string }[] {
  const out: { field: string; text: string }[] = [];
  if (game.layout?.caption) out.push({ field: "layout.caption", text: game.layout.caption });
  for (const [i, f] of (game.figures ?? []).entries()) {
    if (f.caption) out.push({ field: `figures[${i}].caption`, text: f.caption });
    for (const r of f.rows ?? []) {
      if (r.label) out.push({ field: `figures[${i}].label`, text: r.label });
      for (const c of r.cards ?? []) if (c.note) out.push({ field: `figures[${i}].note`, text: c.note });
    }
  }
  for (const r of game.scoring_table ?? []) {
    if (r.note) out.push({ field: `scoring_table "${r.item}"`, text: r.note });
  }
  for (const r of game.deal ?? []) {
    if (r.note) out.push({ field: `deal "${r.players}"`, text: r.note });
  }
  return out;
}

export function scan(
  games: readonly CardGame[],
  pick: (g: CardGame) => { field: string; text: string }[] = passages,
  v2 = false,
): Hit[] {
  const hits: Hit[] = [];
  for (const game of games) {
    for (const { field, text } of pick(game)) {
      for (const sentence of sentences(text)) {
        const markers = markersIn(sentence, v2);
        if (markers.length > 0) hits.push({ game: game.id, field, markers, sentence });
      }
    }
  }
  return hits;
}

/**
 * The two cases the spec names, which the tool must get right before it may
 * report anything at all.
 */
export const CONTROL = {
  flags: "This is the version most tables play.",
  ignores: "Deal seven cards to each player, one at a time.",
  exempt: "Shuffle 1 standard deck (52 cards) and deal.",
};

export function controlPasses(v2 = false): { ok: boolean; why: string } {
  const planted = markersIn(CONTROL.flags, v2);
  if (planted.length === 0) {
    return { ok: false, why: `failed to flag the planted claim: "${CONTROL.flags}"` };
  }
  const clean = markersIn(CONTROL.ignores, v2);
  if (clean.length > 0) {
    return { ok: false, why: `flagged a clean procedural sentence: "${CONTROL.ignores}"` };
  }
  const exempt = markersIn(CONTROL.exempt, v2);
  if (exempt.length > 0) {
    return { ok: false, why: `the not-a-claim filter missed: "${CONTROL.exempt}"` };
  }
  return { ok: true, why: `flags "most tables play", ignores a deal sentence and a standard deck` };
}

/**
 * A deterministic spread across the flagged sentences.
 *
 * Every nth hit rather than the first n: the hits arrive grouped by entry, so
 * the first fifty would be six alphabetically-early games read in full, which
 * says nothing about the corpus or about which markers matter. No clock and no
 * randomness, so the same corpus yields the same fifty on every machine — a
 * sample somebody is going to read by hand and then quote a number from has to
 * be one another reader can reproduce.
 */
export function spread<T>(items: readonly T[], want: number, offset = 0): T[] {
  if (items.length <= want) return [...items];
  const step = items.length / want;
  return Array.from(
    { length: want },
    (_, i) => items[(Math.floor(i * step) + offset) % items.length]!,
  );
}

// ---------------------------------------------------------------------------
// The write-time gate.
//
// Everything above reports. Everything below fails a build. See
// docs/decisions/0027 for why this is hashes rather than the per-entry counts
// the design first sketched: replaying all 88 commits that ever touched game
// data found 14 boundaries where an entry's flagged-sentence count held still
// while the sentences changed, and reading all 14 found nine real claim changes
// in them. A counts file is blind to exactly those nine.
// ---------------------------------------------------------------------------

const BASELINE_PATH = fileURLToPath(new URL("./prevalence-baseline.json", import.meta.url));

/**
 * A flagged sentence's identity.
 *
 * Whitespace is collapsed first so that re-wrapping a paragraph is not a new
 * claim. The field the sentence sits in is deliberately NOT hashed: a claim
 * moved from `play` to a variant description is the same claim, and the gate
 * should not fire on somebody tidying an entry's structure.
 */
export function claimHash(sentence: string): string {
  const normal = sentence.replace(/\s+/g, " ").trim();
  return createHash("sha256").update(normal, "utf8").digest("hex").slice(0, 16);
}

export type Baseline = {
  what: string;
  vocabulary: string;
  entries: Record<string, string[]>;
};

/** Every currently-flagged sentence, hashed, grouped by entry and sorted. */
export function baselineFrom(games: readonly CardGame[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const g of games) out[g.id] = [];
  for (const h of scan(games, passages, true)) out[h.game]!.push(claimHash(h.sentence));
  for (const id of Object.keys(out)) out[id]!.sort();
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}

export type GateProblem = { entry: string; problem: string };

/**
 * The gate, as a pure function so it can be tested against a planted claim
 * rather than only against a corpus that happens to pass.
 *
 * Three ways to fail, and the second is the one that makes the backlog shrink
 * instead of ossifying -- the design's second constraint, "it must ratchet, not
 * merely freeze": a sentence that has left the corpus must leave the baseline
 * too, so the number behind it can only go down.
 */
export function gateProblems(
  games: readonly CardGame[],
  baseline: Record<string, readonly string[]>,
): GateProblem[] {
  const problems: GateProblem[] = [];
  const flagged = new Map<string, { hash: string; sentence: string; field: string }[]>();
  for (const g of games) flagged.set(g.id, []);
  for (const h of scan(games, passages, true)) {
    flagged.get(h.game)!.push({ hash: claimHash(h.sentence), sentence: h.sentence, field: h.field });
  }

  for (const game of games) {
    const recorded = baseline[game.id];
    // An entry with no record at all is not a passing entry. Same rule the
    // validator and the originality pass carry: silence is not coverage.
    if (recorded === undefined) {
      problems.push({
        entry: game.id,
        problem:
          `no prevalence baseline recorded, so its ${flagged.get(game.id)!.length} flagged ` +
          `sentence(s) are compared against nothing — run \`npm run prevalence -- --baseline\``,
      });
      continue;
    }

    const left = new Map<string, number>();
    for (const h of recorded) left.set(h, (left.get(h) ?? 0) + 1);
    for (const hit of flagged.get(game.id)!) {
      const n = left.get(hit.hash) ?? 0;
      if (n > 0) {
        left.set(hit.hash, n - 1);
        continue;
      }
      // The one useful question, which the audit records show nobody asked.
      problems.push({
        entry: game.id,
        problem:
          `a new sentence claims how commonly something is done — which sentence in a ` +
          `source ranks this?\n      ${hit.field}: "${hit.sentence.trim()}"`,
      });
    }
    const stale = [...left.values()].reduce((n, v) => n + v, 0);
    if (stale > 0) {
      problems.push({
        entry: game.id,
        problem:
          `${stale} baselined sentence(s) are gone, so the baseline is looser than the ` +
          `entry — run \`npm run prevalence -- --baseline\` to tighten it`,
      });
    }
  }

  // A baseline naming an entry that no longer exists would quietly shrink what
  // the gate covers while still reading as a clean run.
  const ids = new Set(games.map((g) => g.id));
  for (const id of Object.keys(baseline)) {
    if (!ids.has(id)) {
      problems.push({ entry: id, problem: `baselined but no such entry — remove it from the baseline` });
    }
  }
  return problems;
}

export function readBaseline(): Baseline {
  // A missing or unreadable baseline is the one failure that would otherwise
  // arrive as a stack trace from inside `npm run validate`, where it reads as
  // the validator being broken rather than as the gate having nothing to
  // compare against. Says which it is, and how to fix it.
  let text: string;
  try {
    text = readFileSync(BASELINE_PATH, "utf8");
  } catch {
    throw new Error(
      `No prevalence baseline at ${BASELINE_PATH}. Nothing would be compared against ` +
        `anything — run \`npm run prevalence -- --baseline\` to write one.`,
    );
  }
  const parsed = JSON.parse(text) as Baseline;
  if (!parsed || typeof parsed.entries !== "object") {
    throw new Error(`The prevalence baseline at ${BASELINE_PATH} has no "entries".`);
  }
  return parsed;
}

function writeBaseline(games: readonly CardGame[]): number {
  const entries = baselineFrom(games);
  const total = Object.values(entries).reduce((n, hs) => n + hs.length, 0);
  const file: Baseline = {
    what:
      "Every sentence in the corpus that already claims how commonly something is done, " +
      "hashed. The gate in `npm run validate` fails on a flagged sentence that is not in " +
      "here, and fails again when one in here has left the corpus, so the list can only " +
      "shrink. Regenerate with `npm run prevalence -- --baseline`.",
    vocabulary: "v2, the measured vocabulary — docs/specs/2026-08-13-prevalence-vocabulary-precision.md",
    entries,
  };
  writeFileSync(BASELINE_PATH, JSON.stringify(file, null, 1) + "\n");
  console.log(`Baseline written: ${total} flagged sentences across ${Object.keys(entries).length} entries.`);
  return 0;
}

function main(): number {
  const argv = process.argv;

  // Before the reporting flags, because the baseline is not a report: it is
  // always v2 and always the whole corpus, so it must not inherit --v2, --game
  // or --outside. A baseline written from a subset would silently uncover
  // every entry it left out.
  if (argv.includes("--baseline")) {
    const gateControl = controlPasses(true);
    if (!gateControl.ok) {
      console.error(`CONTROL FAILED — ${gateControl.why}`);
      return 1;
    }
    console.log(`Control: ${gateControl.why}.`);
    console.log("Vocabulary: v2, measured — the one the gate reads.\n");
    return writeBaseline(loadGames());
  }

  const v2 = argv.includes("--v2");
  const control = controlPasses(v2);
  if (!control.ok) {
    console.error(`CONTROL FAILED — ${control.why}\n`);
    console.error("Reporting nothing. A marker check that matches nothing looks");
    console.error("exactly like a corpus with no claims in it, which is the");
    console.error("failure this project has already had twice.");
    return 1;
  }
  console.log(`Control: ${control.why}.`);
  console.log(`Vocabulary: ${v2 ? "v2, measured (--v2)" : "v1, as the spec designed it"}.\n`);

  const only = argv.includes("--game") ? argv[argv.indexOf("--game") + 1] : undefined;
  const all = loadGames();
  const games = all.filter((g) => !only || g.id === only);
  if (games.length === 0) {
    console.error(`No game with id "${only}".`);
    return 1;
  }

  const outside = argv.includes("--outside");
  const hits = scan(games, outside ? outsidePassages : passages, v2);

  const perGame = new Map<string, number>();
  for (const h of hits) perGame.set(h.game, (perGame.get(h.game) ?? 0) + 1);
  const perMarker = new Map<string, number>();
  for (const h of hits) for (const m of h.markers) perMarker.set(m, (perMarker.get(m) ?? 0) + 1);

  const counts = [...perGame.values()].sort((a, b) => a - b);
  const median = counts.length > 0 ? counts[Math.floor(counts.length / 2)]! : 0;

  console.log(
    `${hits.length} flagged sentence${hits.length === 1 ? "" : "s"} in ` +
      `${perGame.size} of ${games.length} entries` +
      (outside ? ", in captions, figure labels and table notes only" : "") +
      `.\nMedian ${median} per flagged entry, max ${counts.at(-1) ?? 0}.\n`,
  );

  // Say what was NOT looked at, same rule as validate and originality: a count
  // that could mean "clean" or "never scanned" has to say which.
  const quiet = games.filter((g) => !perGame.has(g.id));
  if (quiet.length > 0) {
    console.log(
      `${quiet.length} entr${quiet.length === 1 ? "y" : "ies"} carried no marker in these ` +
        `fields:\n  ${quiet.map((g) => g.id).join(", ")}\n`,
    );
  }
  if (!outside) {
    console.log("NOT scanned: captions, figure labels, card notes, scoring-table");
    console.log("and deal notes. Run with --outside for those.\n");
  }

  console.log("Per marker, counting a sentence once per distinct marker in it:");
  for (const [marker, n] of [...perMarker].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${marker}`);
  }

  const wantSample = argv.includes("--sample");
  if (wantSample) {
    const n = Number(argv[argv.indexOf("--sample") + 1]) || 50;
    // --offset shifts which hits are drawn, so a revised vocabulary can be
    // tested on sentences it was not tuned against. Tuning a filter on a sample
    // and then quoting that sample's precision measures nothing; this repo
    // already learned that about thresholds.
    const off = argv.includes("--offset") ? Number(argv[argv.indexOf("--offset") + 1]) || 0 : 0;
    const sample = spread(hits, n, off);
    console.log(
      `\nA deterministic spread of ${sample.length} of ${hits.length}, every ` +
        `${(hits.length / sample.length).toFixed(1)}th hit, to be read by hand:\n`,
    );
    for (const [i, h] of sample.entries()) {
      console.log(`${String(i + 1).padStart(3)}. [${h.markers.join(", ")}] ${h.game} — ${h.field}`);
      console.log(`     ${h.sentence}`);
    }
  } else if (only) {
    console.log("");
    for (const h of hits) {
      console.log(`  [${h.markers.join(", ")}] ${h.field}\n     ${h.sentence}`);
    }
  }

  console.log(
    "\nA marker is not a finding. This counts sentences in which a word about " +
      "prevalence\nappears; whether a source ranks the thing is a question only " +
      "reading can answer.",
  );
  return 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exit(main());
}
