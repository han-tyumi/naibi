# 2026-08-08 — Fifteen audited: the pass that separated wording from fact

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-08

## What was checked


**15 entries, checked 2026-08-08**, in six groups. The first is `sueca`, opened
for one reason and rewritten for four. The reason was a corpus-internal duplicate: its sentence for what wins
a trick stood one article away from `euchre`'s, twenty words identical. Nothing
here checks for that. `npm run originality` compares an entry against its
sources and never against the rest of the collection — and it computes exactly
that comparison anyway, 5,302 of our own pairs per run, to calibrate the bar,
then keeps the numbers and discards which pair produced them.

Measuring it exhaustively found **394 cross-game passage pairs at or above the
bar** before the rewrite below and **387 after it** — the one sentence accounted
for seven of them — which sounds worse than it is. The top of that list is the vocabulary
this project has already decided to keep: the ace-ten card values across
`belote`, `skat` and `doppelkopf`, the rummy stock-and-discard sentence across
five entries. A hypothesis that multiplicity would separate a propagated formula
from shared vocabulary was tested and **failed** — the legitimate phrases are the
most multiple of all. Six entries state the trick-winning rule and five state it
in visibly different sentences; only `euchre` and `sueca` were one sentence used
twice. So a corpus-internal report is a reading list needing 394 judgements, not
a gate, and it is not built.

**Re-reading `sueca` to earn the re-stamp then found three claims its sources do
not carry**, none of them related to the duplicate that opened it:

- The deal combined two sources' incompatible halves — dealing in a single block
  of ten, from the dealer's right — and called the result Portuguese custom. One
  source pairs the block deal with the dealer's *left*; the other calls that
  pairing Brazilian. Neither states the combination the entry had.
- The revoke penalty was inverted. The entry made a four-game rubber the rule
  "most groups" use and demoted to a "milder convention" the two-game penalty
  that is the only one either source states.
- The 60-all tie was written as a dead hand. One source states, and the other
  lists, a carry-over that makes the next deal worth an extra game.

That entry came from the 2026-08-01 pass. It is one entry, so it proves nothing
about the other 35 — but it is the first inherited entry anybody has re-read
with the sources open since, and it had three. Worth a pass of its own before
the next batch of new games.

The other three are `belote`, `five-card-draw` and `rummy` — the first
deliberate audit of the 2026-08-01 group, and the reason the paragraph above
stops short of a recommendation no longer applies. `sueca` had been a sample of
one, and chosen for a reason. These three were chosen **by position**: the group
sorted by id, every twelfth entry taken. Three different families, no
cherry-picking, both attributed sources fetched and read against each entry.

**All three had errors. Twelve in total, plus four verbatim runs.**

- `five-card-draw`, five. A fixed-limit round was given as a bet and **three**
  raises where pagat says four, twice. A first round checked all the way round
  was said to carry on to the draw, where pagat throws the cards in and redeals
  — which the entry's own jacks-or-better variant already described correctly,
  so it contradicted itself. A burn card was stated as procedure and then used
  in an arithmetic: one source has no burn at all, the other burns before each
  player's replacements, and pagat's own sum is 6 x 8 = 48 without one. The
  exhausted-stock rebuild pulled in folded hands, which neither source includes.
  And `players.ideal` was 5 against the one source that opines, which says six.
- `belote`, four. Both sources say the takers make their contract with **at
  least as many** points as the defenders; the entry required strictly more,
  which inverts what happens at 81-all. On top of that it promoted `litige` —
  pagat's "some play that", absent from Wikipedia — to the main rule, and gave
  it four sentences. The target was "501 for a short game and 1000 for a full
  evening" where both sources say 1000 flatly and neither mentions 501. And a
  simultaneous crossing of the target was awarded to the takers where pagat says
  the game is drawn.
- `rummy`, three, all of them prevalence. One meld a turn is the standard and
  multiple is "some people play"; the entry had the looser form as "the more
  common modern game". A target of "most often 100 or 500" appears in neither
  source. Ending the hand after a second cycle of the stock was given as what
  "most groups" do, where the suggestions are a third exhaustion or a single
  reuse.

The four verbatim runs were all in `rummy` and all pre-existing: a set defined
in pagat's words down to the "such as", the stock-and-discard sentence, the seat
the deal starts from, and a generic opener. A fifth was left, because "the top
card of the discard pile" is on the kept list below and pagat's sentence around
it states a different rule.

The last three are `euchre`, `skat` and `cribbage`, taken next because a dense
scoring system is where an error costs a reader most. **`euchre` had five;
`skat` and `cribbage` had none of substance.**

`euchre` restricted going alone to whoever named trump, where both sources let
any player go alone — maker or defender — and allow both at once. The lone
defender's euchre, worth 4 rather than 2 in both sources' *main* scoring, had
been demoted to an optional variant and given an invented precondition: that the
maker must already be alone. The opening lead on a lone hand had rule and
variant swapped, both sources giving it to the player on the loner's left. A
renege was said to cost 4 against a lone hand, which neither source states. And
the scoring list had no row for a lone defender at all.

`skat` and `cribbage` were checked on the claims most likely to be wrong — base
and null values, the schneider thresholds, the overbid deduction and
Seeger-Fabian; the flush, nob, heels, skunk and 121 figures — and every one
holds. Both carried verbatim runs, all pre-existing and all rewritten except
three left on the kept list by name.

The fourth group is `hearts`, `oh-hell` and `canasta`. `oh-hell` had one that
matters: it called the all-or-nothing method "the standard scoring" and the
trick-plus-bonus method "a common gentler version", where pagat calls the second
one *perhaps the most widespread*. `hearts` had one soft claim, that "most
groups" let a moon-shooter deduct 26 rather than charge everyone else, where the
sources present the two simply as the shooter's choice. `canasta` had none: its
minimum-count ladder of 15, 50, 90 and 120 against the score bands, its 500 and
300 for canastas, and its 11-card deal are all exactly right.

The fifth group is `pinochle` and `scopa`. `pinochle` needed the right source
before it needed anything else: pagat's A-Z entry for the name leads to *Auction*
Pinochle, the three-player game, and the entry describes single-deck partnership
Pinochle, which is a different page. Read against the right one its melds are
exact — 150 for the run, 40 and 20 for the marriages, 10 for the dix, 40 for the
pinochle, 100/80/60/40 for the arounds, and 250 available in tricks. Its one
error was the target: a flat "first side to 1000", where the source's version
plays to 1500. It now names both and adds the rule for a simultaneous crossing.
`scopa` had none — its four contested points, both tie rules and the primiera
scale all hold.

The sixth group is `contract-bridge`, `texas-holdem` and `gin-rummy`, and it is
the one that says the most about how to read a source. All three came back
almost clean on fact. Bridge's whole scoring apparatus is exact — 20, 30 and
40-then-30 per trick, 500/750 and 1000/1500 for the slams, both doubled
undertrick ladders, the insult, the honours — with a single imprecision, an
overtrick line that implied 40 in notrump where the rate is 30.

`gin-rummy` looked like an error and is not. pagat's main rules give 20 for
gin, 10 for an undercut and 20 a box; the entry uses 25 for all three, which is
pagat's *second* listed variation. But Wikipedia gives 25/25/25 as the current
standard and names 20 and 10 as the **early official** values. So the entry
follows the modern convention and the two sources disagree about which is
standard — which is a thing to say out loud, not a thing to correct. It now says
it. **Not every mismatch with a source is an error, and the way to tell is to
read the other one before reaching for the keyboard.**
