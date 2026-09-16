# 0029. The nested set is defined by exclusion, not by shape

- **Status:** Accepted
- **Date:** 2026-09-16

## Context

[0026](0026-a-second-fingerprint-for-the-nested-prose.md) added `checked.nested`
to cover the prose outside `PROSE_FIELDS`, and described that prose as what
"hangs off the structured data" — variant descriptions, captions, figure labels,
table notes. Everything in the set was nested inside a list or an object, so the
description and the membership rule looked like the same sentence.

They are not the same sentence, and `decks` is where they came apart. It is a
top-level string: `"6 to 8 standard decks shuffled together; eight is the casino
norm and six is usual online"`. It is prose by every test this project applies —
5,262 characters over 80 entries, 42 of its 44 distinct values seven words or
longer, seven of them carrying a judgement about how people actually play — and
it is published in all three outputs, as `**Deck:**` on every page of the
booklet, in the booklet's index table, on every game page of the site and in
each page's meta description.

It sat outside both fingerprints for the life of the project, so it could be
rewritten with nothing going stale. Nobody decided that. The name of the walk
decided it: `decks` does not hang off anything, so it was never a candidate, and
"it looked like a spec line" finished the job. This is the second field found
that way in two days — `deal[].note` was the first — and both times the
misfiling was a reading of the name rather than a judgement about the text.

## Considered options

- **Put `decks` in `PROSE_FIELDS`** — rejected, and this is the important
  rejection. `PROSE_FIELDS` is covered by `checked.prose`, whose date is the
  entry's **fact** date: the day somebody read the entry against its sources for
  false statements. Widening it would move all 80 of those dates for a pass that
  read one short field for wording, which is a claim nobody made, and it would
  move every entry between dates in the audits ledger. The two halves have
  separate dates precisely because they advance separately. A field's home is
  decided by which claim its stamp makes, not by whether it is top-level.
- **Leave it in neither, and keep reporting it** — rejected. `npm run validate`
  had begun naming it, which is better than silence, but a report that says
  "5,262 characters are compared against nothing" every run and never shrinks is
  a standing invitation to stop reading the line. Reporting a gap is how you
  notice one, not how you close one.
- **Rename `nestedProse` to something accurate** — rejected on cost. The word
  "nested" is in the schema as `checked.nested`, in 80 entries, in the CLI flag
  `--stamp-nested`, and in this project's records. Renaming the concept is a
  major version and a corpus rewrite to buy a better noun.
- **Keep the shape rule and add a second list for top-level prose** — rejected.
  Two lists of which fields count is the exact thing 0026 removed, and the reason
  it removed it is that two copies is two chances to add a field and leave one
  behind.

## Decision

**`nestedProse` is the set of every string the schema allows that is outside
`PROSE_FIELDS` and not in `NOT_PROSE`.** Membership is by exclusion. Being nested
is a fact about most of the members and about where the name came from; it is not
the rule, and the walk's own comment now says so.

`decks` is in the set. The counts a program reads — `equipment.standard_decks`,
`equipment.jokers`, `equipment.decks_by_players` — stay out of both fingerprints,
because they are numbers and an enumeration. The rule cuts between the sentence a
player reads and the fields software filters on, which is the distinction
`CONTRIBUTING.md` already draws between `decks` and `equipment`.

The accounting that enforces this walks the **schema**, not the corpus, and its
fixture is now built from the schema too. The hand-written fixture that stood
there for a day carried no `decks`, so the test that exists to catch an
unclassified field could not have caught this one.

## Consequences

**Every stamp in the corpus was rewritten to add one short field.** All 80
entries' `checked.nested` moved to 2026-09-16 and 160 source files had to be
refetched to stamp them, because the tool refuses to stamp an entry whose
sources are not on disk. That is the price of the rule, and it will be paid again
by the next field that joins.

**The date those 80 stamps now carry is doing two jobs.** For 79 of them the
nested text did not change at all — only the set of fields covered grew — so the
new date means "a pass covered this entry's nested prose today", not "these words
were read today". The fingerprint cannot tell the two apart, and until it can,
the audit record is the only place the difference is written down. Recording the
covered field set alongside the fingerprint would fix it and is not done here.

**Three fields are still outside both fingerprints** — `layout.rows[][].label`
(2,055 characters), `equipment.special_deck` (1,393) and `equipment.other[]`
(593). They are named on every `npm run validate`, and the argument for leaving
them is weaker than it looks: the row labels are mostly one or two words, but
`equipment.special_deck` runs to sentences. This decision does not settle them.

**A string the schema allows and nobody has classified fails `npm test`.** Adding
a field to the schema now means saying, in the commit, which of the three buckets
it is in. That is a small tax on adding fields and the reason it exists is that
the alternative has now cost two passes.
