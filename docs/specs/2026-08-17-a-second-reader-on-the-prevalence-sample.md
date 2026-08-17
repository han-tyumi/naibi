# 2026-08-17 — A second reader on the prevalence sample

- **Kind:** Measurement, answering the closing request of
  [the 2026-08-13 precision measurement](2026-08-13-prevalence-vocabulary-precision.md).
  Written once. It changes no vocabulary and builds no gate.
- **Instrument:** the same two sample files,
  `packages/build/test/prevalence-sample.json` and `prevalence-heldout.json`,
  which now carry a second verdict per sentence in `verdict_2`. Every number
  below is recomputed from them by `packages/build/test/prevalence.test.ts`.

## Why this exists

The 2026-08-13 measurement judged 75 sentences with one reader and then said
plainly what that was worth:

> **This is the only sentence in either sample with two independent judgements
> from the same reader, and they disagreed** — not on the soft claim/weak boundary
> the caveats already warn about, but between "finding" and "noise", the only
> distinction the whole measurement rests on. One out of one is not a reliability
> figure. It is a reason to believe the real precision interval is wider than
> 32–54%, and a reason for the next sitting to have somebody else read fifty.

And it named the stake exactly:

> **A second reader disagreeing on six sentences would change the recommendation.**

Somebody else has now read all seventy-five.

## How it was kept blind

The `verdict` field was withheld: the sentences, their entries, their fields and
their matched markers were extracted to a working file and judged from that,
against the four-category legend and nothing else. The verdicts were written down
and only then compared.

**The blinding is partial and the number is reported both ways.** The 2026-08-13
document quotes 21 of the 75 sentences with their verdicts attached, as worked
examples — `scopa`'s "Most coins", `caribbean-stud`'s "the standard poker
rankings", `seven-card-stud`'s "Most rooms cap a round" and eighteen more — and
that document had to be read to know what the task was. Those 21 are marked below
and the agreement is given for the 54 genuinely unseen as well.

## The result

**Exact agreement across the four categories: 63/75, 84%.**

**Agreement on the distinction the measurement rests on — is this flag worth a
reviewer's time, or is it noise? — 69/75, 92%.**

On the 54 sentences the second reader had not seen judged: **81% exact, 91%
real-versus-noise.** Effectively identical, so the pre-seen 21 are not holding the
figure up. Two of the pre-seen items were judged *differently* from the verdict
printed beside them.

### Precision, both readings

| | reader 1 | reader 2 |
| --- | --- | --- |
| v1 vocabulary, n=50 — strict | 16/50, **32%** | 21/50, **42%** |
| v1 vocabulary, n=50 — loose | 27/50, **54%** | 32/50, **64%** |
| v2 vocabulary, held out, n=25 — strict | 16/25, **64%** | 17/25, **68%** |
| v2 vocabulary, held out, n=25 — loose | 20/25, **80%** | 21/25, **84%** |

**The recommendation survives, and it survives upward.** Six sentences did cross
the real/noise line — the number the measurement said would change its mind — but
every one crossed toward *more* real claims, not fewer. v2's held-out precision
reads 68/84% on the second reading against 64/80% on the first, and the
improvement over v1 that the whole document argues for is intact under both
readers.

## The finding is the direction, not the rate

**All twelve disagreements run the same way. The second reader was stricter on
12 of 12; the first reader was stricter on none.** They split into two clean
groups:

- **Six at the claim/weak boundary** — reader 1 `weak`, reader 2 `claim`:
  `beggar-my-neighbour`'s "two players for the standard game",
  `contract-bridge`'s "In the common form", `omaha`'s "usually double it" and its
  "you may usually top up", `pinochle`'s "Game is usually 1000", `rummy`'s "The
  common alternative is penalty scoring".
- **Six at the weak/innocent boundary** — reader 1 `innocent`, reader 2 `weak`:
  `fan-tan`'s "You usually have a choice", `indian-rummy`'s "usually most of the
  hand", `spoons`' "usually what you want at a party", `texas-holdem`'s "ties are
  far more common here", `truco`'s "far more often than it gets taken",
  `tien-len`'s "less often need chopping".

Zero disagreements in the other direction, on either boundary, is not what
disagreement looks like when two readers are applying the same rule with noise.
**It is a calibration offset**: the two readers largely agree about what each
sentence *is*, and differ about where the two thresholds sit. `fan-tan`'s "You
usually have a choice" is the case to look at — the 2026-08-13 document already
flags it as the one sentence in an entry that reader had edited that day, judged
`innocent` there and `weak` here.

That is a better problem than unreliability, and it has a consequence.

## What this says about the open question "where does `weak` sit?"

The 2026-08-13 build note leaves it undecided:

> **Where does `weak` sit?** It is 11 of 50 in v1 and 4 of 25 in v2, and it is the
> softest judgement in this document. Moving that boundary moves the headline from
> 30% to 52%.

Two readers now put that boundary in measurably different places — **and agree far
better on whether a sentence is real at all (92%) than on which of the two kinds
of real it is (84%).** A gate that fires on `claim` alone is a gate built on the
less reproducible of the two judgements. A gate that fires on `claim` **or**
`weak` is built on the one both readers reach the same way nine times in ten.

That does not settle the design question — a gate on claim+weak also fires more
often, which runs into the flooding constraint the same document names first. But
it converts a matter of taste into a trade with a number on each side.

## What this does not establish

**Two readers is two.** They agree at 84% and 92%, which is a reliability figure
where there was none, and it is not evidence that either reading is *correct*. A
sentence both readers call `claim` still has not been checked against a source;
the judgement is only that a reviewer should ask.

**The second reader is not independent of the project.** It had spent the two
preceding sittings in this corpus — comparing its nested prose against sources
and reading all 369 variants — and had read the 2026-08-13 document, including 21
of the sentences with their verdicts. It wrote none of the prose it judged.

**It says nothing about recall**, which is the other half of the question and
still rests on the n=6 measurement of `speed` and `fan-tan`.

**And it shortens no backlog.** The gate remains designed, measured twice, and
unbuilt: what is missing is still the per-entry budget file and the `validate`
hook, plus the counts-or-hashes decision, none of which a second reading supplies.
