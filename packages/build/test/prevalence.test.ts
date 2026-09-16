/**
 * Tests for the prevalence-marker instrument and for the two hand-read samples
 * its numbers come from.
 *
 * The point of most of these is the same: `docs/specs/2026-08-13-prevalence-vocabulary-precision.md`
 * quotes precision figures, and this repo's rule is that generated output gets a
 * `--check` and a claim gets a test. A precision figure computed once by hand and
 * written into a document is exactly the kind of prose that drifts away from what
 * it describes.
 */

import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { GAMES_DIR, NESTED_FIELDS, loadGames } from "naibi";

import {
  OUTSIDE_FIELDS,
  CONTROL,
  MARKERS,
  MARKERS_V2,
  BASELINE_WHAT,
  baselineChange,
  baselineFrom,
  changeReport,
  claimHash,
  controlPasses,
  gateProblems,
  markersIn,
  mergeBaseline,
  parseBaseline,
  readBaseline,
  scopeFrom,
  scan,
  spread,
} from "../prevalence.ts";

const HERE = fileURLToPath(new URL(".", import.meta.url));
const read = (name: string) => JSON.parse(readFileSync(join(HERE, name), "utf8"));
const v1 = read("prevalence-sample.json");
const v2 = read("prevalence-heldout.json");
const games = loadGames();

const tally = (items: { verdict: string }[]) => {
  const out: Record<string, number> = { claim: 0, weak: 0, hedged: 0, innocent: 0 };
  for (const i of items) out[i.verdict] = (out[i.verdict] ?? 0) + 1;
  return out;
};

test("the instrument controls itself, in both vocabularies", () => {
  // The spec's own first run "returned zero across all 80 entries... and was a
  // broken regex", and it requires every tool built from it to prove it works
  // before reporting. Both directions, because a check that flags everything is
  // as useless as one that flags nothing.
  for (const useV2 of [false, true]) {
    const label = useV2 ? "v2" : "v1";
    assert.ok(controlPasses(useV2).ok, `${label} control does not pass`);
    assert.ok(
      markersIn(CONTROL.flags, useV2).length > 0,
      `${label} failed to flag the planted claim`,
    );
    assert.deepEqual(
      markersIn(CONTROL.ignores, useV2),
      [],
      `${label} flagged a clean procedural sentence`,
    );
    assert.deepEqual(
      markersIn(CONTROL.exempt, useV2),
      [],
      `${label} let a standard-deck sentence through the not-a-claim filter`,
    );
  }
});

test("a broken marker regex fails the control rather than reporting a clean corpus", () => {
  // The failure mode this whole design exists for, reproduced: if the pattern
  // cannot match, the control must catch it. Simulated by asking the real
  // matcher about a sentence with no marker in it and confirming that the
  // planted claim is the thing that separates working from broken.
  assert.deepEqual(markersIn("Deal the cards and play.", false), []);
  assert.notDeepEqual(markersIn(CONTROL.flags, false), []);
});

test("`standard` is in the designed vocabulary and out of the measured one", () => {
  // The one substantive vocabulary change the sampling produced. If somebody
  // re-adds it, the spec's reasoning should be re-read first: 6 of its 9 sampled
  // hits were noise, and it carried 68 of 455 flags.
  assert.ok(MARKERS.includes("standard"), "v1 should be the spec's vocabulary, unedited");
  assert.ok(!(MARKERS_V2 as readonly string[]).includes("standard"));
});

test("every marker in each vocabulary is lower-case and non-empty", () => {
  for (const list of [MARKERS, MARKERS_V2]) {
    for (const m of list) {
      assert.equal(m, m.toLowerCase().trim());
      assert.ok(m.length > 0);
    }
  }
});

test("the sampler is deterministic and spreads rather than taking a prefix", () => {
  const items = Array.from({ length: 100 }, (_, i) => i);
  assert.deepEqual(spread(items, 4), [0, 25, 50, 75]);
  assert.deepEqual(spread(items, 4), spread(items, 4), "same input, different output");
  assert.deepEqual(spread(items, 4, 3), [3, 28, 53, 78], "offset should shift the draw");
  assert.deepEqual(spread([1, 2], 5), [1, 2], "asking for more than exists yields everything");
});

test("the hand-read samples still describe sentences that are in the corpus", () => {
  // A verdict attached to a sentence that has been edited away is worse than no
  // verdict, because it still counts towards a percentage. Any audit that
  // rewrites one of these sentences should fail here and re-read it.
  const present = new Set(scan(games, undefined, false).map((h) => h.sentence));
  const presentV2 = new Set(scan(games, undefined, true).map((h) => h.sentence));

  // Drift must be acknowledged in writing rather than pass silently. An audit
  // that rewrites a sampled sentence has to add it to `edited_since` and say why,
  // which is how the tien-len audit on 2026-08-13 came to notice it had corrected
  // a sentence this sample had judged innocent -- and to revise the judgement.
  const acknowledged = (file: { edited_since?: { n: number }[] }) =>
    new Set((file.edited_since ?? []).map((e) => e.n));

  for (const [label, file, set] of [
    ["prevalence-sample.json", v1, present],
    ["prevalence-heldout.json", v2, presentV2],
  ] as const) {
    const ok = acknowledged(file);
    for (const item of file.items) {
      assert.ok(
        set.has(item.sentence) || ok.has(item.n),
        `${label} item ${item.n} (${item.game}) is no longer in the corpus and is not ` +
          `listed in edited_since. Re-read the replacement, then record it:\n  ${item.sentence}`,
      );
    }
    // The reverse, so the list cannot rot into a blanket excuse.
    for (const e of file.edited_since ?? []) {
      const item = file.items.find((i: { n: number }) => i.n === e.n);
      assert.ok(item, `${label} edited_since names item ${e.n}, which does not exist`);
      assert.ok(
        !set.has(item!.sentence),
        `${label} item ${e.n} is listed in edited_since but is still in the corpus`,
      );
    }
  }
});

test("the held-out sample really is held out", () => {
  // The whole value of the second number is that these sentences did not inform
  // the vocabulary. If they overlap, the 80% is measuring its own tuning.
  const tuned = new Set(v1.items.map((i: { sentence: string }) => i.sentence));
  const overlap = v2.items.filter((i: { sentence: string }) => tuned.has(i.sentence));
  assert.deepEqual(
    overlap.map((i: { n: number }) => i.n),
    [],
    "held-out sentences appear in the sample the vocabulary was derived from",
  );
});

test("every verdict is one of the four the legend defines", () => {
  for (const file of [v1, v2]) {
    const allowed = Object.keys(file.legend);
    for (const item of file.items) {
      assert.ok(allowed.includes(item.verdict), `unknown verdict "${item.verdict}"`);
    }
  }
});

test("the precision figures the spec quotes are the ones in the samples", () => {
  // docs/specs/2026-08-13-prevalence-vocabulary-precision.md quotes these. If a
  // judgement is revised, this fails and the document has to be corrected with
  // it rather than left claiming a number nobody recomputed.
  const a = tally(v1.items);
  assert.equal(v1.items.length, 50);
  assert.deepEqual(a, { claim: 16, weak: 11, hedged: 3, innocent: 20 });
  assert.equal(a.claim + a.weak, 27, "v1 loose precision is quoted as 27/50");

  const b = tally(v2.items);
  assert.equal(v2.items.length, 25);
  assert.deepEqual(b, { claim: 16, weak: 4, hedged: 1, innocent: 4 });
  assert.equal(b.claim + b.weak, 20, "v2 loose precision is quoted as 20/25");
});

test("the second reader's agreement is the figure the record quotes", () => {
  // docs/specs/2026-08-17-a-second-reader-on-the-prevalence-sample.md. The
  // 2026-08-13 measurement asked for a second reader and named the stake: "A
  // second reader disagreeing on six sentences would change the recommendation."
  // Six did cross the real/noise line -- and all six the same way, which is the
  // finding. Recomputed here so neither number can drift away from the data.
  const items = [...v1.items, ...v2.items];
  assert.equal(items.length, 75);
  for (const item of items) {
    assert.ok(
      Object.keys(v1.legend).includes(item.verdict_2),
      `unknown second verdict "${item.verdict_2}"`,
    );
  }

  const exact = items.filter((i) => i.verdict === i.verdict_2).length;
  assert.equal(exact, 63, "exact agreement over the four categories is quoted as 63/75");

  // The only distinction the measurement actually rests on: is this flag worth a
  // reviewer's time, or is it noise? Agreement here is much higher than on the
  // four-way split, which is the argument for a gate that fires on claim+weak.
  const real = (v: string) => v === "claim" || v === "weak";
  assert.equal(
    items.filter((i) => real(i.verdict) === real(i.verdict_2)).length,
    69,
    "real-vs-noise agreement is quoted as 69/75",
  );

  // Every disagreement runs one way. If a later reading breaks that, the offset
  // reading below stops being true and the record has to say so.
  const rank: Record<string, number> = { innocent: 0, hedged: 0, weak: 1, claim: 2 };
  const disagreements = items.filter((i) => i.verdict !== i.verdict_2);
  assert.equal(disagreements.length, 12);
  assert.deepEqual(
    disagreements.filter((i) => rank[i.verdict_2]! <= rank[i.verdict]!),
    [],
    "the second reader was stricter on every disagreement; that is the finding",
  );
});

test("the measured vocabulary flags fewer sentences than the designed one", () => {
  // The direction is the claim, not the exact numbers: v2 exists to cut noise,
  // so it must not grow the flag count. The counts themselves move with every
  // audit and are reported by the tool rather than frozen here.
  const designed = scan(games, undefined, false).length;
  const measured = scan(games, undefined, true).length;
  assert.ok(
    measured < designed,
    `v2 flagged ${measured} and v1 flagged ${designed}; v2 is supposed to cut noise`,
  );
});

test("the tool reports on the corpus rather than on a fixture", () => {
  // Guards against the scan silently reading nothing — the same "silence is not
  // coverage" rule the validator and the originality pass carry.
  const hits = scan(games, undefined, true);
  assert.ok(games.length >= 80, "the corpus should be loaded");
  assert.ok(hits.length > 0, "the scan found nothing at all, which means it is not scanning");
  assert.ok(
    new Set(hits.map((h) => h.game)).size > 1,
    "every hit came from one entry, so the sweep is not sweeping",
  );
});

test("what a counts gate misses, and what a hash gate costs, are the figures the record quotes", () => {
  // docs/specs/2026-08-18-counts-or-hashes.md. The write-time-gate design left
  // one question open -- "Per-entry counts, or frozen sentence hashes?" -- and
  // answered it with an assumption: hashes "churn on every prose edit". Every
  // commit that ever touched game data was replayed through the v2 instrument
  // to put numbers on both sides. Recomputed from the record so the aggregate
  // and the cases it is drawn from cannot drift apart.
  const churn = read("prevalence-claim-churn.json");
  const { replay, cases, legend, pass_kinds } = churn;

  // The three buckets have to account for every transition, or the replay
  // dropped some on the floor and every figure below is drawn from a subset.
  assert.equal(
    replay.unchanged + replay.count_changed + replay.count_blind,
    replay.entry_transitions,
    "the transition buckets do not add up to the transitions",
  );
  assert.equal(cases.length, replay.count_blind, "a count-blind transition went unread");

  for (const c of cases) {
    assert.ok(Object.keys(legend).includes(c.verdict), `unknown verdict "${c.verdict}"`);
    assert.ok(Object.keys(pass_kinds).includes(c.pass), `unknown pass kind "${c.pass}"`);
    // A blind case is blind precisely because the count held still.
    assert.ok(c.removed.length > 0 && c.added.length > 0, `${c.entry}@${c.commit} changed nothing`);
    assert.equal(
      c.removed.length,
      c.added.length,
      `${c.entry}@${c.commit} is in the count-blind set but its count moved`,
    );
  }

  const claims = cases.filter((c: { verdict: string }) => c.verdict === "claim");
  assert.equal(claims.length, 9, "nine real claim changes are quoted as invisible to a counts gate");
  assert.equal(cases.length - claims.length, 5, "five are quoted as wording only");

  // The finding, and the reason the answer is not a coin-toss: which kind of
  // pass a blind change came from predicts what it was, without exception. If a
  // later replay breaks this, the record's recommendation stops following from
  // its evidence and has to be rewritten rather than re-quoted.
  assert.deepEqual(
    cases
      .filter((c: { verdict: string; pass: string }) => (c.verdict === "claim") !== (c.pass === "fact"))
      .map((c: { entry: string; commit: string }) => `${c.entry}@${c.commit}`),
    [],
    "a claim change came from a wording pass, or a reword from a fact pass",
  );

  // The measured correction to the design's assumption. A hash file has to cost
  // more than a counts file -- it notices strictly more -- but "every prose
  // edit" it is not, and the gap is the whole price of the extra detection.
  assert.ok(
    replay.commits_churning_a_hash_file >= replay.commits_churning_a_counts_file,
    "a hash file cannot churn less often than a counts file",
  );
  assert.equal(
    replay.commits_churning_a_hash_file - replay.commits_churning_a_counts_file,
    5,
    "the extra churn a hash file costs is quoted as five commits",
  );
  assert.ok(
    replay.commits_churning_a_hash_file < replay.boundaries,
    `a hash file churning on ${replay.commits_churning_a_hash_file} of ${replay.boundaries} commits is not "every prose edit"`,
  );
});

// --- The write-time gate -----------------------------------------------------

const baseline = readBaseline();

test("the committed baseline is the corpus as it stands", () => {
  // The same rule `rendered/` and `site/` live under: a generated artifact that
  // is committed gets checked against what would be generated now. A baseline
  // drifting from the corpus is the one failure that makes every other test
  // here vacuous, because the gate would be comparing against a fiction.
  assert.deepEqual(
    gateProblems(games, baseline.entries),
    [],
    "run `npm run prevalence -- --baseline` — the corpus and its baseline disagree",
  );
  assert.equal(
    Object.keys(baseline.entries).length,
    games.length,
    "every entry needs a baseline record, including one with no flagged sentence",
  );
});

test("a claim added to an entry fails the gate, naming the sentence", () => {
  // The control the spec demands of anything built from it: prove it fires
  // before believing that it is quiet because the corpus is clean. A gate that
  // cannot fail is indistinguishable from one that passes everything.
  const victim = games[0]!;
  const planted = {
    ...victim,
    play: `${victim.play} Most tables play it this way.`,
  } as typeof victim;
  const problems = gateProblems(
    games.map((g) => (g.id === victim.id ? planted : g)),
    baseline.entries,
  );
  assert.equal(problems.length, 1, "one planted claim should raise exactly one problem");
  assert.equal(problems[0]!.entry, victim.id);
  assert.match(problems[0]!.problem, /which sentence in a source ranks this\?/);
  assert.match(problems[0]!.problem, /Most tables play it this way\./);
});

test("a claim leaving the corpus fails too, which is what makes it a ratchet", () => {
  // The design's second constraint: "a count above the budget fails, a count
  // below it fails too with an instruction to lower the number. The second half
  // is what makes the backlog shrink instead of ossifying."
  const [id, hashes] = Object.entries(baseline.entries).find(([, h]) => h.length > 0)!;
  const loosened = { ...baseline.entries, [id]: [...hashes, "0000000000000000"] };
  const problems = gateProblems(games, loosened);
  assert.equal(problems.length, 1);
  assert.equal(problems[0]!.entry, id);
  assert.match(problems[0]!.problem, /baselined sentence\(s\) are gone/);
});

test("an entry with no baseline record fails rather than passing quietly", () => {
  // Silence is not coverage. An entry the baseline never heard of would
  // otherwise be the one entry in the corpus nothing compares.
  const { [games[0]!.id]: _dropped, ...missing } = baseline.entries;
  const problems = gateProblems(games, missing);
  assert.equal(problems.length, 1);
  assert.match(problems[0]!.problem, /no prevalence baseline recorded/);
});

test("a baseline naming an entry that does not exist fails", () => {
  const problems = gateProblems(games, { ...baseline.entries, "not-a-game": [] });
  assert.deepEqual(
    problems.map((p) => p.entry),
    ["not-a-game"],
  );
});

test("a claim's identity survives re-wrapping and not rewording", () => {
  // Whitespace is collapsed before hashing so that re-flowing a paragraph is
  // not a new claim; everything else is, including a single word.
  assert.equal(
    claimHash("Most tables play it this way."),
    claimHash("Most   tables\n  play it this way. "),
  );
  assert.notEqual(
    claimHash("Most tables play it this way."),
    claimHash("Many tables play it this way."),
  );
});

test("the gate reads the same sentences from a raw file as from the loader", () => {
  // The exact defect that shipped on 2026-08-16: `--stamp-nested` hashed games
  // that `loadGames` had spliced shared figures into, `validate` hashed the raw
  // JSON, and four entries reported edited-since-checked against a stamp that
  // was correct. This gate has the same two callers -- it is generated from
  // `loadGames()` and enforced in `validate` over `JSON.parse` of each file --
  // so the two have to be shown to agree rather than assumed to.
  const raw = readdirSync(GAMES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(GAMES_DIR, f), "utf8")) as (typeof games)[number]);
  assert.equal(raw.length, games.length, "the two paths disagree about how many entries there are");
  assert.deepEqual(
    baselineFrom(raw),
    baselineFrom(games),
    "the raw files and the loader flag different sentences, so one of the two callers is wrong",
  );
});

test("a missing baseline says so instead of throwing from inside the validator", () => {
  // Reading a file that is not there would surface as ENOENT from the middle of
  // `npm run validate`, which reads as the validator being broken rather than
  // as the gate having nothing to compare against.
  assert.throws(
    () => JSON.parse(readFileSync(join(HERE, "no-such-baseline.json"), "utf8")),
    /ENOENT/,
    "the bare read is what readBaseline has to improve on",
  );
  assert.doesNotThrow(() => readBaseline());
});

// --- rewriting the baseline --------------------------------------------------

test("rewriting the baseline says which claims it adds and which it drops", () => {
  // Rewriting is the one operation that can loosen the ratchet, so it is the
  // one that must not be quiet. Hashes rather than sentences here because this
  // is the arithmetic; the caller quotes the sentence it is about to bless.
  const change = baselineChange(
    { alpha: ["1111111111111111"], beta: [], gamma: ["3333333333333333"] },
    { alpha: [], beta: ["2222222222222222"], gamma: ["3333333333333333"] },
  );

  assert.deepEqual(change.added, [{ entry: "beta", hash: "2222222222222222" }]);
  assert.deepEqual(change.removed, [{ entry: "alpha", hash: "1111111111111111" }]);
});

test("regenerating for a new entry leaves every other entry's claims frozen", () => {
  // The hole the gate shipped with, measured on 2026-09-14. A new entry has no
  // baseline record, so `npm run validate` refuses it until the baseline is
  // rewritten -- and the rewrite was whole-corpus only. So the mandatory act of
  // adding a game absorbed every unreviewed claim anywhere else: a claim
  // planted in war.json was quoted by the gate, and gone after the
  // regeneration, under the line "none added and none gone".
  const victim = games[0]!;
  const planted = {
    ...victim,
    play: `${victim.play} Most tables play it this way.`,
  } as typeof victim;
  const arrival = { ...games[1]!, id: "zz-arrival" } as typeof victim;
  const corpus = [...games.map((g) => (g.id === victim.id ? planted : g)), arrival];

  const rewritten = mergeBaseline(baseline.entries, baselineFrom(corpus), "zz-arrival");

  assert.ok(rewritten["zz-arrival"], "the arriving entry got no baseline record");

  const problems = gateProblems(corpus, rewritten);
  assert.equal(
    problems.length,
    1,
    "a scoped rewrite covered the new entry and something else besides",
  );
  assert.equal(problems[0]!.entry, victim.id);
  assert.match(problems[0]!.problem, /Most tables play it this way\./);
});

test("a scoped rewrite still drops what has left the entry it names", () => {
  // Scoping must not cost the ratchet on the entry being rewritten, or the
  // scoped form would be the quiet way to keep a stale hash alive.
  const [id, hashes] = Object.entries(baseline.entries).find(([, h]) => h.length > 0)!;
  const loosened = { ...baseline.entries, [id]: [...hashes, "0000000000000000"] };

  const rewritten = mergeBaseline(loosened, baselineFrom(games), id);

  assert.ok(!rewritten[id]!.includes("0000000000000000"), "the stale hash survived its own rewrite");
  assert.deepEqual(gateProblems(games, rewritten), []);
});

// --- what the review of 2026-09-14 found in the first cut of all this ---------

test("a claim repeated into a second field is an addition, not a no-change", () => {
  // baselineFrom records one hash per flagged sentence and gateProblems counts
  // them as a multiset, so a second copy of an already-baselined sentence is a
  // new problem it fires on. A diff over sets calls that no change -- and then
  // the rewrite that blesses it prints "No change: the baseline already says
  // what the corpus says", which is the one line 0028 promises will not lie.
  // Reachable because claimHash excludes the field on purpose: the same
  // sentence in `play` and in a variant description hashes the same.
  const added = baselineChange(
    { alpha: ["1111111111111111"] },
    { alpha: ["1111111111111111", "1111111111111111"] },
  );
  assert.deepEqual(added.added, [{ entry: "alpha", hash: "1111111111111111" }]);
  assert.deepEqual(added.removed, []);

  const dropped = baselineChange(
    { alpha: ["1111111111111111", "1111111111111111"] },
    { alpha: ["1111111111111111"] },
  );
  assert.deepEqual(dropped.removed, [{ entry: "alpha", hash: "1111111111111111" }]);
  assert.deepEqual(dropped.added, []);
});

test("the rewrite's report quotes the sentence it is about to freeze", () => {
  // CONTRIBUTING step 8 tells contributors to read what the rewrite prints and
  // 0028 records the quoting as the whole fix, but the printing had no test:
  // every line of it could be deleted with the suite green, leaving the
  // one-line output 0028 describes as the defect.
  const lines = changeReport(
    {
      added: [{ entry: "alpha", hash: "1111111111111111" }],
      removed: [{ entry: "beta", hash: "2222222222222222" }],
    },
    new Map([["1111111111111111", "Most tables play it this way."]]),
  );
  assert.ok(
    lines.some((l) => l.includes("alpha") && l.includes("Most tables play it this way.")),
    `the added claim was not quoted:\n  ${lines.join("\n  ")}`,
  );
  assert.ok(
    lines.some((l) => l.includes("beta") && l.includes("2222222222222222")),
    `the dropped claim was not named:\n  ${lines.join("\n  ")}`,
  );
  assert.deepEqual(changeReport({ added: [], removed: [] }, new Map()), [
    "No change: the baseline already says what the corpus says.",
  ]);
});

test("a baseline that will not parse is not read as no baseline at all", () => {
  // Opposite situations, and the first cut treated them alike. The baseline is
  // the file two branches both touch under the per-entry workflow, so a merge
  // conflict in it is the ordinary case -- and a scoped rewrite over "no
  // baseline" drops all 79 other entries while printing "leaving the rest
  // frozen".
  assert.throws(() => parseBaseline("<<<<<<< HEAD"), /will not parse/i);
  assert.throws(() => parseBaseline('{"what":"x"}'), /entries/);
  assert.deepEqual(
    parseBaseline(JSON.stringify({ what: "x", vocabulary: "v2", entries: { a: [] } })).entries,
    { a: [] },
  );
});

test("--game without an entry id is refused rather than rewriting everything", () => {
  // `undefined` is what "rewrite the whole corpus" looks like, so a swallowed
  // argument -- a typo, or an unset $SLUG -- asked for the scoped form and got
  // the blast radius, silently.
  assert.deepEqual(scopeFrom(["--baseline"]), { ok: true, only: undefined });
  assert.deepEqual(scopeFrom(["--baseline", "--game", "durak"]), { ok: true, only: "durak" });
  assert.equal(scopeFrom(["--baseline", "--game"]).ok, false);
  assert.equal(scopeFrom(["--baseline", "--game", "--v2"]).ok, false);
});

test("the gate says to rewrite the entry it is complaining about, not the corpus", () => {
  // The only text a contributor actually sees when the gate fires, and it named
  // the whole-corpus rewrite -- the command 0028 exists to keep them away from,
  // at the exact moment they are most likely to run it.
  const arrival = { ...games[1]!, id: "zz-arrival" } as (typeof games)[number];
  const noRecord = gateProblems([...games, arrival], baseline.entries).find(
    (p) => p.entry === "zz-arrival",
  );
  assert.ok(noRecord, "an entry with no baseline record no longer fails");
  assert.match(noRecord.problem, /--baseline --game zz-arrival/);

  const [id, hashes] = Object.entries(baseline.entries).find(([, h]) => h.length > 0)!;
  const stale = gateProblems(games, { ...baseline.entries, [id]: [...hashes, "0000000000000000"] });
  assert.match(stale[0]!.problem, new RegExp(`--baseline --game ${id}`));
});

test("the committed baseline's header is the one the tool writes today", () => {
  // The baseline is generated and committed, like `rendered/` and `site/`, but
  // it is the only one with no --check -- so a change to the text the tool
  // stamps drifts invisibly and lands in the next contributor's diff.
  assert.equal(baseline.what, BASELINE_WHAT);
});

test("what --outside reaches is named in the walk's own terms", () => {
  // The gate tells a reader which fields it does not scan, and that sentence is
  // built by subtracting what --outside covers from the walk. If a field is
  // renamed or leaves the walk, this list goes on naming it and the subtraction
  // silently over-claims: a field nobody scans would stop being listed as
  // unscanned. That is the same failure as the hand-kept enumerations this
  // replaced, one level further in.
  assert.deepEqual(
    OUTSIDE_FIELDS.filter((field) => !NESTED_FIELDS.includes(field)),
    [],
    "--outside claims a field the walk does not read",
  );
});
