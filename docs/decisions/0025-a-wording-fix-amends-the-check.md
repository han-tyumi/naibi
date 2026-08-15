# 0025. A wording-only rewrite amends the check rather than restamping it

- **Status:** Accepted
- **Date:** 2026-08-15

## Context

`checked` pairs a date with a fingerprint of the entry's prose, so that a date
cannot go on claiming a check that stopped covering the text — edit a prose field
and `npm run validate` says the entry has moved on. That rule is the reason the
record means anything, and it is unconditional: it does not ask *why* the prose
moved.

Removing verbatim reuse moves the prose. It is the one edit that has to: the
whole point of finding a run of identical words is to write the sentence
differently. And it is the one edit that changes no fact — the discipline for it
is to invert a clause order, never to state something new. So a re-sweep for
reuse over entries that have already been fact-checked breaks a fingerprint on
every entry it fixes, and the two things the tooling offered were both wrong:

- **Re-stamp with today's date.** The stamp says an entry was read against its
  sources on that date. On a wording sweep nobody re-read the sources for facts,
  so the new date claims a fact-check that did not happen — the exact "date
  claiming cover it has lost" the fingerprint exists to prevent, written the
  other way round. It also moves the entry between dates in the audits ledger,
  so a wording fix silently rewrites the history of which pass read what.
- **Drop the record.** The entry then reports as never checked, which is false
  and strictly worse than the problem: a fact-check that really happened is
  thrown away to make room for a wording fix.

The sweep this arrived on is the re-run of every entry stamped before
2026-08-14, the day `npm run originality` stopped ranking a reading-list match
above a longer verbatim run. Every one of those stamps was made under the old
ranking, so the "no REUSE" behind it is weaker than it reads, and the fix is
expected to move prose in entries whose facts were read days ago.

## Considered options

- **Restamp with the sweep's date.** Rejected above. It is the option the tooling
  makes easiest, which is why this record exists.
- **Restamp with the original date and a new fingerprint.** Rejected, and it is
  the worst of the three: it backdates. The prose as it now stands would claim to
  be the prose somebody read on a day it did not exist, with nothing anywhere
  saying otherwise.
- **Leave the reuse in place**, on the grounds that fixing it costs more than it
  buys. Rejected: a verbatim run is the one finding this project acts on without
  judgement.
- **Widen `checked` with a dated wording amendment** — chosen.

## Decision

`checked` gains an optional `reworded` envelope:

```json
"checked": {
  "date": "2026-08-12",
  "prose": "5eb1a2…",
  "sources": ["Pagat", "Wikipedia"],
  "reworded": { "date": "2026-08-15", "prose": "9c4f70…" }
}
```

`checked.prose` keeps its meaning exactly: the prose that was read against the
sources on `checked.date`. `reworded.prose` is the prose as it now stands, and
`reworded.date` is when it was changed. The validator compares the entry against
`reworded.prose` when one is present and against `checked.prose` when it is not,
so the fingerprint rule stays unconditional — an entry edited after the wording
fix reports as changed exactly as before.

What the envelope claims, and it is a claim a tool cannot check: **the prose was
changed for wording only, and no fact was added, removed or altered.** That is
why it is dated and why it is separate from the check rather than folded into it.
The reader can see that the text has moved since the facts were read, when, and —
through the audit record of that date — why.

Three rules make it harder to use for anything else, all in `checkChecked`:

- a `reworded` fingerprint equal to `checked.prose` is refused, because it
  records a rewrite that did not happen;
- a `reworded` date earlier than `checked.date` is refused, because the
  amendment has to come after the thing it amends;
- `npm run validate` counts the entries carrying one and says so on every run,
  which is this project's standing rule that a report which can come back empty
  must say what it did not look at.

## Consequences

The audits ledger stops moving under a wording sweep. `checked.date` is what the
ledger counts, and it is now the one field a rewrite does not touch, so a sweep
that fixes reuse in thirty entries shifts no counts between dates and corrects no
older record's heading. That was not a design goal; it fell out of separating the
two questions, and it is the clearest sign they were tangled.

A reader of one entry can now tell three states apart where there were two:
never checked, checked and unchanged, and checked with the wording since amended.
The third used to be indistinguishable from an entry somebody had quietly edited
after its check.

The cost is a claim resting on discipline rather than on a test. `reworded` says
the facts did not change and nothing verifies that; a contributor could reword a
rule into a different rule and record it here. The mitigations are that the
count is reported on every validate run, that the amendment is dated so it sits
against a specific audit record, and that the rule for rewriting away from a
source — invert the clause order, never swap the claim — is already written down.
It is the same kind of claim `sources_consulted` makes, and it is kept honest the
same way.
