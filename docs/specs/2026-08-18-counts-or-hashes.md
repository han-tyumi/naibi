# 2026-08-18 — Counts or hashes, measured against the history

- **Kind:** Measurement, answering the last open question of
  [the write-time gate design](2026-08-11-prevalence-markers-and-the-write-time-gate.md).
  Written once. It builds no gate and changes no vocabulary.
- **Instrument:** `scan(games, passages, v2)` from `packages/build/prevalence.ts`
  — the same call the shipped tool makes — replayed over every commit that has
  ever touched `packages/data/games/`. The cases and every figure below live in
  `packages/build/test/prevalence-claim-churn.json` and are recomputed from it
  by `packages/build/test/prevalence.test.ts`.

## Why this exists

The design named three open questions and said the build should settle them
rather than assume. Two are now settled. The vocabulary was measured on
[2026-08-13](2026-08-13-prevalence-vocabulary-precision.md) and read a second
time on [2026-08-17](2026-08-17-a-second-reader-on-the-prevalence-sample.md).
Where the check belongs the design argued itself: "It is a claim about facts,
not wording, which argues for `validate`."

The third is still open, and it is the one the design answered with an
assumption instead of a number:

> **Per-entry counts, or frozen sentence hashes?** Counts are ~80 numbers and
> cheap; they do not notice a claim being swapped for a different one. Hashes
> catch that and are a much larger file that churns on every prose edit.

Three claims sit in that sentence. Counts are cheap — true, and not in doubt.
Counts miss a swapped claim — true by construction, but **how often does that
happen?** Hashes churn on every prose edit — **that one is measurable, and it
is wrong.**

## What was measured

Every commit that touched game data, replayed oldest to newest through today's
v2 instrument, recording for each entry the set of sentences it flags. Then each
entry compared across each commit boundary.

**88 commits, 2026-07-31 to 2026-08-17 — the whole life of the corpus.** The
clone this ran in was shallow and reached back only to 2026-08-10; unshallowed
it reaches 88 commits instead of 23. A measurement run without noticing that
would have quoted a quarter of the history and said nothing about the rest.

Two controls before any number was believed. The harness flags 429 sentences at
the tip under v1 — the figure `npm run prevalence` prints, so the replay drives
the real instrument rather than a copy of it. And the classifier was given five
synthetic transitions: no change, a claim added, a claim removed, a claim
swapped for a different one, and a claim reworded. It has to read the last two
as count-blind and the first three as it does, or its headline number is a
count of nothing in particular.

## The result

| | |
| --- | --- |
| Entry-transitions across 87 boundaries | 5,978 |
| Flagged set unchanged | 5,904 |
| Count changed — **a counts gate sees these** | 60 |
| Count identical, flagged sentences different — **a counts gate is blind** | 14 |

**All fourteen blind transitions were read, against the commit's own diff where
the sentence pair alone was ambiguous. Nine were real claim changes. Five were
wording.**

The nine are what a counts gate buys you nothing against. `war`'s is the
clearest, because the commit subject says what it is — *"war called the
three-card war what most people know; the sources say many"*. The entry went
from "the version most people know" to "many players do it", the exact
correction the marker vocabulary exists to prompt, and the flagged-sentence
count never moved. `canfield` went from a gap being fillable "with anything" to
"from the waste instead, and at your own choosing". `pyramid`'s redeal count,
`blackjack`'s resplit limit, `oh-hell`'s "a common gentler version" becoming
"usually the most widespread" — none of them moved a count.

## The churn a hash file actually costs

| | commits it churns on |
| --- | --- |
| A per-entry counts file | 30 of 87 |
| A frozen hash file | 35 of 87 |

**Five commits, across the corpus's entire life.** Not "every prose edit" — a
hash file sits still through 52 of the 87 boundaries. The design's cost estimate
was the one number in the trade nobody had counted, and counting it moves the
price from prohibitive to marginal.

The size difference is real and stays real: 80 numbers against 330 hashes at
today's tip.

## The finding: which kind of pass it was predicts what it was

**Every one of the nine claim changes came from a pass whose purpose was facts.
Every one of the five rewords came from a pass whose purpose was words. There
are no crossings in either direction.**

The corpus has exactly two kinds of pass that touch prose. The fact passes are
the audits and the corrections that follow them. The wording passes are two:
the 2026-08-01 rewrite of copied passages and the 2026-08-15 verbatim re-sweep,
both of which changed words on purpose and facts not at all.

`golf-multiplayer`'s 2026-08-01 case is the one that shows why this had to be
read rather than counted. Its flagged sentence changed completely — a claim
about chasing a second queen replaced by one about pairing 2s — and the diff
shows both ideas present before *and* after. The word "often" migrated from one
sentence to the other. Nothing was claimed that had not been claimed already.

So a hash gate's extra fires are not noise sprayed at random. They land on
audits, which is where you want a gate that asks *which sentence in a source
ranks this?*, and otherwise only on the two sittings this corpus has spent
deliberately rewriting prose — sittings that are already re-stamping the
entries they touch, because [decision 0025](../decisions/0025-a-wording-fix-amends-the-check.md)
makes a wording fix amend the check.

## What this argues for

**Hashes.** Nine real claim changes caught, five spurious fires, five extra
churning commits, and 250 more lines in a committed file.

There is also a plain argument the numbers do not carry. The design wants
failure text that "names the offending sentence". A counts file can list an
entry's flagged sentences, but it cannot say which one is *new* — that
information is exactly what a count throws away. The failure message the design
asked for needs the hashes it was undecided about.

Both forms ratchet equally well: the design's second constraint is that a count
below budget must fail too, and set membership tightens the same way a number
does.

## What this does not establish

**The 60 count-changed transitions were not read.** So this says a counts gate
missed nine real claim changes over the corpus's life; it does not say what
share of all real claim changes nine is. The denominator would need those 60
read too.

**One reader read the fourteen**, and that reader is not independent of the
project. The cases are stored with their sentences so a later reader can
disagree with a case rather than with a total.

**It is a replay, not a record of what reviewers saw.** Today's v2 vocabulary
applied to historical data says how the gate would have behaved had it existed,
which is the question — but no reviewer was actually flagged at the time, and
nothing here says they would have acted on it.

**Neither form catches what the design already said it cannot.** A claim
rewritten so that no marker survives leaves both a count and a hash set smaller
and quieter, and the four most damaging findings of 2026-08-11 needed reading.
This chooses between two shapes of one cheap check.

**And it still builds no gate.** What is missing is unchanged from the design:
the committed file, the `validate` hook, and the flooding question — 330 flagged
sentences across 80 entries is the number the first run would have to start
from, and nobody has decided what the opening budget should be.
