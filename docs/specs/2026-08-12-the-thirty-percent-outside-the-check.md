# 2026-08-12 — The 30% of the corpus no tool reads

**Kind:** Design spec, for a session that will decide this. Not a record of a
pass; the day's pass records are in [`docs/audits/`](../audits/README.md). The
measurement below has been taken and the reporting line has been built; the fix
itself has not, because it is not mine to choose.

> **Decided on 2026-08-15.** Option 3, in
> [decision 0026](../decisions/0026-a-second-fingerprint-for-the-nested-prose.md).
> Two things this document could not know settled it. The question it closes on —
> how much copied wording is actually out there — was answered by the
> [2026-08-15 re-sweep](../audits/2026-08-15-verbatim-resweep.md): **60 verbatim
> runs across 49 passages in 28 entries**, against 14 in the four fields the
> checker does read. And that sweep rewrote 26 entries of which **22 moved no
> fingerprint at all**, which is the second half of the gap demonstrated at scale
> rather than twice. The rest of this document stands as written.

## The gap

`PROSE_FIELDS` is `setup`, `play`, `goal_and_scoring` and `background`. Two
things read it, deliberately the same list:

- **the originality checker**, which compares an entry's prose against source
  text; and
- **`checked.prose`**, the fingerprint that makes a stamp go stale when the prose
  it covered has moved.

Coupling them is right and the code says why: it stops the fingerprint covering
less than the check reads, which would let a stamp certify wording nobody
compared. The cost is the other side of the same coin. **Everything outside that
list is covered by neither.**

Outside it: every `variants[].description`, `layout.caption`, every
`figures[].caption`, every figure row label and card note, and every
`scoring_table` item and note.

## What that is worth, measured

**223,551 characters — 30% of the corpus's prose.** All 80 entries carry
variants; 63 carry captions.

`npm run validate` now prints this on every run, which is the same rule as the
two lines above it: silence is not coverage. It is reported and never failed,
because failing it is the decision this spec is asking for.

## Both halves of the gap were demonstrated, not inferred

On 2026-08-12, during
[the Hand and Foot sitting](../audits/2026-08-12-rummy-pair.md):

- **Copied wording passes.** Two sentences taken verbatim from two different
  source files were planted in a `variants` description. The run came back
  **clean**. The same two sentences in `play` had been caught minutes earlier at
  27 and 15 words.
- **A stamp does not notice.** Two captions were rewritten *after* the entry was
  stamped, and `npm run validate` reported 80/80 valid with the stamp intact. It
  happened twice more the same day, in
  [Yukon and Forty Thieves](../audits/2026-08-12-yukon-and-forty-thieves.md) and
  [Baccarat and Red Dog](../audits/2026-08-12-banking-pair.md).

Neither is hypothetical and neither needs arguing about.

## Why it has not simply been fixed

Adding the fields to `PROSE_FIELDS` closes both halves in one line. It also
changes the fingerprint of **every entry that has variants, which is all 80**, so
`npm run validate` would report all 80 as edited since they were checked and
`npm run check` would go red until every entry had been re-read and re-stamped.

That is not a bug in the change; it is the truth becoming visible. Those fields
really never were checked. But it converts a reporting line into a corpus-wide
re-read mandate, and that is a scheduling decision rather than a technical one —
which is why the line was built and the change was not.

The tempting middle path is worse than either end: **widening only the
checker**, so it reads variants while the fingerprint still does not. That buys
the copied-wording half and silently breaks the invariant the coupling exists to
protect — a stamp would then cover less than the check had read, which is the
exact failure the comment in `naibi/index.ts` was written to prevent. If the two
lists are ever separated, that has to be argued for on its own and tested, not
arrived at by widening one of them.

## Three options, with what each costs

1. **Widen `PROSE_FIELDS` and re-read the corpus.** Honest and complete. Costs 80
   entries of re-reading, which at the rate the audit has actually run — two
   entries a sitting — is forty sittings. Nothing else on the backlog would move
   meanwhile.
2. **Widen it and re-stamp without re-reading.** Cheap and dishonest. It would
   certify 223,551 characters nobody has compared against anything, which is
   precisely what the originality skill forbids: "stamp what you read, never what
   the tool failed to flag."
3. **Leave the coupling, keep the reporting line, and close the gap
   entry-by-entry as the audit reaches each one.** Every sitting already reads the
   variants against the sources by hand — all six sittings on 2026-08-12 found
   variant-level errors, and one found a whole missing meld type. What is missing
   is a way to record that the reading happened.

Option 3 is the one this spec favours, and it needs one thing built that does not
exist: **a second fingerprint**, over the fields outside `PROSE_FIELDS`, stamped
separately when an audit has actually read them. `checked.prose` keeps its
meaning exactly; a sibling covers the rest; and the validator can then say how
many entries have had their variants read rather than guessing. That keeps the
invariant — each fingerprint covers what some check read — while letting the two
advance at different rates, which is the real situation.

## What this spec does not establish

Nobody has read the 223,551 characters looking for copied wording, and this says
nothing about how much is there. The plant proves the checker *would not report*
it, not that any exists. The audit sittings that have read variants by hand found
factual errors in them at about the rate they found errors anywhere else, which
is suggestive about facts and says nothing about wording.

It also says nothing about the other end of the same problem — a figure's
`kind`, its card faces and its `valid` flags are data rather than prose, and no
check compares those against a source either. A caption can be wrong; so can the
cards under it, and 2026-08-12 found one of those too.
