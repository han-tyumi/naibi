# 0030. A stamp records which fields it covered

- **Status:** Accepted
- **Date:** 2026-09-16

## Context

A check record is a date and a fingerprint. The fingerprint is what stops the
date rotting: edit the prose afterwards and it no longer matches, so the
validator says the entry has changed since it was checked rather than letting a
date sit there implying cover it has lost. That is [0025](0025-a-wording-fix-amends-the-check.md)
and [0026](0026-a-second-fingerprint-for-the-nested-prose.md), and it works.

It records the text. It does not record the walk.

So when a field *joins* the check, every fingerprint over an entry carrying that
field moves, and the validator reports the only thing it can: edited since it was
checked, re-read it and re-stamp. Nothing was edited. The walk grew.

This happened twice in two days. `deal[].note` joined on 2026-09-16 and moved the
8 entries that carry deal notes — an absent optional field contributes nothing,
so the scoping *between* entries already works. `decks` joined the same day and
moved the other 72, because every entry has a deck line.

Be exact about what was wrong with that, because it is easy to overstate. The
re-reading was real: no entry's deck line had ever been compared against a
source, 169 source pairs were fetched and read, and the stamps recorded a first
reading that genuinely happened. Not one entry's `decks` text changed in
`b2355f9`. What was false was the **diagnosis**. The validator said "nested prose
has been edited since it was checked" of all 80, and nothing had been edited.

That is now verified rather than asserted. [0029](0029-the-nested-set-is-defined-by-exclusion.md)
already recorded that "for 79 of them the nested text did not change at all";
restricting today's walk to the field set as it stood at `b2355f9^` reproduces
the stored pre-`decks` fingerprint for exactly those **79 of 80**, the sole
exception being `rummy-500`, whose seven deal notes really had been corrected in
that commit. The claim can now be checked by recomputation instead of believed.

So the defect is not wasted work. It is that a check cannot say what it covered,
which costs three things: the validator reports an edit that did not happen; a
widening turns the build red until the whole corpus has been re-read, so it is
all-or-nothing on one day; and the resulting date covers prose nobody looked at.
Three fields are still outside the check, and the reason is that cost.

## Considered options

- **Record the field set beside the fingerprint, as a list of index-free field
  paths.** `checked.fields` and `checked.nested.fields`, written by the stamper,
  never by hand. The fingerprint can then be recomputed over exactly the fields
  the record names: equal means the prose it covered has not moved, whatever the
  walk has gained since. Costs 1,440 lines across the 80 entries, all of it
  bookkeeping, and every record repeats a list that is identical corpus-wide on
  any given day. **Chosen.**
- **Record a 16-hex fingerprint of the field set, with an append-only table of
  past walks in `packages/data`.** 160 lines instead of 1,440, and the table lets
  the checker recover which fields a token stood for. Rejected: it moves part of
  a record's meaning out of the data and into a file that has to be appended to
  at the right moment, which is the kind of second list this project has left
  behind at a widening twice in two days. [0002](0002-data-is-the-source-everything-generates.md)
  makes `packages/data` the source of truth, and an entry whose stamp cannot be
  read without consulting the build is not that. The line count is the strongest
  argument against the choice made here and it is a real one; at eighty entries
  it is not decisive, and `checked.sources` already repeats names that
  `sources_consulted` carries, for the same reason.
- **Record a walk-version integer.** Same size as the hash and more legible in a
  diff. Rejected for the same reason plus one: the integer is asserted beside the
  walk and a forgotten bump silently blesses every record, where a list is
  derived from the walk and cannot drift from it.
- **Record the field paths the entry actually carries, rather than the walk's
  whole list.** 1,097 lines instead of 1,440 and it reads more naturally.
  Rejected on correctness, not cost: an entry gaining its *first* figure caption
  would then show that path outside its recorded set and read as a benign
  widening, when it is new prose nobody has read. 30 of 80 entries carry no
  figure caption, 35 no layout caption and 72 no deal note, so that is most of
  the corpus. The walk's list keeps the gate exactly as red as it is today for
  every real edit, and changes behaviour only when the walk itself grows.
- **Give `reworded` its own field list.** Rejected: there is one list per record,
  covering whichever fingerprint is live. A wording amendment restates the same
  fields at a later date; two lists would be two things to keep in step, and
  `additionalProperties: false` already refuses the key.
- **Infer the field set from the stamp's date.** The only option costing no
  lines at all. Rejected by measurement: `a3a715e` and `b2355f9` are two
  different walks on the same calendar date, so the date cannot answer the
  question even in this corpus's own history.
- **Make a widening an error, as it is today.** Rejected, and this is the trade
  the decision turns on — see Consequences.

## Decision

`checked.fields` and `checked.nested.fields` record the walk's own field list, as
it stood when the stamp was made, index-free and in walk order. `NESTED_FIELDS`
is derived by running `nestedProse` over an entry built from the schema, so there
is no second list to forget; `PROSE_FIELDS` was already a constant. Only
`npm run originality -- --stamp` writes them.

`checkRecord` then decides in this order, and the order matters:

1. **The record covers a field the walk no longer reads** — compared as lists,
   before any fingerprint, because restricting a walk to a field it can no longer
   emit just drops those passages and would report an edit nobody made. Fails.
2. **The restricted fingerprint does not match** — the prose the record covered
   has moved. Fails, with the message it has always had. A widening *and* an edit
   together land here, which is the safe direction: a check that guesses
   "widened" when it might be "edited" is worse than one that guesses "edited".
3. **The walk has fields the record does not cover** — a gap in cover, not a
   stale record. Reported by `uncoveredByStamp`, per entry, naming the fields and
   their characters, and scoped to fields the entry actually carries.

A record with no `fields` behaves exactly as it did: the whole walk, every field.
`npm run validate` counts those separately, so "never said" cannot read as
"covers everything".

All 160 existing records were given their list in the same commit, without moving
a date or a fingerprint — a pure-insertion diff. That is honest only because the
walk that made the 2026-09-16 stamps is still the walk today: every stored
`checked.nested.prose` verifies against the full current walk, and all 13 entries
carrying `background` verify against the four-field `PROSE_FIELDS`. For the 67
entries with no `background`, the claim is safe rather than verified — the field
is absent, so the fingerprint is identical under the three- and four-field walks,
and recording the wider list asserts nothing the hash can contradict.

## Consequences

**Widening the check stops being all-or-nothing, and stops lying about why.**
Admitting `equipment.special_deck` to the walk, run as a control, leaves
`npm run validate` green at 80/80, names the 21 entries that carry the field, and
counts the 1,393 characters now covered by no stamp. Before this it turned those
21 entries red with a claim that their prose had been edited.

**It saves no reading whatsoever, and must not be described as though it does.**
When `layout.rows[][].label` joins the walk, the 45 entries carrying it still
need two sources on disk, a reading, and a new date — and that date will still
cover the whole of each record, not the field that gained cover. What moves is
*when*: the corpus may sit in a stated, reported, partial state until somebody
does the reading, instead of the build being red from the moment the field is
admitted. The work is deferred and made visible. It is not avoided.

**A widening is now a report, and reports rot.** This is the real cost. Until
today a field joining the walk stopped the build until somebody re-read the
corpus — crude, but a ratchet. It is now a line that has to be read, and the
three fields still outside the check are 4,041 characters that could sit there
indefinitely. The line is per entry and names the fields and their characters
precisely so it cannot shrink into a number nobody looks at, but nothing forces
it to zero. If it stops going down, that is the failure mode to look for.

**It does not fix the dates it explains.** All 80 nested stamps still read
2026-09-16 and still cover two different readings — a deck line read that day,
and prose last read on 2026-08-15 or 2026-08-16. This stops it recurring; it does
not undo it. Nor does it make a date mean "a person read these words": the
comparison tool walks every covered passage on every run, and the record says
nothing about which of them a human also read. `npm run originality` cannot
certify an entry clean in any case — thorough paraphrase scores like independent
writing.

**Reordering the walk is still undetectable from the record.** Moving one `add`
call above another in `nestedProse` changes every fingerprint in the corpus while
the field set stays identical, and the restricted recompute cannot tell that from
a real edit. There is no clever check for it; there is a frozen fingerprint over
a fixture in `corpus.test.ts`, and changing it means re-stamping the corpus.

**A hand-trimmed list is the one way to make an edit pass.** Drop the edited
field from `fields` and the restricted comparison matches. Nothing in
`checkRecord` can see it. The schema refuses an empty list and `checkRecord`
refuses one too, but a plausible-looking short list is only caught by reading the
diff — which is the same protection every other hand-editable record here has.

**Every entry file grew by eighteen lines that say nothing about a card game.**
`checked` is bookkeeping and now looks it. That is the price of a record that can
be read without the code that wrote it.
