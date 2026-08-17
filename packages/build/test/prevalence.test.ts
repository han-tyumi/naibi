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
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

import { loadGames } from "naibi";

import { CONTROL, MARKERS, MARKERS_V2, controlPasses, markersIn, scan, spread } from "../prevalence.ts";

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
