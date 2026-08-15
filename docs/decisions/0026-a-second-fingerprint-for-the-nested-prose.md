# 0026. A second fingerprint, over the prose that hangs off the structured data

- **Status:** Accepted
- **Date:** 2026-08-15

## Context

`PROSE_FIELDS` — `setup`, `play`, `goal_and_scoring`, `background` — is read by
exactly two things, and deliberately the same list: the originality checker, and
`checked.prose`, the fingerprint that makes a stamp go stale when the prose it
covered moves. Coupling them is what stops a stamp certifying wording nobody
compared.

The cost is everything outside that list: every `variants[].name` and
`.description`, `layout.caption`, every `figures[].caption`, row label and card
note, and every `scoring_table` item and note. **231,000 characters, 31% of the
corpus's prose, read by neither.**
[The spec](../specs/2026-08-12-the-thirty-percent-outside-the-check.md)
demonstrated both halves rather than inferring them: source sentences planted in
a variant description came back clean from a run that had caught the same
sentences in `play` minutes earlier, and captions rewritten after a stamp left
`npm run validate` reporting 80/80 valid.

What that spec could not say was how much reuse was actually there. Its closing
section is explicit: *"Nobody has read the 223,551 characters looking for copied
wording, and this says nothing about how much is there. The plant proves the
checker would not report it, not that any exists."*

**That is now answered.** The 2026-08-15 re-sweep ran the comparison over all of
it by hand: **60 verbatim runs across 49 passages in 28 entries**, against 14 in
the four fields the checker does read. Fourteen were nine words or longer and one
was thirteen. See [the record](../audits/2026-08-15-verbatim-resweep.md). The
unread 31% was not a theoretical gap; it was where nearly all of the reuse was.

The same sweep sharpened the second half too. It rewrote 26 entries; **four moved
a fingerprint and twenty-two moved nothing**, because their changes were all in
these fields. Nothing in the data distinguishes an entry whose variants were
compared against sources yesterday from one whose variants nobody has ever read.

## Considered options

The spec's three, restated with what the sweep now adds:

- **Widen `PROSE_FIELDS`.** One line, closes both halves, and changes the
  fingerprint of all 80 entries — every one has variants. `npm run check` goes
  red until the whole corpus is re-read and re-stamped, which at the observed
  rate of two entries a sitting is about forty sittings with nothing else moving.
  Rejected on scheduling, not on honesty: the red would be telling the truth.
- **Widen it and re-stamp without re-reading.** Rejected. It would certify
  231,000 characters nobody had compared against anything, which is the one thing
  the originality skill forbids outright.
- **Widen only the checker**, leaving the fingerprint where it is. Rejected, and
  the spec is right that this tempting middle path is worse than either end: the
  checker would then read more than any stamp covers, which is precisely the
  invariant the coupling exists to protect.
- **A second fingerprint over those fields, advancing separately** — chosen, and
  the spec's own preference. It keeps the invariant by adding a second instance
  of it rather than by breaking the first.

## Decision

`nestedProse()` walks the prose that hangs off an entry's structured data —
inside `variants`, `layout`, `figures` and `scoring_table` — and
`nestedProseFingerprint()` fingerprints it. **One definition, in `naibi`**, because
this list was already written out twice: once in `checks.ts` to count characters
for the reporting line, and once by hand in every sitting that swept those fields.
`unreadProse` now calls it.

`checked` gains a `nested` envelope with the same shape as the record it sits in:

```json
"checked": {
  "date": "2026-08-12",
  "prose": "5eb1a2…",
  "sources": ["Pagat", "Wikipedia"],
  "nested": { "date": "2026-08-15", "prose": "9c4f70…", "sources": ["Pagat", "Wikipedia"] }
}
```

Same shape on purpose, including its own `reworded` — a verbatim run removed from
a variant description raises exactly the question
[0025](0025-a-wording-fix-amends-the-check.md) answered for a run removed from
`play`, and one answer for both is better than two.

**It means what `checked` means, and no more**: on this date, these fields were
read against these sources. Whether a given pass read them for wording or for
facts is recorded where it always has been — in the audit record for that date.
`checked.date` has never distinguished the two either; 2026-08-03 was a wording
pass and 2026-08-12 was a fact audit, and only `docs/audits/` says so. The new
envelope inherits that convention rather than inventing a second one.

Now that a stamp can cover those fields, **the checker reads them**: they are
compared against every source on disk and reported like any other passage, and
`--stamp` writes both fingerprints. The invariant holds in both directions — each
fingerprint covers exactly what one check reads.

The **bar does not widen with it**. It is measured over `PROSE_FIELDS` passages
of our own, and stays there: it is an estimate of how alike two pieces of
independent writing are, and nested passages are the same writing by the same
hands. Reusing it is what makes a finding in a variant description mean what a
finding in `play` means, which is the property the hand-runs relied on.

## Consequences

The reporting line changes from a number nobody can act on to a coverage count.
`npm run validate` has said "31% of the corpus's prose, neither compared against
sources nor covered by a checked stamp" on every run since 2026-08-12; it can now
say how many entries have had that prose compared, and the 31% becomes the part
still outstanding rather than the whole.

**Nothing is stamped by this record.** Adding the field does not claim coverage
for a single entry, and until a pass runs the comparison with sources on disk the
count is zero and says so. That is the deliberate difference between this and the
rejected option 2, and it is worth stating plainly, because the tempting next
step — stamping 80 entries from an audit record rather than from files that were
actually read — is the same dishonesty wearing a different coat. The 2026-08-15
sweep really did compare all of it, but `.sources/` is deleted after every
sitting, so recording that now would be reconstruction after the fact, and
`CONTRIBUTING.md` says none of the current records are that.

The cost is a deeper `checked` object and a second staleness rule to keep working.
Both are tested. And a real cost worth naming: an entry can now be half-covered —
sections read on one date, nested prose on another, or not at all — which is more
states than a reader had to hold before. That is the true state of the corpus
rather than a new complication; it was simply invisible.
