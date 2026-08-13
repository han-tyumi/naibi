# 2026-08-13 — Speed and Fan Tan: a deal that varies, and a name that is not the bead game

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-13

## What was checked

**6 entries, checked 2026-08-13** — the day's total across all three records of
the date, not this sitting's. `pyramid` and `clock` were read earlier the same day
and are recorded in
[2026-08-13-pyramid-and-clock.md](2026-08-13-pyramid-and-clock.md); this sitting
read `speed` and `fan-tan`; a third read `tien-len`, recorded in
[2026-08-13-tien-len.md](2026-08-13-tien-len.md), which sorts last of the three.

**Two audited, two faulty, twenty-six wrong or unsupported statements between
them** — fifteen in `speed` and eleven in `fan-tan`. Six further rules the
sources give and the entries lacked are named separately below, and are not
counted in the twenty-six.

**5 entries remained on 2026-08-03 when this sitting ended**: `accordion`,
`five-hundred`, `koi-koi`, `teen-patti`, `tien-len`. A third sitting the same day
took `tien-len` and left four.

Sources, read with the text open: `speed` against
[Wikipedia](https://en.wikipedia.org/wiki/Speed_(card_game)) and the *Speed —
version with five-card hands* section of
[pagat's Spit page](https://www.pagat.com/patience/spit.html); `fan-tan` against
[pagat](https://www.pagat.com/layout/sevens.html) and
[Wikipedia's *Domino (card game)*](https://en.wikipedia.org/wiki/Domino_(card_game)).
`speed` gained `Pagat` in `sources_consulted`, which it did not carry; `--stamp`
refuses a source file it cannot match, so that had to be fixed before it could be
stamped. **That guard has now fired in three consecutive sittings.**

## The pairing, and what it was worth

`speed` was read against `spit`, which was audited on 2026-08-10 against the same
two sources. It is the only cross-check left in the corpus with anything behind
it: the two entries share the corpus's only duplicated alias, and `speed`'s
mapped source is a *section* of `spit`'s page rather than a page of its own, so
both entries were written from the same two documents.

**Three of `speed`'s findings came out of that comparison and could not have come
from inside `speed` alone.** In each case `spit` states the fact correctly and
`speed` does not:

- `spit`'s Speed variant carries **both** documented deals — "two piles of ten
  with the two starting cards between them, and a stock of 15 in front of each
  player" and "Some play it the other way round, 20 in each stock and only five
  in each centre reserve" — where `speed` gave the second flatly as "the standard
  game".
- `spit`'s Speed variant carries the **margin score** — "scoring a point for
  every card your opponent still holds; the first to an agreed total, say 25,
  wins" — where `speed` said "there is no point scoring in the basic game" and
  filed the margin as an optional extra.
- `spit` states the **no-retraction** rule correctly — "A card is played the
  moment it makes contact with the pile. There is no taking it back" — where
  `speed` had invented a take-back: the loser of a race "picks their card back up
  and returns it to hand".

`spit` needed no change and was not touched; its 2026-08-10 stamp stands. A
pairing whose payoff is entirely one-directional is still a payoff, and this one
found three things no amount of care inside `speed` would have surfaced.

`fan-tan` has no pair and was read alone, which is stated here rather than
justified: nothing else in the corpus shares its layout mechanic, and pairing it
on the shedding category would have bought a comparison with `palace` and
`mau-mau`, both of which use "Sevens" only as the name of a rule about the rank
seven. That was checked by grep before giving up on a pair.

## `fan-tan`'s mapped source was the right one, and reading was the only way to know

The source map records `fan-tan` as the first documented failure mode — the card
game (Sevens, Parliament, Domino) shares its name with a Chinese bead-and-cup
gambling game — so which game the page describes was settled before a word of it
was read for rules. Both pages are the card game: pagat's opens "A standard
international 52-card pack is used" and gives the sevens as the cards that start
a row; Wikipedia's is titled *Domino (card game)* and describes the same layout.
Neither mentions beads.

Worth recording that **the title readback would not have settled it.** pagat's
page titles itself `Fan Tan / Sevens - card game rules`, which names the game and
says "card game" outright — and a page honestly about the bead game could title
itself `Fan Tan` just as cleanly. What settled it was the second paragraph.

The entry's own name warning turned out to be the more interesting find. It
warned about the bead game and said nothing about a **second card game** printed
under the name Fan Tan: one that opens with the aces, deals the leftovers into a
stock you draw from when you cannot enter, and builds each suit in one direction
only, ace up to king. One source gives it in full. The warning now covers both.

## `speed` — fifteen

1. **The deal was given as "the standard game" and two deals are documented.**
   The entry: 20 cards to each player, 15 as a draw pile and 5 as a hand, with
   the remaining 12 in the middle as two stacks of five and two single cards. One
   source gives that deal in its main text. The other gives a different one in
   its main text — ten cards at each end of the middle and fifteen to each
   player — and files ours in a parenthesis as "(Some play with 20 cards in each
   stock instead of 15…)". The same source then says outright that **"the actual
   number of Stock Cards and Spit Cards can vary"**. The entry now gives both and
   says what the difference costs. `goal_and_scoring` had hard-coded the same deal
   as "all twenty of your cards", so the correction had to be made twice.
2. **Who owns which side stack was invented, and it was live in the layout
   caption too.** "The usual convention is that you own the stack at your
   left-hand end." Neither source assigns the ends at all; both say only that a
   card is flipped from each end at the same moment, which requires the two
   players to be on different ends and says nothing about which. The caption
   carried the same claim in ten words and is the reason this is worth listing as
   one finding rather than two — the diff shows one sentence changed unless you
   look at the drawing.
3. **A take-back rule the sources contradict, under a prevalence marker.** "The
   standard convention is that the card underneath wins: whichever card
   physically landed first counts, and the other player picks their card back up
   and returns it to hand." One source: "A card counts as played as soon as it
   touches the pile… A played card cannot be retracted and as soon as it is
   played the opponent is entitled to play on it." Nothing comes back to hand.
4. **"There is no point scoring in the basic game."** One source's base
   description of Speed ends with the score: a point for each card in the
   opponent's hand and stock pile, first to an agreed total, twenty-five given as
   the example. **Our base rule denied a rule that the source states flatly, and
   our optional extra was that rule.** This is the `golf` shape exactly — read
   the entry's hedges first.
5. **"Anything still in the other player's hand is irrelevant; there is no
   consolation for being close."** Made false by the finding above: under the
   score the source gives, what the loser still holds is precisely what the round
   is worth.
6. **Two prevalence claims about how a match is arranged.** "Speed is nearly
   always played as a match" and "best of three or best of five is the usual
   arrangement". Nothing counts matches. The sources give one target, and it is
   an agreed score rather than a number of rounds.
7. **A claim that is backwards.** "Late in a round the middle is thin because
   most of the pack is sitting in the losing player's hand and draw pile." In
   Speed every card played goes *into* the middle and nothing comes back out —
   one source says so directly, "All cards will end up on the table and out of
   hands of the players if there are no mistakes". The middle is at its fattest
   late in a round. The sentence is Spit's logic, where cards do flow back to the
   players, and it looks like it walked across from the neighbouring entry.
8. **The reshuffle procedure was in neither source.** The entry: "gather the two
   centre piles, shuffle each one, set them face down as new side stacks, and
   turn one card from each into the middle to start two fresh build piles." One
   source keeps the top card of each centre pile where it is and shuffles
   everything under both of them into new reserves; the other shuffles each
   centre pile individually into a side pile and leaves the middle for the next
   flip. Ours discards the two showing cards and turns two new ones, which is
   neither. The entry now gives both accounts.
9. **"In some regions this game is called Spit or Slam."** Spit is well
   supported — the two games share a page, and one source says the difference
   between them is the arrangement of the stock piles. **Slam is in neither
   source**, and it is `speed`'s only alias.
10. **"Most players fall into a rhythm of play a card, draw a card."** Nothing
    counts players. The rhythm follows from the rule and is now stated that way.
11. **"Jokers are the standard escape hatch for a hand that has gone dead."** The
    source supports the *tactic* — "It is often prudent to save a joker in one's
    hand for when one is otherwise out of options" — and ranks nothing.
12. **"It is the single most common source of mid-game arguments in Speed."** On
    the no-ace-wrap variant, which is in neither source. A superlative about the
    frequency of arguments, attached to a rule nothing read describes.
13. **"It is a common way to level the field between a fast player and a slower
    one."** On the refill-when-empty variant, also in neither source. The
    variant stays — an unverified rule is not a finding — and the prevalence
    marker is gone.
14. **"It is the harder of the two."** Comparing Spit to Speed. Neither source
    ranks them. Replaced with the constraint that actually differs: five
    available cards against a hand you can hold and reorder.
15. **"That is 18 cards in the middle."** In the three-player variant, where 15
    of those 18 are side stacks sitting in front of each player. The same
    sentence hid a second problem: the source's three-player deal says "it is
    unnecessary to have extra cards" and then deals the remainder evenly, and
    **34 does not divide by three.** The entry's fix — add the two jokers to make
    36 — is the entry's own and is now presented as one of two options rather
    than as the rule.

**Six rules and variants the sources give and the entry lacked**, all of which
change what happens at the table: the hand is **held concealed** from the
opponent, which is the difference from Spit that the entry's own Spit comparison
turns on; a jam is only a jam **once both hands are back up to five**, so you
cannot reach for a side stack over an empty slot; **failing to announce the win**
carries a penalty in one account — the winner picks up a centre stack and carries
on; **a joker cannot be the card you go out on**, and since a joker is always
playable, flipping a side stack while holding one is cheating; a **same-rank
play** is legal in one account, which names the form **Doubles** — added as a
variant; and **one deck also works at four players**, which the same source
recommends for new or young players, and which is the reason `decks_by_players`
was left off rather than set to `{"4": 2}`.

**The arithmetic came through clean, as it has all audit long.** Both deals total
52. The three-player variant's 18 outside the hands and 36 in them, the
four-player variant's 104 less 24 leaving exactly 80 at 20 each, the 11-card spit
pile in the Spit comparison, and the ace-wrap example on a 9 and a queen are all
right. So is the joker count once made exact: 54 cards, draw piles of 16.

## `fan-tan` — eleven

1. **"Ask for Sevens, which is what most tables call it anyway."** Neither source
   ranks the names. One gives "Fan Tan (US) or Parliament (UK)"; the other opens
   "Fan Tan, also known as Sevens or Domino and in Britain sometimes as
   Parliament". Nothing says which is commonest. The advice to ask for Sevens
   stands on its own without the count.
2. **Invented geography on the named-seven variant.** "The seven of hearts is the
   usual nomination in Britain and Sweden, the seven of diamonds in some American
   descriptions, and the seven of clubs in Finland." Sweden and Finland are
   right — Sjuan and Ristiseiska. **Britain and America are in neither source**:
   the seven of diamonds appears as "in some versions" with no nationality, and
   the seven of hearts belongs to the Swedish and Indian games and to the base
   Sevens variant. Corrected to what the sources name.
3. **"The standard four-player game in Spain."** On Cinquillo. The source gives
   the deck, the fives as the start cards and the five of oros as the first card,
   and says nothing about a player count or about being standard.
4. **"The Japanese form, and the most-changed of the family."** A ranking across
   variants that nothing supports, and one the sources argue against if anything:
   the Spanish game changes the deck and the start rank, and a German relative is
   played with custom cards numbered 1 to 20.
5. **A claim that is false, in the ace-low variant.** "The ace stops being a card
   that can strand you at the far end of a row and becomes just another awkward
   extreme." With the ace low the ace *is* a far end — the bottom of the row
   instead of the top. What actually changes under a tally that prices the ace at
   fifteen is that the dearest card in the pack no longer sits at the same end as
   the courts. The entry now says that instead.
6. **The prohibition on passing with a playable card was absolute.** It is the
   rule in both sources — "It is illegal to pass if you hold a card that could be
   played to the layout" — but one of them also records versions in which
   "players are allowed to pass even when they are able to play a card". That
   changes the entry's own strategy paragraph from something you have to get away
   with into ordinary play, so it is named.
7. **Shichi Narabe's fourth pass given flatly.** "You may pass three times, and
   on the fourth you are out." Three passes is the rule; the fourth-pass
   elimination is "In some variations" in the source. Hedged.
8. **"The version Hoyle prints", twice.** The source says "In some editions of
   Hoyle". Both instances corrected. The Hoyle attribution itself is sound, and
   so is the association of the name Play or Pay with the pool version — what was
   dropped is the entry's further claim that the pool version is *the reason for*
   the name, which no source explains.
9. **The ace at fifteen given flatly where accounts differ.** Two passages price
   the ace at fifteen and the courts at ten; two others price the ace at one. The
   entry now says so, and the sentence that reasons from the ace being dear is
   now conditional on the tally that makes it dear.
10. **"Holding a seven back is the strongest thing you can do."** A superlative
    over the game's tactics. One source supports blocking as a tactic — "It often
    makes sense for players to avoid playing cards close to Seven" — and ranks
    nothing. Replaced with the mechanic, which is what the reader needs: you can
    only hold a seven while some other card of yours is playable.
11. **"Five or so is the sweet spot."** Vague where a source is exact: one puts
    the best game at four to six. Stated with the attribution it has, because
    only one of the two sources judges it at all.

**Everything else in `fan-tan` came through.** The clockwise deal and play, the
deal moving left, the uneven hands at anything but four players and the reason
they do not matter, the ace-high ranking, the 13×4 grid and the advice to pile
high cards on the eights and low on the sixes, the must-play rule, the winner
being the first to shed, and the whole `scoring_table` — ante, a chip for a pass,
the pool to the winner, a chip per card left — are all in the sources as given.
The figure is right too: a row round its seven, the two cards that extend it, and
the two that cannot go yet.

## The originality pass, run after the fact fixes

**`fan-tan` clean. `speed` carried two READ findings, both judged false
positives**, and both the same shape: a seven-word generic source sentence
contained inside a much longer sentence of ours. "Two cards can be put down at
once" scored 80% against our worked example about a 9 and a queen, and "Only one
card can be placed at a time" scored 80% against our hand-limit rule, whose
shared run is "one card at a time" — vocabulary the collection already keeps
deliberately. Neither shares a clause order with anything.

Both fetch tools were controlled in both directions before anything was read: an
invented Wikipedia title returns an explicit `missing` marker in 107 bytes, an
invented pagat path answers 404 with a 236-byte body titled `404 Not Found`. The
fetcher was then controlled on those same invented targets and **refused both,
writing nothing** — it will not accept a non-JSON Wikipedia body, requires two
fetches to agree on byte count, and deletes rather than keeps a file it rejects.
All four sources agreed with themselves twice: 8,849 and 10,385 bytes for
`speed`, 4,498 and 10,789 for `fan-tan`.

**The checker was controlled per entry against each of the four source files by
planting a copied sentence in each**, every plant well past the seven-word
verbatim bar. All four came back correctly attributed: 37 words off Wikipedia and
28 off pagat for `speed`, 24 off pagat and 21 off Wikipedia for `fan-tan`.

**Five claims introduced by this sitting's own corrections were caught before the
stamp.** That is the eleventh sitting running for this failure mode, and it is
worth naming them because none was the tool's finding — the tool does not read
facts, and four of the five are in fields it does not read at all:

- "It and the king are the two dearest cards in the pack", written to fix
  `fan-tan`'s ace-tally finding. The king is not uniquely second-dearest; the
  queen and the jack tie it at ten. Fixed to name the ace alone.
- "Some accounts nominate the seven of diamonds instead" — a plural doing
  prevalence work on a one-of-two, which is the sub-case the handoff names
  explicitly. One account gives it.
- "Some accounts deal only 15 to each player", in `speed`'s new deal paragraph.
  One does.
- "Nothing else about the game changes", of the two deals. False: ten reserve
  cards at each end last twice as long as five before the middle has to be
  rebuilt, which is the one thing that does change.
- "Nothing settles which end is whose" — a negative claim about the sources,
  which is the error category that is easiest to write and easiest to disprove.
  Replaced with the instruction.

## The thirty percent, measured on these two entries

The checker reads `setup`, `play`, `goal_and_scoring` and `background`. This
sitting wrote a great deal of new prose into variant descriptions and a layout
caption, which nothing reads — the failure mode the corrections above are the
eleventh instance of, in the fields least able to catch it. So **the same
comparison was run by hand over every field outside `PROSE_FIELDS`** for both
entries: variant descriptions, the layout caption, figure captions, figure row
labels, card notes and scoring-table notes. 25 passages, 6,545 characters, at the
same measured bar.

**One finding, the same generic false positive** as the two above. And the
comparison was controlled the same way before its silence was believed: a
sentence planted in `speed`'s first variant description came back as 15 words off
pagat, one in `fan-tan`'s as 17 off Wikipedia, both correctly attributed.

That is a check on two entries out of eighty and it is not a substitute for the
decision in
[the thirty-percent spec](../specs/2026-08-12-the-thirty-percent-outside-the-check.md).
It does establish that the work is cheap — a 40-line script over the existing
`compare()` — which is one input to that decision. The figure `npm run validate`
reports rose from 223,551 to 225,767 characters this sitting, because the fixes
above added variant prose. **Correcting an entry grows the part of it nothing
checks.**

## Reading the rendered pages, which caught two things the diff cannot

Ninth consecutive sitting in which this step paid. Neither finding is in the
prose; both are on the page.

- **`speed`'s page header states "Also known as: Slam"** — directly above prose
  that, after this sitting, does not mention Slam anywhere, because it is in
  neither source. The entry now declines in its own text to support the name its
  header asserts in the first line a reader sees. The field was left alone
  deliberately: `spit` carries the same alias, is stamped 2026-08-10, and cannot
  be touched without invalidating that stamp, and the validator reports the pair
  as kept on purpose so both games stay findable. So the disposition is the alias
  sweep's, and this is what it looks like from the reader's side rather than from
  the field's.
- **Both pages' footer reads "Rules checked against:" and then lists
  `sources_consulted` in full.** For `speed` that is eight names, of which two
  were read this pass and are what `checked.sources` records; `CONTRIBUTING.md`
  already notes that one of the other six, Gambiter, "returns a byte-identical
  8 KB page for unrelated URLs". The field is attribution and the renderer prints
  it as a claim about checking. **This is corpus-wide and predates this sitting**,
  it is on all 80 pages, and it is the one place where a reader is told something
  stronger than `checked` supports. Not changed here — it is renderer wording, not
  data — and named as open work.

Two things were checked on the page and were right. `fan-tan`'s header prints
"best with 5" from `players.ideal` above prose that now says four to six; 5 is
inside that range and a single number is what the field is defined to hold, so
the two do not disagree. And the corrected layout caption reached the generated
drawing — `rendered/diagrams/speed.svg` carries "takes charge of the side stack at
one end", not the ownership claim it replaced.

Every phrase corrected in either entry was then grepped across all of `rendered/`
and `site/`. **Nothing survives.** The only hits were two unrelated uses of "no
consolation" — `oh-hell` on overtricks and `koi-koi` on round scoring — neither of
which is the sentence this sitting deleted from `speed`.

## Recorded, not acted on

- **`speed`'s alias "Slam" is in neither source**, and neither is `spit`'s. It is
  the corpus's only duplicated alias and the validator names it on every run.
  Left for the alias sweep, which is where the aliases live; the unsupported
  claim in `speed`'s prose was fixed, so the field now outruns the prose — see
  the rendered-page section above for what that looks like to a reader.
- **The renderer prints `sources_consulted` under the heading "Rules checked
  against".** Corpus-wide, on all 80 pages, and the one line on a page that
  claims more than `checked.sources` supports. Renderer wording rather than data,
  so it is open work rather than a finding against these two entries.
- **`fan-tan`'s alias `Sjuan` is a variant's name, not the game's.** One source
  gives it as "the Swedish variant known as Sjuan". The same source gives
  `Domino` and `Spoof`, which the entry does not carry. Alias sweep.
- **`speed`'s "Refill only when empty" and "No ace wrap" variants are in neither
  source**, and so is the per-round-win scoring. All kept with their hedges, per
  the rule that deleting an unsourced-but-plausible claim leaves the entry no
  better and the record no honester.
- **`speed`'s deal procedure rests on nothing read** — who deals, alternating it,
  and that it confers no advantage. So does the advice to put the draw pile at
  your right hand.
- **One joker rule was not used because it could not be understood.** "Once a
  joker is placed, the player that is quick enough to put down the next card
  claims that joker." Left out rather than guessed at.
- **One deck at four players has no layout in the source.** It is recommended and
  not described, so the entry reports the recommendation without inventing the
  numbers.
- **`fan-tan`'s Chinese bead-game warning is in neither source.** True, and
  resting on nothing read here. Kept.
- **`speed`'s Spit variant still says Spit is "in some places simply another name
  for this game".** Neither source read today states that of Speed and Spit,
  though both treat them as one subject and one source records both names being
  used for a third game. `spit`'s own entry carries the same claim from its
  2026-08-10 reading against the same two sources. Kept and named here rather
  than removed.

## What this pass does not establish

Nothing about the 5 entries still carrying a 2026-08-03 stamp. Where the sources
disagreed — the deal, the reshuffle, the price of an ace, whether a pass at will
is allowed — the entries now say so impersonally rather than choosing, and this
record names the disagreements. The variants and procedures named above rest on
nothing read.

The originality tool cannot certify either entry clean: thorough paraphrase
scores like independent writing, and `fan-tan`'s clean result and `speed`'s two
false positives are exactly what a controlled tool finding nothing looks like.
The hand comparison over the other 31% of each entry's prose establishes the same
kind of nothing, over passages that had never been compared against a source at
all.

And the strongest thing this sitting had is now spent. `speed` and `spit` were
the last pair in the corpus that could be read against each other on anything
better than a shared category; three of `speed`'s fifteen findings came out of
that reading, including the one that mattered most. The five entries left have no
such pair, and the next sitting should say so plainly rather than manufacture
one.
