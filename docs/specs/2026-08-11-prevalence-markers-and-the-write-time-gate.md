# 2026-08-11 — Prevalence markers, and moving the check to write time

**Kind:** Design spec, for a session that will build this. Not a record of a
pass; the day's pass records are in [`docs/audits/`](../audits/README.md). The gate
here has not been built.

**The first step this spec asks for has been taken.** The open question below —
"Is the vocabulary right?… Nobody has read them" — was answered on 2026-08-13 by
reading fifty of the flagged sentences and then twenty-five more out of sample:
[the measurement](2026-08-13-prevalence-vocabulary-precision.md), instrument at
`npm run prevalence`. Short version: **the vocabulary as designed below is 52%
precise at best and 30% on a strict reading**, because `most`, `often` and
`standard` carry two thirds of the volume and are its three worst words. A revised
list scores 80% on held-out text. **The design on this page survives; the word
list did not.** Re-measured count is 455 rather than the 471 below. Read the
measurement before building from the sketch here.

## The question this answers

"Why do we keep auditing these? Why can't we get them right when we create them?"

Half the answer is comfortable: the 24 entries still on 2026-08-03 were never
fact-checked at all, because the check did not exist when they were written.
That is not rework, it is the first pass.

The other half is not. **Entries written deliberately for this collection carry
prevalence markers at a higher rate than the inherited ones** — measured below.
CONTRIBUTING already carries the rule that would prevent them, and it was
written *because* three freshly-written entries shipped two unsupported claims.
The rule exists and does not hold. That is the case for a gate rather than more
guidance.

## What was measured, and the instrument control

Every sentence of `setup`, `play`, `goal_and_scoring`, `background` and every
`variants` description in all 80 entries, matched against a marker vocabulary
and filtered for collocations where the word is not a claim about prevalence.

Vocabulary: `most`, `usually`, `commonly`, `common`, `generally`, `widespread`,
`typically`, `popular`, `often`, `universal`, `majority of`, `standard`,
`the norm`, `prevalent`.

Not-a-claim filter: `standard deck|pack|52|32|40|24|playing|international`,
`the most cards`, `most of the pack|deck`, `standard scoring`, `non-standard`,
`standardis…`.

**The first run of this returned zero across all 80 entries**, which reads
exactly like a clean corpus and was a broken regex — a word boundary escaped one
level too many by the shell. It was caught by not believing it. The measurement
script therefore carries its own control: it asserts that it flags a planted
claim ("This is the version most tables play.") and ignores a clean procedural
sentence ("Deal seven cards to each player, one at a time.") before it reports
anything. **Any tool built from this spec must do the same** — a marker check
that silently matches nothing is indistinguishable from a corpus with no claims
in it, which is the failure this project has already had twice.

## What it found

**471 flagged sentences. All 80 entries carry at least one. Median 6, max 14.**

Per entry, grouped by the pass each entry currently rests on:

| Pass the entry rests on | Entries | Flagged | Per entry |
| --- | --- | --- | --- |
| 2026-08-03 — wording only, never fact-checked | 24 | 148 | 6.2 |
| 2026-08-06 — `omaha`, written for this collection | 1 | 11 | 11.0 |
| 2026-08-07 — three trick-taking, written and checked in one sitting | 5 | 37 | 7.4 |
| 2026-08-08 | 15 | 102 | 6.8 |
| 2026-08-09 | 11 | 72 | 6.5 |
| 2026-08-10 | 16 | 63 | 3.9 |
| 2026-08-11 | 8 | 38 | 4.8 |

Two things to take from that table, and one not to.

**Fact-auditing reduces the density but does not clear it.** The two most
recently audited groups sit at 3.9 and 4.8 against 6.2 for the group nobody has
ever fact-checked. So the audit catches some and leaves roughly four or five per
entry standing. Some of those are legitimate — a source does sometimes rank a
thing — but "a stamped entry still carries four" means **the audit is not a
reliable filter for this category**, which is the argument for a mechanical one.

**The entries written for this collection are the worst, not the best.** 11.0
and 7.4 against an inherited 6.2. That is the direct answer to "why can't we get
it right the first time": on this evidence, writing fresh is where the markers
come from, not where they are avoided.

**What not to take from it:** those two rows are 1 entry and 5 entries. They are
suggestive and they are not a result. Anyone building this should re-measure
rather than quote them.

Samples, to show the signal is real rather than vocabulary noise:

- `baccarat` — "eight on a casino floor, six in **most** online rooms". The same
  shape as `dou-dizhu`'s "standard in most online rooms", deleted on 2026-08-11
  as supported by nothing.
- `accordion` — "Nothing is compulsory in the form **most** people play."
- `rummy-500` — "**Most** card game books in fact apply the melding obligation to
  the top card too." An audited, stamped entry.

## What a gate here can and cannot buy

It is worth being exact, because the temptation is to expect too much.

**Catches:** the single largest error category in the audit, named as such in
every batch record. Of the day's 48 findings across six entries, roughly a
quarter were a marker attached to something no source ranks.

**Does not catch, and nothing mechanical will:**

- `klondike`'s Thoughtful Klondike argument, whose implication ran in the
  direction that would make the figure a lower bound rather than the upper bound
  the entry then claimed.
- `canfield` attributing a solver's 39.9-card average to good human play.
- `canfield` telling a reader they can deduce how far down the reserve each card
  sits, which elimination cannot do.
- `mau-mau` following the minority of three sources on the rule the game is
  named after.

Those four are the most damaging findings of the day and all four need reading.
**A marker gate is one category, cheaply. It is not a substitute for the pass.**

## Design

Three constraints, in order of importance.

**1. It must not flood.** 471 existing hits means a bare word list fails 80 of 80
entries on the first run and gets switched off. The repo already has the pattern
for this: `MAX_FIGURE_WIDTH` has three melds that exceed it on purpose, and
"the test beside them freezes that list, so a fourth has to be argued for rather
than arriving unnoticed."

**2. It must ratchet, not merely freeze.** A per-entry budget, stored as data,
that the gate reads: a count above the budget fails, a count below it fails too
with an instruction to lower the number. The second half is what makes the
backlog shrink instead of ossifying — every audit that removes a marker also
tightens the budget behind it, permanently.

**3. It must say what it did not look at.** Same rule as `npm run originality`
and `npm run validate`: the run reports the entries it checked and the count it
compared against, so a quiet pass cannot mean "the tool matched nothing."

Sketch, to be argued with rather than followed:

- `packages/data/prevalence-budget.json` — 80 ids and 80 numbers, generated once
  from the measurement, committed.
- A check in `npm run validate` (it already reports per-entry problems and is
  already the thing that stops a bad entry being committed).
- Failure text that names the offending sentence and asks the one useful
  question: *which sentence in a source ranks this?* — because that is the
  question the audit records show nobody asked.
- A `--relax` or explicit budget bump for the genuine case where a source does
  rank something and the entry should say so.

Open questions the build should settle, not assume:

- Is the vocabulary right? It was chosen from the audit records' findings, not
  measured for precision. What share of the 471 are real claims rather than
  innocent usage nobody would flag on review? **Nobody has read them.** Sampling
  fifty by hand before building would be the honest first step, and might change
  the vocabulary or kill the idea.
- Per-entry counts, or frozen sentence hashes? Counts are ~80 numbers and cheap;
  they do not notice a claim being swapped for a different one. Hashes catch that
  and are a much larger file that churns on every prose edit.
- Does it belong in `validate` or in `originality`? It is a claim about facts,
  not wording, which argues for `validate`.

## Two changes to CONTRIBUTING that need no code

Both are supported by the day's evidence and are cheaper than the gate.

**Make three sources the floor, not "two or three".** Five of `mau-mau`'s fifteen
findings were invisible at two sources, including what "Mau-Mau" means — the rule
the game is named after, where the entry had followed the minority of three. At
two sources, four of those five read as settled fact. The
[record](../audits/2026-08-11-zero-on-the-fifth.md) sets this out in full.

**Say plainly that entries are written from notes with the sources closed.**
CONTRIBUTING already says "Research is for facts, not for text… Then they are
closed", in the copyright section. It is not in the numbered steps for adding a
game, and the numbered steps are what somebody follows. Every REUSE finding in
twelve passes came from prose written beside an open source, including four
introduced on 2026-08-11 by the corrections themselves — one of which was a
single word swapped for the source's own while their sentence was on screen.
Writing beside a source is also where "usually" gets reached for, which makes
this one change the cheapest thing on this page.

## What this spec does not establish

Nobody has read the 471 sentences. The claim here is that a marker is *present*,
not that each is unsupported — the three samples above were checked and the rest
were not. The per-pass table is 80 entries split seven ways, with two rows small
enough to be noise. And the measurement counts sentences, not claims: a sentence
with two markers counts once, and a claim spread over two sentences counts twice.

Nothing here says the audit backlog can be skipped. 24 entries still rest on a
pass that never checked a fact, and this changes nothing about them.
