# 2026-09-16 — The deal notes joined the nested check, and one was verbatim

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-09-16

## What was checked

**0 entries, checked 2026-09-16** — and the zero is correct, for the same reason
[2026-08-16](2026-08-16-nested-prose-swept-and-stamped.md)'s was. No source was
read for what an entry *says*, only for what words it uses, so no `checked.date`
moved. What moved is the other half of the record.

**The 30 `deal[].note` values across 8 entries — 33 sentences, 1,350 characters
— were compared against every source each entry's `checked.nested.sources`
names, and those 8 carry `checked.nested` dated today.** 17 source files, 5 families:
Pagat (7 entries), Wikipedia (7), Wikibooks Card Games, Game Rules and
Sheepshead.org (1 each).

## Why they had never been checked

`nestedProse` is the single definition of which fields sit outside
`PROSE_FIELDS`, and `deal[].note` was not in it. `scoring_table[].note` — its
twin, one table over — was, from the start.

So the validator could report, truthfully by its own arithmetic and falsely in
plain English, that

> 80/80 entries have had their variant descriptions, captions and **table
> notes** compared against a source

while one of the two kinds of table note had never been compared against
anything. By count that is 30 of the corpus's 248 table notes — 12%, not half;
the halving is of the kinds of table, and saying it the other way overstates the
gap fourfold. Worse, the line beneath it measured the gap only *within* the text it
already covered — "0 of it is in entries with no `checked.nested` record" — so
the 1,350 uncovered characters were not in the numerator or the denominator.
A count that cannot see what it does not cover reports a gap of zero for ever.

They are not labels. `rummy-500`'s say how many packs to shuffle together, and
since v0.14.0 they are printed in the booklet, where nothing had ever compared
them against a source.

## Controls, before any of it was believed

Every source family was proved to answer a real page and refuse an invented one,
by reading content back rather than by trusting a status code. Two failed that
test the first time and neither would have been caught by status or size:

- **gamerules.com** answered the URL guessed for `mau-mau` with HTTP 404 and a
  41,529-byte body — byte-identical to its answer for a deliberately invented
  path. Only the title named it: `Page not found - Game Rules`. The real path
  was found and answered `MAU MAU Game Rules` at 70,286 bytes.
- **sheepshead.org** answered its basic-rules page with **HTTP 200 and 82
  characters** reading `One moment, please...` — a bot check. A retry with the
  same user agent got the real page.

Two more fetches were wrong in a way no control catches: `sheepshead.org/rules/`
and Pagat's Durak page are both *indexes*, and extracted to 398 and 2,209
characters of menu. Both were refetched from the pages that hold the rules.

Then the check itself was controlled where it had never run before: a 28–45 word
sentence from each source file was planted **into a deal note**, and all 17
(entry, source) pairs reported it. That proves three things at once — the
sources are real text, the hard-wrap was undone, and `deal[].note` is now
actually compared.

## Findings, at the measured bar of seven words verbatim

**One REUSE, and it was in a deal note.**

- `sheepshead` `deal[0].note` — eight words verbatim against Pagat: *"the picker
  plays alone against the other two"*. Rewritten to lead with the deal and let
  the pair defend, keeping `picker` and `blind`, which are terms of art.

**Left after reading, with reasons:**

- `rummy-500` `deal[4,5,6].note` and `crazy-eights` `deal[4].note` — all four
  are "Two packs shuffled together, 104 cards." against sources saying two decks
  are shuffled together when enough people play. Shared vocabulary and a shared
  fact; no shared structure, and ours is a noun phrase where every source is a
  conditional sentence.

  Left as wording, but a **fact** worth someone's attention, and this pass is not
  that pass: Pagat says 108 cards where the note says 104, and `rummy-500`'s own
  `decks` field says "2 decks (104-108)". So the note is narrower than the entry
  it sits in, and the two cannot both be the whole truth. Nothing here read a
  source for what it *says*, so nothing here settles it.
- `sheepshead` `deal[1].note` — "Four to the blind, so the picker buries four."
  against "The picker takes all four cards from the blind, and buries four." The
  overlap is `blind`, `picker`, `buries` and the number, all terms of art, and
  the clause order differs. Judged vocabulary, not structure.

The findings outside the deal notes were the ones 2026-08-15 and 2026-08-16
already read and left; nothing new appeared in them and nothing was churned.

## What this does not establish

The checker cannot certify an entry clean — thorough paraphrase scores like
independent writing — so this says the 30 sentences were read against their
sources and one was rewritten, not that the other 29 are original.

72 entries had no source text on disk and were not checked; this pass never
claimed to cover them.

**14 of the 30 notes are shorter than seven words**, which is the verbatim bar,
so for those the checker had only its order score to work with and a short
sentence scores high against anything. Read them by eye if you are ever near
them; the tool is close to blind there.

**9,303 characters of the corpus are covered by neither fingerprint**, and
`npm run validate` now names them rather than leaving them out of its own total:
`decks` (5,262), diagram row labels (2,055), deck compositions (1,393) and other
equipment (593). The row labels are mostly one or two words and the deck
compositions are enumerations of a pack, which is why they were left rather than
swept. `decks` is none of those — "6 to 8 standard decks shuffled together;
eight is the casino norm and six is usual online" is a sentence with a
prevalence judgement in it — and the first draft of this pass wrongly filed it
as metadata. It is reported now and it is the obvious next sweep, which would
cost every entry's nested stamp rather than eight.

A field the **schema** allows and nobody has classified now fails a test. That
had to be walked from the schema rather than from the data to be true: the first
version of this walked entries, so a field the schema permits and no entry has
filled in was invisible to it — which is how `checked.nested.reworded`, in the
schema and already handled by `checkRecord`, sat in no bucket at all, and would
have turned the gate red the first time anyone recorded a wording-only fix to a
nested passage.
