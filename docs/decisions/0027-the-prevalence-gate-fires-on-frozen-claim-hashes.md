# 0027. The prevalence gate fires on frozen claim hashes

- **Status:** Accepted
- **Date:** 2026-08-18

## Context

[The 2026-08-11 spec](../specs/2026-08-11-prevalence-markers-and-the-write-time-gate.md)
designed a write-time gate for sentences that claim how commonly something is
done — "most tables", "usually", "the common form" — and named the reason: it is
"the single largest error category in the audit, named as such in every batch
record. Of the day's 48 findings across six entries, roughly a quarter were a
marker attached to something no source ranks."

It then refused to build it, listing three questions "the build should settle,
not assume". All three are now settled, and none of them by assumption.

**Is the vocabulary right?** Fifty sentences were read by hand on
[2026-08-13](../specs/2026-08-13-prevalence-vocabulary-precision.md), which
produced a second vocabulary, and all seventy-five were read again by a
different reader on
[2026-08-17](../specs/2026-08-17-a-second-reader-on-the-prevalence-sample.md).
v2's held-out precision is 64% and 68% strict across the two readers, 80% and
84% loose.

**Does it belong in `validate` or in `originality`?** The spec argued this
itself: "It is a claim about facts, not wording, which argues for `validate`."

**Per-entry counts, or frozen sentence hashes?** This is the one the spec
answered with an assumption — hashes are "a much larger file that churns on
every prose edit" — and it was
[measured on 2026-08-18](../specs/2026-08-18-counts-or-hashes.md) by replaying
all 88 commits that have ever touched game data. Of 5,978 entry-transitions, 14
kept an entry's flagged-sentence count identical while the flagged sentences
themselves changed. **All fourteen were read: nine were real claim changes.** A
counts file is blind to precisely those nine. The churn a hash file costs is 35
of 87 commit boundaries against a counts file's 30 — five commits across the
corpus's whole life, not every prose edit.

## Considered options

- **Per-entry counts, as the spec first sketched — rejected.** Cheapest and
  smallest, and blind to the nine claim changes above, which include `war`
  going from "the version most people know" to "many players do it": the exact
  correction this gate exists to prompt, with the count unmoved. It also cannot
  produce the failure text the spec asked for — "names the offending sentence" —
  because which sentence is *new* is the thing a count throws away.
- **Frozen claim hashes — chosen.** Notices a swapped claim, names it, and
  ratchets the same way a number does.
- **Hashing the sentence together with the field it sits in — rejected.** A
  claim moved from `play` into a variant description is the same claim, and a
  gate that fires when somebody restructures an entry teaches people to switch
  it off.
- **Building nothing and leaving the tool reporting-only — rejected**, but it
  was the right answer until today: the spec said sampling fifty by hand "might
  change the vocabulary or kill the idea", and it did change the vocabulary.
- **Gating the captions, labels and table notes too — rejected for now.** The
  precision figures were measured over `PROSE_FIELDS` plus variant descriptions
  and say nothing about the other fields, and a gate is not the place to find
  out.

## Decision

`packages/build/prevalence-baseline.json` records, per entry, a 16-hex hash of
every sentence in it that already carries a v2 marker — 330 sentences across 80
entries, 9.6 KB. `npm run validate` recomputes them and fails three ways:

- a flagged sentence whose hash is not in the baseline, reported against the
  entry and quoted in full, with the one question the audit records show nobody
  asked: *which sentence in a source ranks this?*
- a baselined hash that is no longer in the corpus, which is what makes this a
  ratchet rather than a freeze — the spec's second constraint, "the second half
  is what makes the backlog shrink instead of ossifying";
- an entry with no baseline record at all, and a baseline record naming no
  entry, because a gate that quietly covers 79 of 80 entries reads exactly like
  one that covers all of them.

Whitespace is collapsed before hashing, so re-flowing a paragraph is not a new
claim. `npm run prevalence -- --baseline` regenerates the file, always over the
whole corpus and always in v2.

It lives in `packages/build/` rather than the `packages/data/` the spec
sketched: it is written and read only by the build package, and `packages/data`
publishes a `files` whitelist that would either exclude it — making its location
a lie — or ship a build artifact to consumers of the rules.

## Consequences

**Nothing fails on the day it lands.** The baseline is the corpus as it stands,
so the gate is silent until somebody writes a *new* claim. That is the spec's
first constraint — "it must not flood. 471 existing hits means a bare word list
fails 80 of 80 entries on the first run and gets switched off" — and it is why
this is a baseline rather than a threshold.

**Roughly one fire in five will not be worth acting on**, and under the stricter
reading closer to one in three: v2's measured precision is 80–84% loose, 64–68%
strict. That is the price of catching the category at all, and the failure text
asks a question rather than asserting an error for that reason.

**Every audit that touches a marker sentence now has a second step** —
regenerate the baseline — and so does any wording pass that reflows one. The
measurement says how often: 35 of 87 commit boundaries in the corpus's history,
against 30 for the cheaper design that catches less.

**It certifies nothing.** A marker is not a finding; a claim written without any
marker word passes untouched, and so does one in a caption, a figure label, a
card note or a scoring-table note. The four most damaging findings of
2026-08-11 — `klondike`'s inverted bound, `canfield`'s solver average, its
elimination claim, `mau-mau` following the minority of three sources — needed
reading, and still do. This is one cheap category, gated. It is not the pass.
