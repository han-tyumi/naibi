/**
 * The deal and scoring tables, built once.
 *
 * These were built three times -- in `render-markdown.ts`, in `build-web.ts`
 * and in `build-pdf.ts` -- and had already drifted apart by the time anyone
 * looked. The booklet's deal table never read `note` at all, so 30 rows across
 * 8 entries lost 1,350 characters on the way to print, including `rummy-500`'s
 * "Five to eight players shuffle two packs together, 104 cards" -- which is how
 * many packs to open, not a footnote. The other two disagreed on the wording of
 * a header and of a cell.
 *
 * So the model lives here and the three renderers only format it. What is
 * asserted below is the model; that all three use it is asserted in
 * `packages/build/test/render.test.ts`, because the way this broke was one
 * renderer quietly not calling what the others did.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { dealTable, loadGames, scoringTable } from "../src/index.ts";

test("a deal note reaches the table", () => {
  const built = dealTable([
    { players: 2, hand: 7, note: "One 52-card pack." },
    { players: 6, hand: 7, note: "Two packs shuffled together, 104 cards." },
  ]);

  assert.deepEqual(built.header, ["Players", "Each player gets", "Notes"]);
  assert.deepEqual(built.rows, [
    ["2", "7 cards", "One 52-card pack."],
    ["6", "7 cards", "Two packs shuffled together, 104 cards."],
  ]);
});

test("a column nothing fills is not drawn", () => {
  // Every entry would otherwise carry an empty Notes column, which on a printed
  // page costs width the other columns need.
  const built = dealTable([{ players: 2, hand: 7 }]);
  assert.deepEqual(built.header, ["Players", "Each player gets"]);
  assert.deepEqual(built.rows, [["2", "7 cards"]]);
});

test("a row missing the column its neighbours filled gets a placeholder", () => {
  const built = dealTable([
    { players: 2, hand: 7, note: "One pack." },
    { players: 3, hand: 5 },
  ]);
  assert.deepEqual(built.rows[1], ["3", "5 cards", "—"]);
});

test("both optional columns appear in a fixed order", () => {
  // Removed before Notes, so a reader moving between entries finds the same
  // column in the same place.
  const built = dealTable([
    { players: 4, hand: 8, removed: "the twos", note: "One pack." },
  ]);
  assert.deepEqual(built.header, ["Players", "Each player gets", "Removed from the deck", "Notes"]);
  assert.deepEqual(built.rows, [["4", "8 cards", "the twos", "One pack."]]);
});

test("a hand of zero says the deck is shared out rather than reading as nothing", () => {
  const built = dealTable([{ players: 4, hand: 0 }]);
  assert.deepEqual(built.rows, [["4", "the whole deck, shared out"]]);
});

test("the scoring table carries its notes too", () => {
  const built = scoringTable([
    { item: "Each ace", value: "15" },
    { item: "Going out", value: "100", note: "Doubled if nobody melded." },
  ]);
  assert.deepEqual(built.header, ["Scores", "Value", "Notes"]);
  assert.deepEqual(built.rows, [
    ["Each ace", "15", "—"],
    ["Going out", "100", "Doubled if nobody melded."],
  ]);
});

test("no entry in the corpus loses a deal or scoring note to the model", () => {
  // The corpus rather than a fixture: the defect was a field that existed in
  // the data and was read by nobody, which a fixture agreeing with the code
  // would never have shown.
  let dealNotes = 0;
  let scoringNotes = 0;
  for (const game of loadGames()) {
    const deal = game.deal;
    if (deal) {
      const built = dealTable(deal);
      for (const row of deal) {
        const note = row.note;
        if (!note) continue;
        dealNotes += 1;
        assert.ok(
          built.rows.some((cells) => cells.includes(note)),
          `${game.id}: the deal note "${note}" is not in the table`,
        );
      }
    }
    const scores = game.scoring_table;
    if (scores) {
      const built = scoringTable(scores);
      for (const row of scores) {
        const note = row.note;
        if (!note) continue;
        scoringNotes += 1;
        assert.ok(
          built.rows.some((cells) => cells.includes(note)),
          `${game.id}: the scoring note "${note}" is not in the table`,
        );
      }
    }
  }

  // Silence is not coverage, counted per table rather than in one number. The
  // floor was `checked > 25` over both kinds together, and the corpus carries
  // 218 scoring notes against 30 deal notes -- so the half that actually broke
  // could have gone to zero with the floor still clear. Set well under the real
  // counts (30 and 218), because a floor calibrated to today is a floor that
  // goes red the next time somebody legitimately edits an entry.
  assert.ok(dealNotes > 10, `only ${dealNotes} deal notes in the corpus were checked`);
  assert.ok(
    scoringNotes > 50,
    `only ${scoringNotes} scoring notes in the corpus were checked`,
  );
});
