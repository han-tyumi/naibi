# 2026-08-13 — Reading the 471: how precise is the prevalence vocabulary?

- **Kind:** Measurement, answering the open question in
  [the prevalence-marker spec](2026-08-11-prevalence-markers-and-the-write-time-gate.md).
  Written once. The gate it was blocking is still not built, deliberately.
- **Instrument:** `npm run prevalence`, reporting only. The samples are
  `packages/build/test/prevalence-sample.json` and `prevalence-heldout.json`;
  every number below is recomputed from them by
  `packages/build/test/prevalence.test.ts`.

## Why this exists

The 2026-08-11 spec designs a write-time gate for prevalence markers — "most
tables", "the usual", "nearly every computer version" — the largest single
category of factual error in this audit. Then it names what has to happen before
anybody builds it:

> Is the vocabulary right? It was chosen from the audit records' findings, not
> measured for precision. What share of the 471 are real claims rather than
> innocent usage nobody would flag on review? **Nobody has read them.** Sampling
> fifty by hand before building would be the honest first step, and might change
> the vocabulary or kill the idea.

So: fifty were read. Then twenty-five more, to check the answer out of sample.

**It changed the vocabulary and did not kill the idea.**

## The instrument, and controlling it

`npm run prevalence` counts flagged sentences per entry and per marker across the
four prose fields and every variant description — the same passages the spec
measured — and `--outside` covers the captions, figure labels and table notes that
neither it nor the originality checker reads.

It refuses to report anything until it has proved it works. The spec's own first
run "returned zero across all 80 entries, which reads exactly like a clean corpus
and was a broken regex", and requires the same of anything built from it. The
control asserts three things: it flags a planted claim, it ignores a clean
procedural sentence, and the not-a-claim filter still exempts a standard-deck
sentence.

**It was controlled by being broken on purpose, twice.** Re-introducing the spec's
actual bug — a word boundary escaped one level too many — produced
`CONTROL FAILED — failed to flag the planted claim`, exit 1, and no report.
Disabling the not-a-claim filter produced `CONTROL FAILED — the not-a-claim filter
missed`, exit 1, no report. A working run exits 0. Both breakages are the two ways
this number could be silently wrong, and neither can now happen quietly.

## Re-measurement first, because the spec said to

> Those two rows are 1 entry and 5 entries. They are suggestive and they are not
> a result. Anyone building this should re-measure rather than quote them.

**455 flagged sentences, all 80 entries, median 6 per entry, max 14.** The spec
had 471 on 2026-08-11.

Nineteen entries have been fact-audited in the two days between, and the count
fell by 16 — **about 0.8 markers removed per entry audited.** That corroborates
the spec's own reading that "the audit catches some and leaves roughly four or
five per entry standing", and it is the number a ratchet would move.

One vocabulary word, `prevalent`, does not appear anywhere in the corpus. It costs
nothing and finds nothing.

**The count moved again before this document was finished.** Auditing `tien-len`
later the same day took it from 455 to 445 on the designed vocabulary and from 355
to 347 on the measured one — one entry, eight markers, every one of them a finding
that sitting recorded by reading. The 455 is the number the fifty were drawn from
and is kept as that; the ratchet rate above is the point, and a single entry moving
it by eight says the rate is not smooth.

## What fifty sentences turned out to be

Read on 2026-08-13, one verdict each, stored as data so a later reader can
disagree with a sentence rather than with a total. Four categories:

| Verdict | Meaning |
| --- | --- |
| **claim** | A reviewer asking *which sentence in a source ranks this?* would be asking a useful question |
| **weak** | A frequency generalisation about play or outcomes that nothing measures — the audit does flag these, but they are softer |
| **hedged** | The marker sits inside an explicit attribution, or honestly refuses to claim prevalence. Flagging it is noise |
| **innocent** | Not a prevalence claim at all — a proportion, a probability, a rate, a rule, a term of art, or another sense of the word |

**claim 16, weak 11, hedged 3, innocent 20.**

- **Strict precision — 16/50, 32%.**
- **Loose precision, counting weak — 27/50, 54%.**
- **Noise — 23/50, 46%.**

So on the kindest reading nearly half the flags are noise, and on the strict
reading two in three are. A bare word list is not a gate; it is a reading list with a
coin-flip attached.

The noise is not marginal vocabulary trouble. It is whole other senses of the
word: `scopa`'s "Most coins: 1 point" is the name of a scoring category,
`nertz`'s "Foundations are common property" means shared, `red-dog`'s "For most of
the twentieth century" is a date range, `doppelkopf`'s "is most of the skill" is a
proportion, `caribbean-stud`'s "the standard poker rankings" is a term of art.

And three flags were the entry doing exactly the right thing. `tarneeb` —
"It is given as a regional rule rather than **the norm**". `pitch` — "no fixed
alternative target is **standard**". `rummy-500` — "one account treats a 54-card
pack as the **standard** one". **A gate on this vocabulary would fire on the
sentence pattern the audit spends its time producing**, which is the fastest way
to get a gate switched off.

## Per word, which is where the answer is

| Marker | Sampled | claim | weak | noise | Precision | Flags in corpus |
| --- | --- | --- | --- | --- | --- | --- |
| `common` | 12 | 7 | 2 | 3 | **75%** | 59 |
| `usually` | 10 | 1 | 6 | 3 | **70%** | 85 |
| `commonly` | 1 | 1 | 0 | 0 | 100% (n=1) | 12 |
| `widespread` | 1 | 1 | 0 | 0 | 100% (n=1) | 5 |
| `often` | 7 | 2 | 1 | 4 | **43%** | 78 |
| `most` | 13 | 5 | 1 | 7 | **46%** | 161 |
| `standard` | 9 | 2 | 1 | 6 | **33%** | 68 |
| `the norm` | 1 | 0 | 0 | 1 | 0% (n=1) | 2 |

**The three worst words carry two thirds of the volume.** `most`, `often` and
`standard` are 307 of the 455 flags and three of the four lowest precisions in the
table.
That is the whole finding: the vocabulary is not uniformly mediocre, it is a good
short list with three bulk sources of noise bolted on.

## What was changed, and why `standard` was dropped rather than filtered

A second vocabulary, `MARKERS_V2`, selected by `--v2`. The first one is left
**unedited** — the 455 was measured against it, and a tuned number quoted against
an untuned baseline is not a comparison.

`most` and `often` stay, with the collocations the sample proved they were
missing. Each is a sentence somebody read: `most of the|a|them|it`, `for most of`,
`most likely`, `holds most cards`, `most coins|cards|points|tricks|sets`,
`differ most`, `as often as`, `how often`, `more often than`. The original filter
covered only `most of the pack|deck`, and its `\bthe most cards\b` missed
`snap`'s "holds most cards" on the article alone.

**`standard` is removed.** Every one of its noise cases is attributive — "the
standard poker rankings", "standard FreeCell", "the standard tactic", "in the
standard game" — so exempting attributive uses is the obvious fix, and it was
tested against the sample before being rejected: it would have exempted 6 of its
6 noise cases and 2 of its 3 real claims. A marker with that recall is not worth a
rule. Note the cost honestly: the two claims lost are real —
`beggar-my-neighbour`'s "two players for the standard game" and `crazy-eights`'s
"a standard one here rather than an embellishment" — and this is the exact
sentence shape corrected in `speed` the same morning ("The standard game is for
two players"). **Dropping `standard` gives up a shape the audit demonstrably
catches by reading.**

One implementation bug was found while doing this and is worth recording because
it would have quietly cost recall: the filter replaced only the **first**
occurrence of each exemption. A sentence containing both "most of the pack" and a
real "most tables" would have had its claim swallowed by its exemption. Now
global.

## The revised vocabulary, measured on sentences it was not built from

Tuning a filter on a sample and then quoting that sample's precision measures
nothing, and this repo has already learned that about similarity thresholds. So
**v2 was measured on 25 sentences none of which is in the fifty.** The overlap is
zero and a test asserts it.

**claim 16, weak 4, hedged 1, innocent 4.**

- **Strict precision — 16/25, 64%**, against v1's 32%.
- **Loose precision — 20/25, 80%**, against v1's 54%.
- **Noise — 5/25, 20%**, against v1's 46%.

Volume: **355 flags in 77 of 80 entries**, down from 455 in 80 of 80.

Samples of what it now catches, all four unattributed and none of them checkable
against anything: `accordion` — "it is what **most** software deals by default";
`nertz` — "**most** players hold them in one hand"; `seven-card-stud` — "**Most**
rooms cap a round at a bet plus three raises"; `sheepshead` — "tables **often**
waive double on the bump".

**Three of the five remaining noise cases are one gap**: "the **most** recent
card" in `casino` and `egyptian-ratscrew`, and `president`'s "took the President's
chair more **often** over the session", which the new `more often than` misses on
the last word. Adding `most recent` and bare `more often` would remove them. That
is **a prediction, not a result** — it would have to be measured on a third
sample, and this document should not be read as claiming 88%.

## A number for the thirty-percent question, in passing

`--outside` scans the fields neither the originality checker nor the `checked`
fingerprint covers: captions, figure labels, card notes, scoring-table and deal
notes. **21 flagged sentences in 12 of 80 entries** under v2.

That is small in absolute terms and it is not nothing, and it arrives with a
concrete instance from the same day: `speed`'s layout caption carried "each player
owns the stack at their own left", an invented convention that survived in the
generated drawing after the prose claim had been corrected. Unlike the originality
question, a marker gate over these fields costs nothing extra to build — the
instrument already reads them behind a flag — and it does not invalidate a single
stamp, because a marker count is not a fingerprint. **It is the cheapest partial
answer available to
[the thirty-percent spec](2026-08-12-the-thirty-percent-outside-the-check.md)**,
covers one error category rather than wording, and settles nothing about the other
225,000 characters. Recorded here for whoever takes that decision, not as an
argument for it.

## Recall, from the audit that happened the same morning

Precision is half the question. The other half is what share of real findings a
marker gate would catch, and one clean measurement was available.

`speed` and `fan-tan` were fact-audited earlier on 2026-08-13, by reading, with
no marker tool involved. Running v2 over their pre-audit and post-audit text:

**6 flagged sentences before, 1 after.** All five that went were sentences the
audit had independently recorded as findings — "so most players fall into a
rhythm", "a common way to level the field", "the single most common source of
mid-game arguments in Speed", "which is what most tables call it anyway", "the
most-changed of the family". The one that remains is `fan-tan`'s "You usually have
a choice of several legal cards", which this sampling judged innocent.

Set against the audit's total: **5 of that sitting's 26 findings, 19%, were
marker-catchable.** Which is close to the spec's own estimate that "roughly a
quarter" of a day's findings were a marker attached to something no source ranks,
and worth stating as the ceiling: a gate at 80% precision would have caught a
fifth of the day's work and left the other 21 findings — including the two that
mattered most, a rule denied and a claim that ran backwards — entirely untouched.

Be careful how much this is worth. The vocabulary was **derived from audit
records of exactly this kind**, so agreement with an audit's findings is
concurrent validity at best, not independence. And n is 6.

## So: build it?

**Yes, on v2, and the spec's design survives unchanged apart from the word list.**

Its three constraints all still bind, and the measurement sharpens the first one:

1. **It must not flood.** 355 in 77 of 80 entries. A bare gate still fails
   96% of the corpus on its first run, so the per-entry budget file is not
   optional — it is the only thing that makes the check switchable-on at all.
2. **It must ratchet.** The 0.8-markers-removed-per-entry-audited figure above is
   the rate the ratchet would lock in. Nineteen entries of auditing moved the
   corpus 471 → 455 without anything holding the gain.
3. **It must say what it did not look at.** The instrument already does, and it
   also names the entries that came back quiet, which is the distinction between
   "clean" and "never scanned".

Two things the build should still settle, and the measurement now informs both:

- **Counts or sentence hashes?** Counts do not notice a claim being swapped for a
  different one. Given that 20% of v2's flags are noise, a count-based budget
  lets an entry trade a real claim for an innocent one at par. Hashes catch that
  and churn on every prose edit. Undecided here.
- **Where does `weak` sit?** It is 11 of 50 in v1 and 4 of 25 in v2, and it is the
  softest judgement in this document. Moving that boundary moves the headline
  from 30% to 52%. If the gate is meant to catch only claims about what *tables*
  do, `usually` drops from 70% to 10% on this sample and should probably go the
  way of `standard`.

## The one sentence with two judgements, which disagreed

Added the same day, after `tien-len` was audited a few hours later and turned out
to contain one of the sampled sentences.

Item 47 of the fifty is `tien-len`'s **"More twos demand more, and this is where
tables differ most."** Reading it as part of this sampling, it was judged
**innocent** — the entry admitting that tables vary, which is the behaviour the
audit is trying to produce. Reading the same sentence in the audit of that entry,
with both its sources open, it was **removed as a finding**: an unmeasured
superlative about which part of the rules varies most across tables.

**The audit reading is the better one**, and the verdict has been corrected to
`claim`, which is why the figures above are 32% and 54% rather than the 30% and 52%
first published. The correction is noted on the item itself rather than made
quietly.

What it costs to know that is worth more than the two points. **This is the only
sentence in either sample with two independent judgements from the same reader, and
they disagreed** — not on the soft claim/weak boundary the caveats already warn
about, but between "finding" and "noise", the only distinction the whole
measurement rests on. One out of one is not a reliability figure. It is a reason to
believe the real precision interval is wider than 32–54%, and a reason for the next
sitting to have somebody else read fifty.

> **Somebody else read all seventy-five on 2026-08-17**, blind to the `verdict`
> field, and the second column is in the sample files as `verdict_2`. See
> [the record](2026-08-17-a-second-reader-on-the-prevalence-sample.md).
> **Exact agreement 84%, and 92% on the real-versus-noise distinction this
> document rests on.** Six sentences did cross that line — the number named below
> as enough to change the recommendation — but all six crossed toward *more* real
> claims, so v2's held-out precision reads 68%/84% on the second reading against
> 64%/80% here, and the recommendation stands. The finding is that **all twelve
> disagreements ran one way**: a calibration offset in where the two boundaries
> sit, not unreliability about what the sentences are.

The mechanism that surfaced it is worth keeping: the test beside the samples asserts
every judged sentence is still in the corpus, so an audit that rewrites one **fails
the build** until the drift is acknowledged in the file and the replacement re-read.
It fired on its first opportunity. Two items are now listed as edited away — this
one, and a held-out sentence whose innocent verdict still stands.

## What this does not establish

**n is 50 and then 25, and one reader made every judgement.** The claim/weak
boundary is the softest part and it moves the headline number by 22 points. A
second reader disagreeing on six sentences would change the recommendation. The
section below is what happened when that reader was checked against itself.

**That reader is not neutral.** The same session had spent the morning auditing
two entries in this corpus and had, for the eleventh sitting running, written
prevalence markers into its own corrections. One sampled sentence comes from an
entry it edited that day — `fan-tan`'s inherited "You usually have a choice",
which it did not write. The other 74 are somebody else's prose. This is stated
rather than corrected for.

**Precision is not correctness.** A sentence judged `claim` here has not been
checked against a source; the judgement is only that a reviewer should ask. Some
of the 15 and the 16 will turn out to be supported — poker blind conventions and
`klondike`'s two draw settings most likely among them.

**Nothing here shortens the audit backlog.** Five entries still rest on a pass
that never checked a fact, and a gate that catches a fifth of findings at write
time would not have found any of the four the 2026-08-11 spec lists as its
hardest, nor the two that mattered most on 2026-08-13.
