# 0023. Audit records are a third kind of document, and leave CONTRIBUTING

- **Status:** Accepted
- **Date:** 2026-08-09
- **Supersedes:** [0009](0009-documentation-structure.md) in part — its two-way
  split by how a document ages still holds; this adds the case it did not cover.

## Context

[0009](0009-documentation-structure.md) split the documentation in two by **how
each document ages**: live (`README.md`, `CONTRIBUTING.md`, edited whenever they
stop being true) and historical (`decisions/`, written once and superseded). It
closed by naming the condition that would force a revisit:

> if `CONTRIBUTING.md` grows to where the reference material dominates,
> splitting it out is the first thing to try.

That condition arrived. `CONTRIBUTING.md` reached **1,159 lines, of which the
"What has actually been checked" section was 516 — 45% of the file**, and 509 of
those 516 were chronological pass records. It grew **+270 lines across five
commits in a single day** against 26 lines of deletions, and it only grows: every
audit appends a block and nothing is ever removed.

The size is the symptom. The cause is that the section was never live material.
A pass record says what was read on a given date and what was wrong with it. It
is not revised afterwards — the only edit an old block ever takes is a
correction to its entry count when an entry it covered moves to a later pass.
That is `decisions/` behaviour, sitting inside the document whose defining
property is that it gets edited when it stops being true.

Three separable things were tangled in those 516 lines:

- **the pass records** — historical, append-only, ~460 lines;
- **the lessons** they taught — live guidance, ~50 lines, and *already* restated
  in [the adding-games handoff](../specs/2026-08-06-adding-games-handoff.md);
- **the standing state of the corpus** — how many entries are stamped, which
  should be assumed unverified — live, tested, and the part a contributor
  actually needs, ~20 lines.

The duplication was measured rather than assumed. Literal overlap between the
ledger and the handoff was small: 65 shared eight-word shingles out of 5,632 and
2,510. Conceptual overlap was not — prevalence markers, the second read,
`scoring_table` drift and "assume unverified" all appeared in both documents in
different words, with nothing checking that they agreed.

## Considered options

- **Leave it.** Rejected on the growth curve rather than on taste: twelve
  entries remain unaudited at four to six a sitting, then re-audits begin. The
  section would pass 600 lines before the current backlog closed.
- **Trim the pass records in place** — summarise old passes to a line each.
  Rejected: it destroys the evidence. The value of a record like "fifteen
  audited, nine faulty, twenty-four errors, and here is each one" is the detail;
  compressed to a sentence it becomes a claim nobody can check.
- **Move them into `decisions/`.** Rejected. A decision record answers "why is
  the project like this"; a pass record answers "what has been verified about the
  data". Mixing them makes the decisions index unreadable and buries eighteen
  design records under a growing pile of audit logs.
- **Move them into `specs/`.** Rejected. `specs/` holds dated working documents —
  plans, designs, handoffs — that are written to be acted on and then finished.
  An audit ledger is never finished.
- **A new `audits/` directory, indexed like `decisions/`** — chosen.

## Decision

A third kind of document, on the same ageing principle 0009 established:

- **Live** — `README.md`, `CONTRIBUTING.md`.
- **Historical, about the code** — `decisions/`. Why the project is shaped this
  way.
- **Historical, about the data** — `audits/`. What has been read against a
  source, when, and what was wrong with it.

One file per pass, so the append-only property is physical: a new pass is a new
file, and old files are not opened. `audits/README.md` indexes them and carries
the cumulative tally.

`CONTRIBUTING.md` keeps only the standing state — the counts, the provenance of
the source records, and which entries should be assumed unverified — and links
to `audits/` for the record and to the handoff for the lessons.

**The lessons are consolidated by reclassification rather than by deletion.**
Nothing was cut from the pass records to remove the overlap. Once a document is
marked historical, a sentence in it saying "this is what we concluded that day"
stops competing with the live guidance, because it is no longer a statement about
now. That is the whole of 0009's insight applied to the case it did not foresee.

## Consequences

`CONTRIBUTING.md` drops from 1,159 lines to 739, and the section that dominated
it stops growing there.

Two tests move with the content — the ledger-matches-the-corpus check and the
tally check now read `audits/` — and one is added, because a directory reached
only through an index has a new way to rot: a pass file missing from the index
is a pass file nobody reads. `npm test` now asserts the index and the directory
list the same files, and that each file records the date its name claims.

The counts that must agree across files go from five places to six. That is the
real cost of this record, and it is paid the same way the other five are: by a
test that fails rather than by remembering.

Anyone adding a pass now writes a file instead of appending to a section, which
is a small extra step and the point — appending to a live document is what let
469 lines of history accumulate somewhere they were never meant to be.
