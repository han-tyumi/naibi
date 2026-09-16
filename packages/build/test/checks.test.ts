/**
 * The validator's semantic rules.
 *
 * Each of these exists because something wrong got committed and was found by
 * reading the output: a deal table that stopped at five players in a game that
 * seats eight, a diagram whose zones disagreed with its repeat count, a game
 * needing a hanafuda pack that claimed to need no cards. A rule that is not
 * tested is a rule that quietly stops firing, so both directions are checked —
 * that a bad entry is caught, and that a good one is left alone.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import assert from "node:assert/strict";

import type { CardGame } from "naibi";
import { NESTED_FIELDS, PROSE_FIELDS, SCHEMA_PATH, loadGames, nestedProse } from "naibi";

import type { Entry, Fingerprint } from "../checks.ts";
import {
  checkDeal,
  checkEntry,
  checkEquipment,
  checkFigureRefs,
  unreadProse,
  checkFilename,
  checkLayout,
  checkPlayers,
  checkVariantPlayers,
  checkChecked,
  checkTagSemantics,
  checkVariants,
  crossFileProblems,
  durationBounds,
  sharedAliases,
  NOT_PROSE,
  recordsWithoutFields,
  uncoveredByStamp,
  uncoveredProse,
} from "../checks.ts";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

/**
 * A fingerprint that answers the same whatever fields it is asked for.
 *
 * Most of these tests are about a record's shape rather than about which fields
 * a walk reads, and a fixed answer keeps them that way. The tests that are about
 * the field set build a real one.
 */
const fixed =
  (prose: string): Fingerprint =>
  () =>
    prose;

/** Asserts a rule fired, and that its message names the thing that is wrong. */
function complains(problems: string[], about: string | RegExp): void {
  assert.equal(problems.length > 0, true, "expected a problem, got none");
  const matches = problems.some((p) =>
    typeof about === "string" ? p.includes(about) : about.test(p),
  );
  assert.ok(matches, `no problem mentioned ${about}; got:\n  ${problems.join("\n  ")}`);
}

// --- durations ------------------------------------------------------------

test("duration bounds parse both forms and reject anything else", () => {
  assert.deepEqual(durationBounds("20-45"), [20, 45]);
  assert.deepEqual(durationBounds("60+"), [60, null]);
  assert.equal(durationBounds("about an hour"), null);
  assert.equal(durationBounds(45), null);
  assert.equal(durationBounds(undefined), null);
});

// --- tags versus the numbers beside them ----------------------------------

test('"solo" must mean one player, and one player must mean "solo"', () => {
  complains(
    checkTagSemantics({ players: { min: 1, max: 4, ideal: 2 }, tags: ["solo"] }),
    "seats up to 4",
  );
  complains(
    checkTagSemantics({ players: { min: 1, max: 1, ideal: 1 }, tags: [] }),
    "not tagged",
  );
  assert.deepEqual(
    checkTagSemantics({ players: { min: 1, max: 1, ideal: 1 }, tags: ["solo"] }),
    [],
  );
});

test("a solitaire that seats a table is a contradiction", () => {
  complains(
    checkTagSemantics({
      category: "solitaire",
      players: { min: 1, max: 2, ideal: 1 },
      tags: ["solo"],
    }),
    "solitaire",
  );
});

test("partnership needs four seats and large-group needs six", () => {
  complains(
    checkTagSemantics({ players: { min: 2, max: 3, ideal: 3 }, tags: ["partnership"] }),
    "partnership",
  );
  complains(
    checkTagSemantics({ players: { min: 2, max: 4, ideal: 4 }, tags: ["large-group"] }),
    "large-group",
  );
  assert.deepEqual(
    checkTagSemantics({ players: { min: 4, max: 8, ideal: 4 }, tags: ["partnership", "large-group"] }),
    [],
  );
});

test('"two-player" has to include two players', () => {
  complains(
    checkTagSemantics({ players: { min: 3, max: 6, ideal: 4 }, tags: ["two-player"] }),
    "two-player",
  );
  assert.deepEqual(
    checkTagSemantics({ players: { min: 2, max: 2, ideal: 2 }, tags: ["two-player"] }),
    [],
  );
});

test("the duration tags mean what the README says they mean", () => {
  complains(
    checkTagSemantics({ duration_minutes: "20-45", tags: ["quick"] }),
    "limit 30",
  );
  complains(
    checkTagSemantics({ duration_minutes: "30-45", tags: ["long-game"] }),
    "needs 60",
  );
  assert.deepEqual(checkTagSemantics({ duration_minutes: "10-20", tags: ["quick"] }), []);
  assert.deepEqual(
    checkTagSemantics({ duration_minutes: "60+", tags: ["long-game"] }),
    [],
    "an open-ended duration cannot be too short",
  );
});

test("a duration range has to ascend", () => {
  complains(checkTagSemantics({ duration_minutes: "45-20", tags: [] }), "ascending");
  complains(checkTagSemantics({ duration_minutes: "30-30", tags: [] }), "ascending");
});

// --- players --------------------------------------------------------------

test("player counts have to be internally consistent", () => {
  complains(checkPlayers({ players: { min: 5, max: 2, ideal: 3 } }), "greater than");
  complains(checkPlayers({ players: { min: 2, max: 4, ideal: 6 } }), "outside the range");
  assert.deepEqual(checkPlayers({ players: { min: 2, max: 4, ideal: 4 } }), []);
  assert.deepEqual(checkPlayers({}), []);
});

test("a variant's player range has to be a range, and has to differ", () => {
  const base = { players: { min: 3, max: 5, ideal: 4 }, equipment: { standard_decks: 1 } };

  complains(
    checkVariantPlayers({
      ...base,
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 4 } }],
    }),
    "greater than",
  );

  // Restating the game's own range is noise, and would double its picker rows.
  complains(
    checkVariantPlayers({
      ...base,
      variants: [{ name: "Same", description: "x", players: { min: 3, max: 5 } }],
    }),
    "does not differ",
  );

  assert.deepEqual(
    checkVariantPlayers({
      players: { min: 3, max: 5, ideal: 4 },
      equipment: { standard_decks: 1, decks_by_players: { "6": 2 } },
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 6 } }],
    }),
    [],
  );

  assert.deepEqual(
    checkVariantPlayers({ ...base, variants: [{ name: "n", description: "x" }] }),
    [],
  );
  assert.deepEqual(checkVariantPlayers({}), []);
});

test("a variant seating more players must say what it costs in decks", () => {
  // The picker will offer this row. Recommending a game the reader cannot play
  // is the one thing it must never do, so the rule makes that checkable.
  complains(
    checkVariantPlayers({
      players: { min: 3, max: 5, ideal: 4 },
      equipment: { standard_decks: 1 },
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 6 } }],
    }),
    "decks_by_players",
  );

  // Seating fewer needs no deck cover: a smaller table cannot want more packs.
  assert.deepEqual(
    checkVariantPlayers({
      players: { min: 4, max: 4, ideal: 4 },
      equipment: { standard_decks: 1 },
      variants: [{ name: "Short-handed", description: "x", players: { min: 2, max: 3 } }],
    }),
    [],
  );

  // decks_by_players means "from this count upward", so an entry at 5 already
  // answers for 8. Demanding a key on the exact number would make the rule ask
  // for something the field does not mean -- tien-len says five to eight play
  // with two packs, and {"5": 2} is the whole of that.
  assert.deepEqual(
    checkVariantPlayers({
      players: { min: 2, max: 4, ideal: 4 },
      equipment: { standard_decks: 1, decks_by_players: { "5": 2 } },
      variants: [{ name: "Other player counts", description: "x", players: { min: 5, max: 8 } }],
    }),
    [],
  );

  // But a key at or below the game's own max says nothing about the extension.
  complains(
    checkVariantPlayers({
      players: { min: 2, max: 4, ideal: 4 },
      equipment: { standard_decks: 1, decks_by_players: { "3": 1 } },
      variants: [{ name: "Bigger", description: "x", players: { min: 5, max: 8 } }],
    }),
    "decks_by_players",
  );
});

// --- deal tables ----------------------------------------------------------

const seats = (min: number, max: number) => ({ min, max, ideal: min });

test("a deal table has to cover every group that can play", () => {
  // The original defect: 500 Rummy seats 2 to 8 and its table stopped at 5, so
  // a table of six looked it up and found nothing.
  const problems = checkDeal({
    players: seats(2, 8),
    deal: [2, 3, 4, 5].map((players) => ({ players, hand: 7 })),
  });
  complains(problems, "no row for 6, 7, 8 players");
});

test("a complete deal table passes", () => {
  assert.deepEqual(
    checkDeal({
      players: seats(2, 4),
      deal: [2, 3, 4].map((players) => ({ players, hand: 7 })),
    }),
    [],
  );
});

test("a deal row for a count the game cannot seat is caught", () => {
  complains(
    checkDeal({
      players: seats(2, 3),
      deal: [{ players: 2, hand: 7 }, { players: 3, hand: 7 }, { players: 9, hand: 4 }],
    }),
    "outside the game's 2-3",
  );
});

test("a repeated deal row is caught", () => {
  complains(
    checkDeal({
      players: seats(2, 2),
      deal: [{ players: 2, hand: 7 }, { players: 2, hand: 8 }],
    }),
    "more than once",
  );
});

test("the missing-row message reads correctly for a single player", () => {
  const problems = checkDeal({ players: seats(1, 1), deal: [{ players: 2, hand: 7 }] });
  complains(problems, /no row for 1 player,/);
  complains(problems, /no row for 1 player, but/);
});

test("no deal table is not a problem; a table is optional", () => {
  assert.deepEqual(checkDeal({ players: seats(2, 6) }), []);
});

// --- equipment ------------------------------------------------------------

test("needing no standard deck means naming the pack you do need", () => {
  complains(checkEquipment({ equipment: { standard_decks: 0 } }), "special_deck");
  assert.deepEqual(
    checkEquipment({ equipment: { standard_decks: 0, special_deck: "A hanafuda pack" } }),
    [],
  );
  assert.deepEqual(checkEquipment({ equipment: { standard_decks: 1 } }), []);
});

// --- variants -------------------------------------------------------------

test("an entry does not list the same variant twice", () => {
  // Found in `mus`, which shipped one variant twice through a green check: an
  // edit script renamed it and then appended it again, and nothing looked. Both
  // objects are valid on their own, so only a cross-variant rule can see it.
  complains(
    checkVariants({ variants: [{ name: "Con flor" }, { name: "Con flor" }] }),
    "con flor",
  );
  // Case and surrounding space are not a difference worth having twice.
  complains(
    checkVariants({ variants: [{ name: "Con flor" }, { name: " con FLOR " }] }),
    "con flor",
  );
  assert.deepEqual(
    checkVariants({ variants: [{ name: "Con flor" }, { name: "Sin flor" }] }),
    [],
  );
  assert.deepEqual(checkVariants({}), []);
});

// --- figures --------------------------------------------------------------

test("a figure reference that does not resolve is caught", () => {
  const shared = new Set(["poker-hands"]);
  assert.deepEqual(checkFigureRefs({ figure_refs: ["poker-hands"] }, shared), []);
  complains(checkFigureRefs({ figure_refs: ["pokerhands"] }, shared), '"pokerhands"');
  assert.deepEqual(checkFigureRefs({}, shared), []);
});

// --- layouts --------------------------------------------------------------

test("a per-pile card list has to match the number of piles", () => {
  complains(
    checkLayout({ layout: { rows: [[{ kind: "tableau", repeat: 7, cards: [1, 2, 3] }]] } }),
    "cards has 3 entries but repeat is 7",
  );
  assert.deepEqual(
    checkLayout({ layout: { rows: [[{ kind: "tableau", repeat: 3, cards: [1, 2, 3] }]] } }),
    [],
  );
  assert.deepEqual(
    checkLayout({ layout: { rows: [[{ kind: "tableau", repeat: 7, cards: 1 }]] } }),
    [],
    "one number for all of them is fine",
  );
});

test("a gap is a spacer and carries nothing", () => {
  complains(
    checkLayout({ layout: { rows: [[{ kind: "gap", label: "Empty" }]] } }),
    "takes no label",
  );
  assert.deepEqual(checkLayout({ layout: { rows: [[{ kind: "gap" }]] } }), []);
});

test("a diagram cannot overlap more rows than it has", () => {
  complains(
    checkLayout({ layout: { overlapping_rows: 7, rows: [[{ kind: "tableau" }]] } }),
    "only 1 rows",
  );
  assert.deepEqual(
    checkLayout({
      layout: { overlapping_rows: 2, rows: [[{ kind: "tableau" }], [{ kind: "tableau" }]] },
    }),
    [],
  );
});

test("no layout is not a problem", () => {
  assert.deepEqual(checkLayout({}), []);
});

// --- filenames and the whole corpus ---------------------------------------

test("the id has to match the filename it lives in", () => {
  complains(checkFilename("gin-rummy.json", { id: "gin" }), "does not match");
  assert.deepEqual(checkFilename("gin-rummy.json", { id: "gin-rummy" }), []);
});

test("checkEntry runs every rule and reports them together", () => {
  const problems = checkEntry(
    "bad.json",
    {
      id: "worse",
      players: { min: 1, max: 4, ideal: 9 },
      tags: ["solo"],
      equipment: { standard_decks: 0 },
    },
    new Set(),
  );

  complains(problems, "does not match");
  complains(problems, "outside the range");
  complains(problems, "seats up to 4");
  complains(problems, "special_deck");
});

test("two entries cannot claim one id or one name", () => {
  const [, second] = crossFileProblems([
    { file: "a.json", data: { id: "war", name: "War" } },
    { file: "b.json", data: { id: "war", name: "War" } },
  ]);

  complains(second ?? [], "duplicate id, also used by a.json");
  complains(second ?? [], "duplicate name, also used by a.json");
});

test("an alias cannot be another game's real name", () => {
  // Otherwise the two are indistinguishable in search, which is how "slap" used
  // to find the wrong game.
  const [first, second] = crossFileProblems([
    { file: "slapjack.json", data: { id: "slapjack", name: "Slapjack", aliases: ["Slaps"] } },
    {
      file: "egyptian-ratscrew.json",
      data: { id: "egyptian-ratscrew", name: "Egyptian Ratscrew", aliases: ["Slapjack"] },
    },
  ]);

  assert.deepEqual(first, []);
  complains(second ?? [], "is the name of another game (slapjack.json)");
});

test("a game may list its own name as an alias", () => {
  const [problems] = crossFileProblems([
    { file: "war.json", data: { id: "war", name: "War", aliases: ["war"] } },
  ]);
  assert.deepEqual(problems, []);
});

test("an alias colliding with a name defined later is still caught", () => {
  // The alias pass runs after every name is known, so file order cannot hide it.
  const [first] = crossFileProblems([
    { file: "a.json", data: { id: "a", name: "A", aliases: ["Zed"] } },
    { file: "z.json", data: { id: "z", name: "Zed" } },
  ]);
  complains(first ?? [], "is the name of another game (z.json)");
});

test("a clean corpus produces no problems at all", () => {
  const entries: { file: string; data: Entry }[] = [
    { file: "war.json", data: { id: "war", name: "War", aliases: ["Battle"] } },
    { file: "snap.json", data: { id: "snap", name: "Snap", aliases: [] } },
  ];
  assert.deepEqual(crossFileProblems(entries), [[], []]);
});

// --- names two entries answer to ------------------------------------------

const card = (over: Partial<Entry> = {}): Entry => ({
  players: { min: 2, max: 4 },
  duration_minutes: "10-20",
  difficulty: "easy",
  category: "shedding",
  ...over,
});

test("an alias two entries answer to is reported, not failed", () => {
  // Both games really are called it, so neither gives the name up -- decision
  // 0022. A collision is a thing to know about, and knowing needs it counted.
  const entries = [
    { file: "speed.json", data: card({ id: "speed", name: "Speed", aliases: ["Slam"] }) },
    { file: "spit.json", data: card({ id: "spit", name: "Spit", aliases: ["Slam"], players: { min: 2, max: 2 } }) },
  ];

  assert.deepEqual(
    crossFileProblems(entries).flat(),
    [],
    "a shared alias failed validation, which decision 0022 says it must not",
  );

  const shared = sharedAliases(entries);
  assert.equal(shared.length, 1);
  assert.equal(shared[0]!.alias, "Slam");
  assert.deepEqual(shared[0]!.files, ["speed.json", "spit.json"]);
});

test("a shared alias whose cards read alike is marked, and still not failed", () => {
  // The case a reader cannot resolve on the index: same name, and the four
  // facts a card prints are the same too, so only the name they were not
  // searching by separates them. There is no wording that fixes that, which is
  // why it is a line in the report rather than a red build -- someone reading
  // it decides whether the pair is one game filed twice.
  const twins = [
    { file: "a.json", data: card({ id: "a", name: "A", aliases: ["Slam"] }) },
    { file: "b.json", data: card({ id: "b", name: "B", aliases: ["Slam"] }) },
  ];
  assert.deepEqual(crossFileProblems(twins).flat(), []);
  assert.equal(sharedAliases(twins)[0]!.alike, true);

  // One differing fact is enough to tell them apart, and each of the four
  // counts: a marker that only watched players would call three of these alike.
  for (const different of [
    { players: { min: 3, max: 4 } },
    { duration_minutes: "30-60" },
    { difficulty: "medium" },
    { category: "trick-taking" },
  ]) {
    const pair = [
      { file: "a.json", data: card({ id: "a", name: "A", aliases: ["Slam"] }) },
      { file: "b.json", data: card({ id: "b", name: "B", aliases: ["Slam"], ...different }) },
    ];
    assert.equal(
      sharedAliases(pair)[0]!.alike,
      false,
      `${Object.keys(different)[0]} differing did not make the pair distinguishable`,
    );
  }
});

test("an alias only one entry carries is not a collision", () => {
  assert.deepEqual(
    sharedAliases([
      { file: "a.json", data: card({ id: "a", name: "A", aliases: ["Slam", "Spoons"] }) },
      { file: "b.json", data: card({ id: "b", name: "B", aliases: ["Snap"] }) },
    ]),
    [],
  );
});

/**
 * The counter behind validate's "prose no tool reads" line.
 *
 * Both directions, for the reason the prevalence spec gives: a measurement that
 * silently returns nothing is indistinguishable from a corpus with nothing to
 * measure, and this project has shipped that failure twice. So the test asserts
 * a planted entry is counted AND that an entry with none of those fields comes
 * back at zero -- otherwise a broken counter reading 0% would look like a gap
 * that had been closed.
 */
test("unreadProse counts the fields no tool checks", () => {
  const entry = {
    variants: [{ name: "Ab", description: "cdef" }],
    layout: { caption: "ghi" },
    figures: [{ caption: "jk", rows: [{ label: "l", cards: [{ note: "mn" }] }] }],
    scoring_table: [{ item: "op", note: "q" }],
  } as unknown as Entry;
  // 2 + 4 + 3 + 2 + 1 + 2 + 2 + 1
  assert.equal(unreadProse(entry), 17);
});

test("unreadProse reads none of the fields the check already covers", () => {
  const entry = {
    setup: "a".repeat(50),
    play: "b".repeat(50),
    goal_and_scoring: "c".repeat(50),
    background: "d".repeat(50),
  } as unknown as Entry;
  assert.equal(unreadProse(entry), 0);
});

test("every variant player range in the corpus satisfies its own rules", () => {
  // Asserted against the real entries rather than fixtures, the way the geometry
  // and ranking tests are: a fixture agrees with the code by construction.
  for (const game of loadGames()) {
    assert.deepEqual(
      checkVariantPlayers(game as unknown as Entry),
      [],
      `${game.id} has a variant player range that breaks a rule`,
    );
  }
});

/**
 * The fingerprint rule, and the one amendment allowed to move it.
 *
 * Untested until 2026-08-15, which is the rule this project keeps writing down:
 * the check that stops a `checked` date becoming a comfortable lie had nothing
 * asserting it still fired. Both directions for each case, and the amendment's
 * two guards, because `checked.reworded` is a claim a tool cannot verify and the
 * least it can do is refuse the shapes that claim nothing.
 */
test("checkChecked passes an entry whose prose is the prose that was checked", () => {
  const entry = { checked: { date: "2026-08-12", prose: "a".repeat(16) } } as unknown as Entry;
  assert.deepEqual(checkChecked(entry, fixed("a".repeat(16))), []);
});

test("checkChecked catches prose edited after the check", () => {
  const entry = { checked: { date: "2026-08-12", prose: "a".repeat(16) } } as unknown as Entry;
  complains(checkChecked(entry, fixed("b".repeat(16))), "edited since it was checked on 2026-08-12");
});

test("checkChecked accepts prose matching a recorded wording fix", () => {
  const entry = {
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      reworded: { date: "2026-08-15", prose: "b".repeat(16) },
    },
  } as unknown as Entry;
  assert.deepEqual(checkChecked(entry, fixed("b".repeat(16))), []);
  // And the amendment does not become a blanket exemption: prose edited after
  // the rewrite is caught, and the message names the rewrite rather than the
  // check, so the reader is sent to the right date.
  complains(checkChecked(entry, fixed("c".repeat(16))), "edited since the wording fix of 2026-08-15");
  // Including a return to the text that was checked -- which is a real edit,
  // whatever it reverts to.
  complains(checkChecked(entry, fixed("a".repeat(16))), "edited since the wording fix");
});

test("checkChecked refuses a wording fix that records no rewrite", () => {
  const entry = {
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      reworded: { date: "2026-08-15", prose: "a".repeat(16) },
    },
  } as unknown as Entry;
  complains(checkChecked(entry, fixed("a".repeat(16))), "records a rewrite that did not happen");
});

test("checkChecked refuses a wording fix dated before the check it amends", () => {
  const entry = {
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      reworded: { date: "2026-08-11", prose: "b".repeat(16) },
    },
  } as unknown as Entry;
  complains(checkChecked(entry, fixed("b".repeat(16))), "before the check it amends");
});

/**
 * The source-name guard, and that it fires from `npm run validate`.
 *
 * `sourcesRead` is well covered above as a function. What was not covered is
 * the thing that actually cost the time: WHEN it runs. The guard lived only in
 * `--stamp`, so for six consecutive sittings it announced -- after the sources
 * had been fetched and read -- that the entry never attributed one of them.
 * Moving it into the validator is only worth anything if the validator really
 * reports it, and that is a wiring question a unit test cannot answer, so this
 * one runs the real script.
 *
 * `.sources/` is gitignored and absent in CI, which is why the test makes its
 * own and removes it again. All three states are checked, because the two empty
 * ones must not read alike: nothing on disk means the guard did not run, and
 * that is not the same as everything matching.
 */
test("validate reports a source file that matches no attributed name", (t) => {
  const sources = join(REPO_ROOT, ".sources");
  // A sitting in progress owns that directory and this test would delete it.
  // Skipped rather than failed, and never silently: CI has no `.sources/` at
  // all, so the assertions below always run where it matters, and a run that
  // skips says why on the line above the result.
  if (existsSync(sources)) {
    t.skip("a sitting has source text in .sources/; not touching it");
    return;
  }

  const run = () => {
    try {
      return execFileSync("node", [join(REPO_ROOT, "packages/build/validate.ts"), "--quiet"], {
        cwd: REPO_ROOT,
        encoding: "utf8",
      });
    } catch (error) {
      return `${(error as { stdout?: string }).stdout ?? ""}`;
    }
  };

  const quiet = run();
  assert.match(
    quiet,
    /No source text in \.sources\/, so no source name was checked/,
    "with nothing on disk the validator says nothing about the guard at all",
  );

  const dir = join(sources, "whist");
  try {
    mkdirSync(dir, { recursive: true });
    // `whist` attributes Pagat and Wikipedia; "Gamerules.com" it also attributes,
    // and it slugs to gamerulescom -- so gamerules.txt is the real-world trap.
    writeFileSync(join(dir, "pagat.txt"), "text\n");
    writeFileSync(join(dir, "gamerules.txt"), "text\n");
    const flagged = run();
    assert.match(flagged, /whist: "gamerules\.txt" match nothing in sources_consulted/);

    rmSync(join(dir, "gamerules.txt"));
    writeFileSync(join(dir, "wikipedia.txt"), "text\n");
    const clean = run();
    assert.match(
      clean,
      /Every source file matches an attributed name/,
      "two matching files were still reported as stray",
    );
    assert.doesNotMatch(clean, /match nothing in sources_consulted/);
  } finally {
    // Only what this test made. `rmSync(sources)` would take the whole tree,
    // and a sitting whose fetch landed between the check above and here would
    // lose an hour of downloads to a test tidying up after itself.
    rmSync(dir, { recursive: true, force: true });
    // `recursive` even for an empty directory: rmSync throws ERR_FS_EISDIR
    // without it, and a throw in a finally fails the test it was tidying up
    // after. That is exactly what CI saw and a working tree with a sitting's
    // sources in it did not, because then this branch never ran.
    if (existsSync(sources) && readdirSync(sources).length === 0) {
      rmSync(sources, { recursive: true });
    }
  }
});

/**
 * The second fingerprint, and that one set of rules serves both.
 *
 * `checked.nested` covers the prose that hangs off the structured data --
 * 32% of the corpus, read by nothing until decision 0026. It has the same shape
 * as the record it sits in on purpose, so these assert the shared rules fire on
 * it too rather than that a second copy of them exists.
 */
test("checkChecked catches nested prose edited after its own check", () => {
  const entry = {
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      nested: { date: "2026-08-15", prose: "b".repeat(16) },
    },
  } as unknown as Entry;

  assert.deepEqual(checkChecked(entry, fixed("a".repeat(16)), fixed("b".repeat(16))), []);
  complains(
    checkChecked(entry, fixed("a".repeat(16)), fixed("c".repeat(16))),
    "nested prose has been edited since it was checked on 2026-08-15",
  );
  // The two halves are independent: the sections can go stale while the nested
  // prose is current, and the message has to name the right one.
  complains(
    checkChecked(entry, fixed("z".repeat(16)), fixed("b".repeat(16))),
    "prose has been edited since it was checked on 2026-08-12",
  );
});

test("the wording-fix rules apply to the nested record too", () => {
  const withFix = (reworded: object) =>
    ({
      checked: {
        date: "2026-08-12",
        prose: "a".repeat(16),
        nested: { date: "2026-08-12", prose: "b".repeat(16), reworded },
      },
    }) as unknown as Entry;

  assert.deepEqual(
    checkChecked(withFix({ date: "2026-08-15", prose: "c".repeat(16) }), fixed("a".repeat(16)), fixed("c".repeat(16))),
    [],
  );
  complains(
    checkChecked(withFix({ date: "2026-08-15", prose: "b".repeat(16) }), fixed("a".repeat(16)), fixed("b".repeat(16))),
    "checked.nested.reworded repeats checked.nested.prose",
  );
  complains(
    checkChecked(withFix({ date: "2026-08-11", prose: "c".repeat(16) }), fixed("a".repeat(16)), fixed("c".repeat(16))),
    "before the check it amends",
  );
});

test("checked.nested may only name sources the entry attributes", () => {
  const entry = {
    sources_consulted: ["Pagat", "Wikipedia"],
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      nested: { date: "2026-08-12", prose: "b".repeat(16), sources: ["Pagat", "Some Blog"] },
    },
  } as unknown as Entry;
  complains(checkChecked(entry, fixed("a".repeat(16)), fixed("b".repeat(16))), 'checked.nested.sources names "Some Blog"');
});

test("an entry with no nested record is not reported as stale", () => {
  // Absent means never compared, which the validator counts and says out loud.
  // It must not read as an edit, or every entry in the corpus would look wrong
  // the day the field was added.
  const entry = { checked: { date: "2026-08-12", prose: "a".repeat(16) } } as unknown as Entry;
  assert.deepEqual(checkChecked(entry, fixed("a".repeat(16)), fixed("anything")), []);
});

/**
 * Which fields a stamp covered, and how that separates a widened walk from an
 * edited entry.
 *
 * Until 2026-09-16 a check record held a fingerprint and no account of what it
 * was taken over, so admitting a field to the walk moved every fingerprint in
 * the corpus and the validator called all 80 entries edited on a day none of
 * them were. Measured against `b2355f9`, 79 of those 80 were false: restricting
 * today's walk to the pre-`decks` field set reproduces the pre-`decks` stamp for
 * every entry except `rummy-500`, whose deal notes really had been corrected.
 *
 * The fingerprints below are readable strings rather than hashes. `checkRecord`
 * only ever compares them for equality, and a test that says what moved is
 * worth more here than one that says 4c235af9 became 9e1120bb.
 */
const OVER = ["variants[].name", "variants[].description"];

/** A fingerprint of an imagined walk: the text of each field it is asked for. */
const walk =
  (text: Record<string, string>): Fingerprint =>
  (only) =>
    (only ?? NESTED_FIELDS).map((field) => `${field}=${text[field] ?? ""}`).join("/");

/** An entry whose nested record covered `fields` and nothing else. */
const stamped = (text: Record<string, string>, fields: readonly string[], prose?: string) =>
  ({
    sources_consulted: ["Pagat", "Wikipedia"],
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      fields: [...PROSE_FIELDS],
      nested: { date: "2026-08-12", prose: prose ?? walk(text)(fields), fields: [...fields] },
    },
  }) as unknown as Entry;

test("a field joining the check is not an edit", () => {
  // The whole point. `decks` and the rest join the walk; the entry is untouched;
  // the record says what it covered, so the comparison is made over those fields
  // and comes back equal.
  const text = { "variants[].name": "Cutthroat", "variants[].description": "Three play." };
  const entry = stamped({ ...text, decks: "One 52-card pack." }, OVER);

  assert.deepEqual(
    checkChecked(entry, fixed("a".repeat(16)), walk({ ...text, decks: "One 52-card pack." })),
    [],
    "a wider walk was reported as an edit to the entry",
  );
});

test("what a stamp does not reach is named, per entry and per field", () => {
  // Only fields this entry has. A record short of the walk is short for every
  // entry at once, so reporting the whole shortfall would name a missing caption
  // in every entry that has no figures -- gaps nobody can close, burying the
  // entries that really do carry prose no stamp reached.
  const entry = stamped({ "variants[].name": "Cutthroat" }, OVER) as Record<string, unknown>;
  entry["decks"] = "One 52-card pack.";
  entry["layout"] = { caption: "The tableau after the deal." };

  assert.deepEqual(uncoveredByStamp(entry as Entry), [
    {
      label: "checked.nested",
      fields: ["decks", "layout.caption"],
      chars: "One 52-card pack.".length + "The tableau after the deal.".length,
    },
  ]);

  // And a record that covers the whole walk reaches everything it carries, so
  // the line reporting this can come back empty and mean it.
  assert.deepEqual(uncoveredByStamp(stamped({}, NESTED_FIELDS)), []);
});

test("an entry edited after a field joined the check is still reported as edited", () => {
  // The case that must not be lost. Both things happened -- the walk widened and
  // a covered variant description was rewritten -- and the strict verdict has to
  // win, because a check that guesses "widened" when it might be "edited" is
  // worse than one that guesses "edited".
  const entry = stamped(
    { "variants[].name": "Cutthroat", "variants[].description": "Three play." },
    OVER,
  );
  const now = walk({
    "variants[].name": "Cutthroat",
    "variants[].description": "Three people play.",
    decks: "One 52-card pack.",
  });

  complains(checkChecked(entry, fixed("a".repeat(16)), now), "edited since it was checked");
});

test("a field the check stopped reading is reported, and not as an edit", () => {
  // The other direction: a field leaves the walk, perhaps reclassified as
  // metadata. The record goes on claiming cover over prose nothing compares now,
  // and the restricted comparison cannot see it -- filtering a walk to a field
  // it can no longer emit just drops the passages and reports an edit nobody
  // made. So it is decided by comparing the lists, before any fingerprint.
  const text = { "variants[].name": "Cutthroat" };
  const entry = stamped(text, ["variants[].name", "variants[].epigraph"]);

  complains(
    checkChecked(entry, fixed("a".repeat(16)), walk(text)),
    "which the check no longer reads",
  );
});

test("a stamp that claims to cover nothing is refused", () => {
  // An empty list restricts the fingerprint to the hash of the empty string,
  // which is the same sixteen characters for every entry there will ever be. The
  // schema refuses it with minItems; this is what refuses it when a record is
  // hand-edited past the schema.
  const entry = stamped({}, []);
  complains(checkChecked(entry, fixed("a".repeat(16)), walk({})), "records a check over nothing");
});

test("a record that does not say which fields it covered is read as covering all of them", () => {
  // The state all 160 records were in before this pass, and the state any record
  // written by hand is in. It must behave exactly as it did -- the whole walk,
  // every field -- rather than being read as covering nothing or everything by
  // accident. `npm run validate` counts these rather than letting them pass for
  // records that have said.
  const text = { "variants[].name": "Cutthroat" };
  const entry = {
    sources_consulted: ["Pagat", "Wikipedia"],
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      nested: { date: "2026-08-12", prose: walk(text)(), fields: undefined },
    },
  } as unknown as Entry;
  delete (entry["checked"] as Record<string, unknown>)["fields"];

  assert.deepEqual(checkChecked(entry, fixed("a".repeat(16)), walk(text)), []);
  complains(
    checkChecked(entry, fixed("a".repeat(16)), walk({ "variants[].name": "Cut-throat" })),
    "edited since it was checked",
  );
  assert.deepEqual(uncoveredByStamp(entry), [], "a record that never said is not short of anything");
  assert.equal(recordsWithoutFields(entry), 2);
});

test("the field list covers the wording amendment as well as the check", () => {
  // `reworded` names the prose as it stands now, over the same fields the check
  // covered -- there is one list per record, not one per fingerprint. A field
  // joining the walk after an amendment must no more invalidate the amendment
  // than it invalidates the check.
  const text = { "variants[].name": "Cutthroat", "variants[].description": "Three play." };
  const entry = stamped(text, OVER, "a-stale-fingerprint");
  (entry["checked"] as Record<string, Record<string, unknown>>)["nested"]!["reworded"] = {
    date: "2026-08-15",
    prose: walk(text)(OVER),
  };

  assert.deepEqual(
    checkChecked(entry, fixed("a".repeat(16)), walk({ ...text, decks: "One 52-card pack." })),
    [],
    "a wider walk was reported as an edit to an amended entry",
  );
});

// --- what no stamp covers ---------------------------------------------------

test("every text-bearing field is accounted for, covered or named as not prose", () => {
  // The hole that let the coverage line overstate itself. `deal[].note` was
  // text, was prose, was printed in the booklet, and sat outside both
  // fingerprints -- and the report measured its gap only within the text it
  // already covered, so it announced a gap of zero while 1,350 characters were
  // compared against nothing. A count that cannot see what it does not cover
  // will always come back clean.
  //
  // So every string in every entry now lands in exactly one of three buckets:
  // covered by PROSE_FIELDS, covered by nestedProse, or named in NOT_PROSE as
  // an identifier, enumeration, card name, hash or date. A field added to the
  // schema and forgotten lands in none of them and fails here.
  const surprises = new Map<string, number>();
  for (const game of loadGames()) {
    for (const [path, chars] of uncoveredProse(game as unknown as Entry)) {
      surprises.set(path, (surprises.get(path) ?? 0) + chars);
    }
  }

  // What is left is genuinely uncovered prose, and it is these three and only
  // these three. Listing them is the point: they are what the report now names
  // rather than leaves out of its own denominator. `decks` was the fourth until
  // 2026-09-16 and was the largest of them at 5,262 characters; it left this list
  // by joining nestedProse, not by being reclassified as metadata.
  assert.deepEqual(
    [...surprises.keys()].sort(),
    ["equipment.other[]", "equipment.special_deck", "layout.rows[][].label"],
    "a text-bearing field is neither covered nor named as not-prose — add it to " +
      "nestedProse if it is prose, or to NOT_PROSE if it is not, and say which in the commit",
  );
});

test("a field nobody accounted for is reported rather than ignored", () => {
  // The control. Without it the test above passes just as happily against a
  // walk that returns nothing at all.
  const invented = {
    ...(loadGames()[0] as unknown as Record<string, unknown>),
    house_rule_blurb: "A sentence nobody has classified as prose or as metadata.",
  } as unknown as Entry;

  assert.ok(
    [...uncoveredProse(invented).keys()].includes("house_rule_blurb"),
    "a new text field slipped past the walk unnoticed",
  );
});

/**
 * The count and the fingerprint have to be reading the same entry.
 *
 * Four entries carry their figures by reference: `figure_refs` names a shared
 * hand-ranking drawing, `loadGames` splices it in, and that resolved entry is
 * what the originality tool compares and what the stamp was made over. The
 * validator resolved the entry to fingerprint it and counted the file as
 * written, so its coverage line was short by 593 characters in each of those
 * four -- 2,372 in all -- while claiming to report how much prose the
 * fingerprints cover.
 *
 * A number that is nearly right is the worst kind here, because the whole point
 * of the line is to be trusted about a gap. Asserted against the validator's
 * own output rather than against `unreadProse` alone, because the defect was
 * never in the counting function: it was in which entry the caller handed it.
 */
test("the coverage line counts the same entry the fingerprint covers", () => {
  let out: string;
  try {
    out = execFileSync("node", [join(REPO_ROOT, "packages/build/validate.ts"), "--quiet"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
  } catch (error) {
    out = `${(error as { stdout?: string }).stdout ?? ""}`;
  }

  const printed = /Prose outside PROSE_FIELDS \u2014 ([\d,]+) characters/.exec(out);
  assert.ok(printed, "the validator no longer reports how much prose sits outside PROSE_FIELDS");

  // `loadGames` resolves shared figures, so this is the corpus as a check reads
  // it. If the validator ever counts the unresolved entry again, these part.
  const covered = loadGames().reduce(
    (total, game) => total + unreadProse(game as unknown as Entry),
    0,
  );
  assert.equal(
    Number(printed[1]!.replace(/,/g, "")),
    covered,
    "the validator is counting a different entry than the one it fingerprints",
  );
});

test("every string the schema allows is accounted for, not only every string an entry has", () => {
  // The guarantee the first cut of this claimed and did not have.
  // `uncoveredProse` walks an entry's DATA, so a field the schema permits and no
  // entry has yet filled in is invisible to it. That is exactly how
  // `checked.nested.reworded` -- in the schema, described there as the nested
  // twin of `checked.reworded`, and already handled by checkRecord -- sat in no
  // bucket at all: the first wording-only fix to a nested passage would have
  // turned the gate red and had validate report a hash and a date as prose.
  //
  // So the schema is the thing walked here, and every string path it allows has
  // to land somewhere deliberate.
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as Record<string, unknown>;
  const paths: string[] = [];
  const walk = (node: Record<string, unknown> | undefined, path: string): void => {
    if (!node || typeof node !== "object") return;
    const type = node["type"];
    if (type === "string" || (Array.isArray(type) && type.includes("string"))) {
      paths.push(path);
      return;
    }
    if (node["items"]) {
      walk(node["items"] as Record<string, unknown>, `${path}[]`);
      return;
    }
    for (const [key, value] of Object.entries((node["properties"] ?? {}) as Record<string, unknown>)) {
      walk(value as Record<string, unknown>, path ? `${path}.${key}` : key);
    }
  };
  walk(schema, "");
  assert.ok(paths.length > 35, `only ${paths.length} string paths in the schema — the walk is broken`);

  // Every path nestedProse can emit, from an instance BUILT FROM THE SCHEMA
  // rather than typed out by hand.
  //
  // The hand-written fixture that stood here until 2026-09-16 had the very
  // blind spot this test exists to close. It carried no `decks` field, so
  // nestedProse could not emit "decks" from it, so "decks" stayed on the
  // leftover list below -- and the day `decks` joined nestedProse the list was
  // still right by accident and the test stayed green. A fixture that omits a
  // field cannot notice that field. Growing it by hand each time is the same
  // "two copies of which fields count" that nestedProse itself replaced.
  const fill = (node: Record<string, unknown> | undefined, path: string): unknown => {
    if (!node || typeof node !== "object") return null;
    const type = node["type"];
    if (type === "string" || (Array.isArray(type) && type.includes("string"))) return `text at ${path}`;
    if (type === "integer" || type === "number") return 2;
    if (type === "boolean") return true;
    if (node["items"]) return [fill(node["items"] as Record<string, unknown>, `${path}[]`)];
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries((node["properties"] ?? {}) as Record<string, unknown>)) {
      out[key] = fill(value as Record<string, unknown>, path ? `${path}.${key}` : key);
    }
    return out;
  };
  const maximal = fill(schema, "") as CardGame;
  // The control on the fixture: if it stopped carrying every string the schema
  // allows, every claim below would weaken silently.
  const missing = paths.filter((path) => {
    let node: unknown = maximal;
    for (const step of path.split(".")) {
      const key = step.replace(/\[\]/g, "");
      node = (node as Record<string, unknown> | undefined)?.[key];
      for (const _ of step.match(/\[\]/g) ?? []) node = (node as unknown[] | undefined)?.[0];
    }
    return typeof node !== "string";
  });
  assert.deepEqual(missing, [], "the fixture does not carry every string the schema allows");
  const covered = new Set<string>([
    ...(PROSE_FIELDS as readonly string[]),
    ...nestedProse(maximal).map((passage) => passage.where.replace(/\[\d+\]/g, "[]")),
  ]);

  // Both directions. A path in NOT_PROSE that the schema does not allow is dead
  // weight that reads like cover -- `checked.reworded.sources[]` was one, and
  // the schema forbids it outright with additionalProperties: false.
  assert.deepEqual(
    [...NOT_PROSE].filter((path) => !paths.includes(path)).sort(),
    [],
    "NOT_PROSE names a path the schema does not allow, so it excuses nothing and reads as if it does",
  );

  // And what is left over is prose no stamp covers. It is named here so that
  // widening it is a deliberate edit to this list rather than a silent drift.
  assert.deepEqual(
    paths.filter((path) => !covered.has(path) && !NOT_PROSE.has(path)).sort(),
    ["equipment.other[]", "equipment.special_deck", "layout.rows[][].label"],
    "a string the schema allows is neither covered by a fingerprint, named as not-prose, nor " +
      "on the list of prose nothing checks — decide which it is",
  );
});
