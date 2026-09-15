/**
 * The deal and scoring tables, built once for every renderer.
 *
 * Same story as `prose.ts`, and the same fix. These were built three times --
 * in `render-markdown.ts`, in `build-web.ts` and in `build-pdf.ts` -- and by
 * the time anyone compared them they had drifted. The booklet's deal table
 * never read `note`, so 30 rows across 8 entries lost 1,350 characters on the
 * way to print, `rummy-500`'s "Five to eight players shuffle two packs
 * together, 104 cards" among them: not a footnote, but how many packs to open.
 * The surviving two disagreed on a header ("Removed from the deck" against
 * "Removed") and on a cell ("the whole deck, shared out" against "whole deck").
 *
 * Only the wording that belongs to the data lives here. What a table *looks*
 * like -- pipes, `<table>`, or ruled columns on a page -- stays with each
 * renderer.
 */

import type { CardGame } from "../schema/game.types.ts";

/** A table as its content, before anyone decides what it looks like. */
export type Table = { header: string[]; rows: string[][] };

/** What a row shows for a column its neighbours filled and it did not. */
const NOTHING = "—";

/**
 * Hand size per player count, plus anything stripped from the deck.
 *
 * The optional columns appear only when something fills them -- an empty Notes
 * column costs width the other columns need on a printed page -- and always in
 * the same order, so a reader moving between entries finds them in the same
 * place.
 */
export function dealTable(deal: NonNullable<CardGame["deal"]>): Table {
  const hasRemoved = deal.some((row) => row.removed);
  const hasNote = deal.some((row) => row.note);

  const header = ["Players", "Each player gets"];
  if (hasRemoved) header.push("Removed from the deck");
  if (hasNote) header.push("Notes");

  const rows = deal.map((row) => {
    const cells = [
      String(row.players),
      // Nought cards each is not nothing each: it is the deal where the pack
      // goes round until it runs out.
      row.hand === 0 ? "the whole deck, shared out" : `${row.hand} cards`,
    ];
    if (hasRemoved) cells.push(row.removed ?? NOTHING);
    if (hasNote) cells.push(row.note ?? NOTHING);
    return cells;
  });

  return { header, rows };
}

/** Point values, for looking up mid-hand. */
export function scoringTable(table: NonNullable<CardGame["scoring_table"]>): Table {
  const hasNote = table.some((row) => row.note);
  const header = hasNote ? ["Scores", "Value", "Notes"] : ["Scores", "Value"];
  const rows = table.map((row) => {
    const cells = [row.item, row.value];
    if (hasNote) cells.push(row.note ?? NOTHING);
    return cells;
  });
  return { header, rows };
}
