# 2026-08-12 — Beggar-My-Neighbour and Egyptian Ratscrew: one game and the same game with slapping

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-12

## What was checked

**6 entries, checked 2026-08-12** — the day's total across all three records of
the date, not this sitting's. This sitting read `beggar-my-neighbour` and
`egyptian-ratscrew`; the day's other four are in
[the golf and TriPeaks record](2026-08-12-golf-and-tripeaks.md) and
[the Yukon and Forty Thieves record](2026-08-12-yukon-and-forty-thieves.md).

**Two audited, two faulty, fourteen wrong or unsupported statements between
them** — five in `beggar-my-neighbour` and nine in `egyptian-ratscrew`.

**15 entries remain on 2026-08-03.**

Sources, read with the text open: `beggar-my-neighbour` against
[pagat](https://www.pagat.com/war/beggar_my_neighbour.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Beggar-my-neighbour);
`egyptian-ratscrew` against
[Wikipedia](https://en.wikipedia.org/wiki/Egyptian_Ratscrew) and
[Bicycle](https://bicyclecards.com/how-to-play/egyptian-rat-screw).

**pagat's Egyptian Ratscrew page is exactly what the source map says it is** — a
naming and derivation stub that ends "For the rules, please refer to Oxymoron's
Egyptian Ratscrew Page" and carries none itself. It was read for the derivation
and the alias list and was deliberately **not** put in `.sources/`, since it
cannot support a rule. Bicycle stands as the second source, which is what the
map already recommends.

## Why these two, and what the pairing bought

Egyptian Ratscrew *is* Beggar-My-Neighbour with slapping added. That is not an
inference: pagat files both under its war group and says ERS "is based on the
English children's game known as Beggar My Neighbour ... with the additional
rules that allow the pile to be won by slapping", and Wikipedia says from the
other side that Beggar-my-neighbour "has spawned a more complicated variant,
Egyptian Ratscrew". Every face-card rule in the noisy game is inherited from the
quiet one, so an error in the inheritance would sit in both.

**The inherited part came back clean, and that is a result only a deliberate
pairing produces.** Both entries state the pay-card counts — jack 1, queen 2,
king 3, ace 4 — in prose *and* in a `ranking` figure, four statements of the same
fact across two entries. All four are right: pagat and Wikipedia give exactly
those numbers for Beggar-My-Neighbour, and Wikipedia gives exactly those chances
for Egyptian Ratscrew. Nothing needed changing, which is worth recording,
because a shared number restated four times is precisely the shape this audit
usually finds broken.

**What the pairing did catch was borrowed from a third game.** `egyptian-ratscrew`
carried two rules for a player who has run out of cards — that they are out once
somebody else claims a pile, and that a cardless player who false-slaps "is out
on the spot" — and neither is in either of its sources. Both are in
[`slapjack`](2026-08-10-ten-audited.md), audited on 2026-08-10 against its own
two sources, which says a cardless player gets "exactly one chance, not an open
invitation to keep slapping all game" and that false-slapping while cardless
puts you out. Those are Slapjack's rules, correctly recorded in Slapjack's
entry, and they had migrated into a game whose own sources say something else.
The neighbour that supplied the error was not the entry it was paired with.

## `beggar-my-neighbour` — five

1. **The losing condition was inverted.** The entry gave "the usual reading is
   that you are beaten at the moment you are required to turn a card and have
   none", then demoted the flat rule to "plenty of households simplify and call a
   player out as soon as their stack empties". A source states that simple rule
   outright — "The player who first runs out of cards loses" — and nothing states
   the entry's reading or ranks it as usual. The entry now gives the one-line
   rule, then names the edge case it leaves open and says to settle it.
2. **Who leads was asserted with nothing behind it.** "The non-dealer turns the
   very first card of the game." Neither source says who starts. This matters
   more here than in most games, and the entry knew it: the very next sentence
   says who starts is one of the two things that decide the whole result. It now
   says the accounts do not settle it and to fix it before the shuffle.
3. **The direction of play was missing.** For three or four players the entry said
   only that the debt "falls on the next player round the table" without ever
   saying which way round. Both sources give it, and one adds a real
   complication — play is clockwise in Britain and North America, while the
   Caribbean version of the game runs the other way. Direction is the third
   category in this audit's taxonomy and it went unstated rather than wrong.
4. **The derivation ran backwards.** The Slapping variant said "Slapjack and
   Egyptian Ratscrew both grew out of this idea". Egyptian Ratscrew did, and two
   sources say so. Slapjack is claimed the other way round: the ERS article says
   the slapping concept "may have been borrowed from the game Slapjack" — that is,
   into this family rather than out of it. The variant now carries the
   derivation in the direction the sources give and hedges the Slapjack half.
5. **"A rare version"** on Paying from a hand. Nothing counts versions.

**And the corrected losing condition was still alive in `goal_and_scoring`.**
Finding 1 removed the unsourced reading from `play`; the scoring section opened
by restating it anyway — "you win by ending up with all fifty-two cards, which
happens the instant your opponent is asked to turn a card and cannot produce
one". That is the same edge-case interpretation, asserted flatly, two screens
below the paragraph that now says the accounts do not settle it. It now says
only what both sources support: winning means your opponent has run dry. **Found
by reading the rendered page rather than the diff** — the seventh consecutive
sitting that step has caught something, and the second in two sittings where
what it caught was a corrected fact surviving elsewhere in the same entry. No
number is claimed for it, on the same basis as the previous records.

**The record figures were vague where a source is exact.** "The record standing
at well over a thousand pile-collections and several thousand card turns" is
true but soft: the longest known terminating game runs to 1,164 pile-collections
over 8,344 card plays. Both numbers are now in. The rest of that paragraph — the
state-cycling argument, Conway's anti-Hilbert problem, the 2024 non-terminating
deal — checks out against both sources, and the entry's blunt claim that the game
contains no decisions at all is supported almost word for word by both: "There
is no skill in this game" and "a simple choice-free card game".

**A `background` was added**, since the entry gave four aliases and no hint where
any of them came from: a British game played there from the 1840s at the latest,
possibly the same as a 1755 game called beat the knave out of doors, and the
names it has collected — Taxes, Strip Jack Naked, Beat Jack Out Of Doors, Suck
the Well in Trinidad and Barbados, Bataille Corse in France. Dickens gives it to
Pip as the only game he knows; Wilkie Collins has two men playing it for sixpence
a time.

## `egyptian-ratscrew` — nine

1. **A run was three cards; both sources say four.** The entry's pattern list gave
   "runs, three cards in consecutive rank order", and its second figure drew one
   as three cards. Both sources name the pattern **Four in a Row** and require
   four or more. Corrected in the prose, the figure's caption and the figure's
   cards.
2. **The cardless player's rule contradicted both sources.** "You are out when
   someone else claims the pile while you are cardless." One source lets an
   eliminated player slap back in "as long as there are still at least two active
   players with cards"; the other says flatly "Continue playing even if you have
   run out of cards ... you are still allowed to slap in". The entry then carried
   the sourced behaviour as a *variant*, Slapping in from outside. Rule and
   variant were the wrong way round.
3. **"The usual ruling is that they are out on the spot"** for a cardless player
   who false-slaps. The one source that addresses it gives a strike system —
   three strikes and you lose the right to slap for the rest of the game — which
   the entry carried elsewhere as "a milder alternative used with children".
4. **The joker default was the wrong way round.** The entry: "the default is that
   a joker is an ordinary card that never matches anything and never triggers a
   slap, though some tables make it slappable on sight." One source states the
   opposite as the rule where jokers are used — "Anytime someone lays down a
   joker, the pile can be slapped" — and the other lists jokers among the common
   slap combinations. The entry now gives three arrangements without ranking
   them, including the reversal of play direction that a source mentions.
5. **Tens excluded a case a source states explicitly.** The entry required "two
   consecutive cards" adding to ten. One source allows a court card to stand
   between them and gives the worked example A, K, 9 — the king counting nothing
   and being stepped over rather than breaking the pair. The entry's own logic
   already said court cards are worth nothing; it just did not follow it through.
6. **Won cards could be shuffled.** "You may square the won cards up any way you
   like and shuffle them into your stack if you want to." A source says piles are
   added "face-down and unshuffled", and the game's whole memory element depends
   on it — the same source's strategy section turns on a double you saw collected
   coming back later as a sandwich. The entry now says cards keep their order and
   says why it matters.
7. **Simultaneous slaps were settled where the sources disagree.** "The bottom
   hand wins." One source says the hand underneath all the others, or whichever
   has the most contact with the cards; the other says "the person with the most
   fingers on top wins". Stated impersonally now, with an instruction to settle
   it first.
8. **Running out mid-challenge gave one outcome where a source gives two.** The
   entry ended the challenge and awarded the pile. The source offers that *or*
   the next player continuing with the chances that were left.
9. **The flat-counts variant ranked itself.** "It is what most people default to
   when nobody at the table remembers the real counts." Nothing counts people.
   Worse, a rearrangement a source actually states was missing: some versions
   reverse the chances for kings and jacks, so a jack gives three and a king one.
   That is now in.

**Three patterns the sources name were missing** and have been added: the hoagie
(a double with two cards between rather than one — which the first figure was
already drawing, labelled only as "not a sandwich"), a flush of three or more
cards in one suit, and the 6-and-9 combination some lists call the ratscrew.

**A `background` was added**, giving the descent from Beggar-My-Neighbour, the
possibility that the slapping came from Slapjack, and the alias pile — ERS,
Egyptian War, Bloodystump, Ratslap, Slap. It is confined to what this entry's own
two sources say: the 1840s dating and the parent game's other names were read
this sitting but in `beggar-my-neighbour`'s sources, and they stayed there.

## The figures

**Both entries' `ranking` figures came through clean** — the pay-card and
face-card counts discussed above. **`egyptian-ratscrew`'s two `meld` figures did
not.** The run row was drawn with three cards and is now four; both captions were
restating rules this sitting changed and were rewritten, and both then had to be
cut to fit the schema's 200-character caption limit, which is worth knowing
before writing one. The "Not a sandwich" row is unchanged and still correct — it
is a hoagie, and a hoagie is not a sandwich — but the caption now names it rather
than implying that two cards between is nothing at all.

## The originality pass, run after the fact fixes

**`beggar-my-neighbour` clean. `egyptian-ratscrew` carries two READ findings,
judged and left.** Both align a short source fragment against our prose. One is
an eight-word list item, "Tens, two cards with ranks adding up to 10", scoring
83% against a hundred-word sentence of ours that contains it — the documented
false-positive shape. The other is the definition of a Double, where the shared
words are the pattern's name and the phrase "two cards" and "rank"; rewording
further would make the entry wrong, and the phrasing now matches what `slapjack`
already uses for the same pattern, which is the consistent-naming case rather
than a copy.

**Both tools were controlled in both directions.** The Wikipedia API returned an
explicit `missing` marker for an invented title and both real articles came back
present; each was fetched twice with byte counts agreeing exactly (4,389 and
9,440). pagat and Bicycle were controlled by reading titles back — invented paths
answer 404 under "404 Not Found" and "Error" respectively, while the real pages
answer 200 under their own titles. No source is hard-wrapped.

**The checker was then controlled per entry against each source file** by
planting a copied sentence in each and repeating the run. All four came back with
the right attribution and both sides printed — 16 words off pagat and 16 off
Wikipedia for `beggar-my-neighbour`, 34 off Bicycle and 14 off Wikipedia for
`egyptian-ratscrew` — and were removed before the clean run.

**Six claims introduced by this sitting's own corrections were caught before the
stamp**, which is the sixth sitting running and no longer a surprise. Four were
REUSE findings the tool caught in new prose, all in `beggar-my-neighbour`: the
rule sentence lifted nine words off pagat while stating the losing condition; a
seven-word run off Wikipedia in the new background's first line; and the alias
list, twice, which matched nine words of each source at once. **The alias case is
the interesting one.** Names are terms of art and rewording them would make the
entry wrong, so the run was broken by reordering the list and changing the
sentence around it rather than by touching a single name. Two more were caught by
re-reading rather than by the tool: a claim that the game is *named* for the
6-and-9 pattern, which no source says and which is probably backwards, and an ERS
background resting on facts read in the other entry's sources.

## Recorded, not acted on

- **`beggar-my-neighbour`'s alias "Draw the Well Dry" is unconfirmed.** Neither
  source has it. They do give Taxes, Suck the Well, Bataille Corse and Beat Jack
  Out Of Doors, none of which the entry lists as aliases. Nothing was changed in
  the `aliases` array: the alias sweep is
  [its own open piece of work](2026-08-11-alias-sweep.md) with 64 unconfirmed
  names already recorded, and this is one more for it. The confirmed names are
  now in the entry's `background` prose, so they are at least findable.
- **`egyptian-ratscrew`'s aliases "Egyptian Rat Slap" and "Slaps"** are close to
  but not the same as the sourced "Ratslap" and "Slap". Same disposition.
- **`beggar-my-neighbour`'s Jokers-in variant** — jokers ranked above the ace as
  pay cards worth five — is in neither source.
- **The dealing method.** The entry deals singly to twenty-six apiece; one source
  says only to divide the pack "roughly in half". Left alone: the end state is
  the same and neither is wrong.
- **Player caps.** `beggar-my-neighbour` caps at four and `egyptian-ratscrew` at
  eight; one source says only "more than two people" can play and another that
  the number "is limited only by each participant's ability to reach the central
  pile". Both caps are editorial and were left.
- **`egyptian-ratscrew`'s risk-slap strategy** — deliberately slapping the last
  card of a challenge on the chance it completes something — is set out at length
  in one source and is not in the entry. Not an error; noted as material a later
  pass could use.

## What this pass does not establish

Nothing about the 15 entries still carrying a 2026-08-03 stamp. Where the sources
disagreed — simultaneous slaps, what happens when a challenge answerer runs dry,
how long a cardless player may slap in — the entry now says so impersonally and
this record names the disagreement. The unconfirmed aliases, both Jokers
variants and the player caps are named above as resting on nothing read. The
originality tool cannot certify either entry clean, and the clean result for
`beggar-my-neighbour` is what a controlled tool finding nothing looks like, no
more. And the clean result on the shared pay-card counts establishes that those
four statements agree with these four sources — not that the counts are
universal; one source notes a version that reverses two of them.
