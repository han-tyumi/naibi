# 2026-08-10 — Ten audited: the last of the 2026-08-01 group

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-10

## What was checked

**13 entries, checked 2026-08-10**, in two sittings on the same day, and with
them the 2026-08-01 group is finished: no entry in the corpus rests on that
pass any longer. **Ten audited, ten faulty, a hundred and forty-three wrong or
unsupported statements between them.** Not one arithmetic error in either
sitting — that streak now runs to thirty-three entries.

The two sittings found the same shape twice over, and it is worth stating once
at the top: **eight of the ten had something wrong at the end of the game or in
which of two rules the source calls the base one.** Three had the ending wrong
outright; five more carried a documented variation as the rule while the rule
sat in the variants block underneath, in one case with the entry's own figure
repeating the error.

### First sitting — `concentration`, `go-fish`, `nertz`, `old-maid`, `slapjack`

Five audited, five faulty, seventy-three statements, two of them found on a
third read after the pull request was open.

**Three of the five had the end of the game wrong.** That is the shape worth
handing on, because an ending is the part of a rule set nobody re-reads: you
learn a game from the top and stop paying attention once you can play a turn.

- `go-fish` had the wrong game entirely from the middle onward. It made
  refilling an empty hand from the stock the base rule and had play continue to
  all thirteen books, then stated outright that "emptying your hand first is not
  a win condition and carries no reward". Both accounts end the hand the moment
  either the stock is exhausted or a player runs out of cards — and one of them
  gives the win outright to whoever sheds their last card first, which is the
  exact opposite of what the entry said. The play-to-thirteen-books version is
  real, and it is the alternative; it is now in the variants where it belongs.
  The entry also invented a seven-books-wins-outright rule that neither account
  contains, named the stock "the pond or the ocean" when both accounts call it
  the stock, and said there is no scoring beyond counting books when one account
  gives two schemes for it.
- `slapjack` had the wrong player leading after every captured pile. The winner
  of the slap turned the next card; pagat restarts from the player to that
  winner's left. It also carried an invented tie-break — leave the pile in the
  middle for the next jack — in the place where the source has a different rule
  altogether: a jack covered by the following card before anyone slaps is dead,
  and the pile is frozen until another jack appears. And it demoted a rule to a
  house convention, giving "the usual ruling" for a player with no cards who
  slaps a non-jack, where pagat simply says they are out.
- `nertz` made calling "Nertz" automatic on emptying the pile. Both accounts
  make the call optional and say in as many words that you may keep playing to
  improve your score first, which is the single largest decision the game
  contains. The entry also had a whole confident paragraph explaining that a
  stock which cycles fruitlessly is closed to you until something on your own
  side frees a card. It is not: when the whole table is stuck, everybody
  re-forms their stock and moves its top card to the bottom, which re-groups
  every triple — and you may not do it until everyone else is stuck too. Neither
  half of that was in the entry.

**A variant block described a different game again, and again it was the one
nobody re-reads.** `nertz`'s partnership game gave each partner their own Nertz
pile, work piles and stock, with partners able to play onto each other's piles.
Both accounts have a partnership share one pack and one layout — two people
working a single tableau, one on the stock while the other watches the Nertz
pile. It also set the threshold at four players where pagat says six, and its
"shorter Nertz pile" offered ten or twelve cards where pagat gives twelve or
eleven. `old-maid`'s Scabby Queen removed three queens; the source removes only
the queen of clubs, which leaves the two red queens to pair off and strands the
queen of spades. The three-queens detail is real and belongs to the 1831 rules
printed higher up the same page — the fourth time in three passes that a number
has been taken from the wrong paragraph of the right source.

Twenty-three of the seventy-three are prevalence claims — *most groups*, *the
usual ruling*, *widely played as a house rule*, *common enough in modern play*,
*the usual simplification* — attached to things no source ranks. Fourth batch
running as the largest single category.

Six more are attributions to places the sources never mention: Old Maid's joker
form given to Japan as babanuki, its random-card form to the Philippines as
ungguy-ungguyan, Black Peter given Scandinavian names and a drawn-on moustache,
and Go Fish's exact-card variation identified as Authors — which pagat describes
as Go Fish *without a stock*, and whose descent pagat explicitly says it cannot
establish, where the entry stated it flatly.

**Two corrections went into structured data rather than prose.** `slapjack`
carried `decks_by_players: {"6": 2}` and a `decks` string promising a second
pack from six players; neither account gives Slapjack a second pack at any
count, and one puts the game at its best with four to ten players on a single
pack. Both were removed, and the three facet tests that had been using slapjack
as their real-corpus fixture for a deck threshold now use `mau-mau`, which has
the same shape and whose prose and data agree. `old-maid` gained
`decks_by_players: {"7": 2}`, because Wikipedia's modern rules call for two
packs above six players and the entry seated eight on one.

## What the originality pass did and did not do

All five came back clear at the end, with two sources each. That is not a
certificate and is not reported as one: thorough paraphrase scores like
independent writing, and every one of the seventy-three statements above was found
by reading the fetched source beside the entry, not by the tool.

Three findings were worth acting on and **all three were introduced by this
pass**, not inherited. Correcting Nertz's deal to match the source's fact —
twelve down, the thirteenth up — pulled the source's sentence along with it, and
the same thing happened twice in Slapjack while rewriting the capture and the
covered-jack rule. Getting a fact right is exactly when the source's phrasing is
closest to hand. Re-run the tool after correcting facts, not only after writing
new prose.

The surviving inherited finding on `nertz` was the seven-word run "in the middle
of the table and", which the previous pass had judged a false positive without
clearing. Read against the source it plainly is one: the two sentences are about
unrelated things, one sorting card backs to score and the other quoting Pounce's
scoring rate. It was broken anyway, by writing "the centre", because ordinary
English is not game vocabulary worth protecting and a standing flag costs every
future pass a re-judgement.

**A control caught a broken control.** Bisecting an ORDER finding on `slapjack`
gave sixteen identical FLAG results, including for the known-clean original —
because the predicate tested for the string "ORDER", which appears in the
report's own trailing explanation on every run. The bisect was measuring
nothing. Re-run with a predicate that matched the finding lines instead, it
isolated the cause to a single paragraph in one field on the first try. The
finding was real and new: rewriting that paragraph to carry pagat's four-to-ten
player ranking had walked it into Wikipedia's sequence, and a third phrasing
carried the same fact without it.

## The third read found two more, one of them self-inflicted

Both after the pull request was open, which is the third batch running where a
pass after the PR turned something up.

- `nertz`'s partnership threshold was corrected from four players to six, and
  the correction dropped pagat's "**even number** of players from six upwards"
  while doing it. Partnerships need pairs; seven players cannot all have one.
  The original entry had the constraint and the wrong threshold, and the fix
  traded one for the other. Restored.
- `slapjack` quoted pagat's four-to-ten best range in prose while `players.max`
  said 8, so the page contradicted itself and the deck and player filters hid
  the game from tables pagat says it suits. `max` is now 10, which is what the
  source supports.

The first of those is the failure the brief predicts — about half of the defects
a pre-merge review turns up are damage the fix itself introduced. It is worth
noticing what caught it: not re-reading the entry, which had read fine twice,
but re-reading the *source sentence the correction came from* and checking that
every clause of it survived into the entry.

## What this pass leaves

**5 entries still carry `checked.date: 2026-08-01`** — `palace`, `snap`, `spit`,
`spoons` and `war` — and should still be assumed unverified. `palace` also
carries an unresolved REUSE finding from an earlier originality pass; its sources
were deliberately not fetched for this sitting rather than half-read. pagat files
it under Shithead, and neither "Palace" nor "Nertz" appears in pagat's A–Z index
at all — Nertz is reachable only via Racing Demon, and "Concentration" in that
index is a dominoes game, the card game being filed under Pelmanism.

One defect was found outside this pass's scope and is recorded here rather than
fixed blind: `bs` has `decks_by_players: {"6": 2}` while its `decks` prose
promises two packs "for five or more players". One of the two is wrong and
which one cannot be settled without re-reading its sources.

### Second sitting — `palace`, `snap`, `spit`, `spoons`, `war`

Five audited, five faulty, seventy statements, and a further nine caught on the
second read of which **eight had been introduced by the audit itself**. These
are the last five entries of the 2026-08-01 group.

**Four of the five carried a documented variation as the base rule.** In every
case the source names both forms and says which is which, and in every case the
entry had picked the wrong one and filed the real rule among its own variants.

- `palace` gave the seven its own paragraph in the rules — play a seven and the
  next player must go lower. Both accounts put that in variations; the base game
  has exactly three special things in it, twos, tens and four of a kind. The
  entry's "Simple Palace (no sevens)" variant was therefore describing the
  actual game as a simplification of itself, and the error had propagated into
  the entry's `figure`, which annotated the seven as "Forces low" — the fourth
  time a corrected fact has been found still alive in a table or figure.
- `war` gave three cards face down in a war. Both accounts give **one**, and
  both record the three-card form as the widespread variation. The famous
  version is not the rule.
- `spit` awarded the two centre piles by right to whoever emptied their row
  first. Both accounts make it a race — everybody slaps for the pile they think
  smaller — and one of them names the by-right form as its contributor's own
  version and says in as many words that slapping is more widespread. The entry
  carried the real rule as "Free-for-all slap".
- `snap` had a false call cost you one card to every opponent. Both accounts
  forfeit your whole face-up pile to the middle as a snap pool, where anybody
  can win it back. The entry's "Snap pool as the penalty" variant was the rule.

**Two rules pointed the wrong way.** `war` had only the tied players fight a
multiplayer war; both accounts say everybody joins in, and one carries a "Note
that..." sentence correcting exactly that misreading — so the entry contradicted
a line written to prevent it. `spoons` had players holding five cards and
shedding one; both accounts cap the hand at four and require you to pass before
you pick up.

**Two more arithmetic-adjacent slips, neither in a scoring table.** `spit`'s
Speed variant mixed the two configurations its source gives — a fifteen-card
stock with five-card centre reserves — which accounts for 42 cards of a 52-card
pack. And its short-layout example dealt piles of one, two, three and four from
twelve cards, losing two of them; the source deals into all five piles as far as
the cards go.

**`palace` and `slapjack` both carried an unsourced deck threshold in structured
data.** `palace` had `decks_by_players: {"5": 2}` and prose promising a second
pack from five players; one account has two to five playing on a single 52-card
pack and reaches six by adding two jokers, not a second deck. Removed, and the
joker route is now a variant. Nothing in the corpus referenced palace as a test
fixture, so nothing else had to move.

Seven statements attributed rules to places or names the sources do not: three
of `palace`'s seven aliases appear in neither account, `war` claimed "I Declare
War" as a name where both accounts record it only as the chant, and "Bataille"
appears in neither.

**The originality tool flagged ten runs worth acting on, and every single one
was introduced by this audit.** Five in `war`, three in `palace`, one each in
`snap` and `spit`. Last sitting produced three by the same mechanism and the
lesson was written into the handoff; this sitting produced ten, which suggests
the lesson needs to be stronger than a bullet point. Correcting a fact means
holding the source's sentence in your head while you write the replacement, and
that is the most reliable way there is to reproduce its clause order. The fix is
mechanical: after a fact-correction pass, run the tool and expect to rewrite.

Nine more were found on the second read, and **eight of them this audit had
introduced**: a ladder in `palace` that listed the 10 among the ordinary ranks
one sentence before saying the 10 sits outside them — and disagreeing with the
figure beside it; a claim that both accounts give `palace` player counts when
only one does; a forfeit given as tea in both accounts when the second says
drinks; `war` asserting that "many players" shuffle won cards when neither
account mentions shuffling at all; `spit` describing the smaller centre pile as
something a round win hands you, left over from the rule that had just been
corrected; and `spoons` claiming a big circle "is how most parties play it"
while its own `players.ideal` of 8 sat outside the four-to-seven range that is
the only ranking either account gives.

## What this pass leaves

Nothing from 2026-08-01. The record for that pass now covers zero entries and is
kept as history; `npm test` had to learn that a fully superseded pass states a
count the corpus has no key for, which is the one outcome the ledger check
previously forbade.

Still outstanding, found in an earlier sitting and still not fixed: `bs` carries
`decks_by_players: {"6": 2}` while its `decks` prose promises two packs "for
five or more players". One of the two is wrong and it needs its sources read.

### A third sitting — two re-reads, and a defect class nothing was checking

Not new entries. `bs` and `president` had both been audited on 2026-08-09, and
both carried the same kind of fault: `decks` prose and `equipment.decks_by_players`
naming **different** player counts for when a second pack is wanted. The two
fields say the same thing twice on purpose — one for the reader, one for the
filters — so when they disagree, a reader and a filter give different answers
and nothing fails.

- `bs` promised a second pack "for five or more players" in `decks`, said the
  same again in `setup`, and had a map starting at six. Wikipedia gives five
  explicitly ("games with five or more players generally combine two 52-card
  packs") and pagat gives no threshold at all, so the map was the wrong one of
  the three statements. Data-only fix; the prose was already right.
- `president` promised one "at about nine players" and had a map starting at
  eight, on a game that seats at most eight — so the map obliged an eight-player
  table to find a second pack that the prose said it would not need until nine.
  Neither account names a threshold at all: pagat plays "about 4 to 7 people
  using a standard 52 card pack", Wikipedia says three or more and usually up to
  six, and pagat's only two-deck mention is an aside inside an unrelated
  jokers-high variation. The claim is gone from both the prose and the data.

**The 2026-08-09 record says of `president` that "a second deck was said to be
needed past about seven players where the source says nine".** Re-reading both
sources, neither says nine — the only 9 anywhere on pagat's page is "everyone
gets 9 cards" in a six-player collusion variant. That pass corrected a wrong
number to another wrong number and recorded a source for it that does not exist.
The same record says an eleven-point target is something "neither account
mentions"; pagat ends its scoring section "set a target and the game ends when
someone reaches (say) 11 points". Both records stand as written — they are
history — and this is the correction.

Re-reading `president` in full to re-stamp it turned up one more: **`Daifugō` sat
in its `aliases`**. Both accounts call that the Japanese game President descends
from, and this entry's own variants block says exactly that. An alias is a name
for this game, so a search for the ancestor returned the descendant.

`president` also carried **two REUSE findings that the 2026-08-09 pass left in
place** — the card-exchange sentence following Wikipedia's wording, and a
rule statement matching pagat's. The verbatim threshold is a fixed seven words
and does not move with the corpus, so these were there on the day. Both
rewritten, along with one READ finding judged real.

**Five wrong or unsupported statements across two entries**, and neither entry
is counted again in the tally above, because both were already counted as
audited and faulty on 2026-08-09.

`npm test` gained a check for the class: it reads a threshold out of `decks`
prose where the phrasing allows and compares it with the lowest key in the map.
It judges seven entries and **names the six it cannot read** rather than passing
over them quietly — per-player games, and prose written as a table of ranges.
If a new entry joins that unreadable set, the test fails and asks for it to be
checked by hand.

### A fourth sitting — one new entry, `bezique`

Not an audit. `bezique` was written for this collection from two sources and
stamped the same day, which is why it appears in this record rather than in one
of its own: the ledger keys a pass by date, and this is the same date.

It is the entry the candidate list had been calling the conspicuous gap, and it
was worth doing while `pinochle`, which descends from it, was fresh — the
two-handed forms of the two games are nearly the same shape, and one account
says so outright.

**pagat's own Bezique page carries no rules.** It is a stub: origin, a
one-sentence summary of the pack, and a list of links elsewhere. Taking it as a
source would have meant writing the entry from Wikipedia alone while recording
two. The rules live on a second pagat-hosted page, an archived copy of Howard
Fosdick's write-up, reachable only from a link on the stub. Both were fetched and
concatenated into the one `pagat.txt` the stamper expects.

That page is written as **differences from Marjolet**, a related game described
directly above it, so every base rule — the draw, the close, the meld mechanics —
had to be read out of the other game's section and then checked against
Bezique's list of what changes. It is the "value scheme borrowed from the variant
below it" hazard with the polarity reversed, and it is the reason this entry took
two sources and three readings rather than two.

Two of the sources' own corrections are worth noting, because they are the kind
of thing that would otherwise have been copied straight in. pagat's editor has
annotated the Fosdick page twice: once to correct meld values that had been given
Bezique's numbers while describing Marjolet, and once to record that a scoring
rule traces to an error in Parlett's *Oxford A-Z of Card Games* that the same
author corrected in a later book. The second of those decides who scores for a
particular trick.

**Wikipedia contradicts itself on the last trick.** Its scoring table awards 10
for the last trick *before* the final eight, while its own play section gives the
10 to the winner of the final trick — and pagat agrees with the prose and says
in as many words that the trick ending the first phase scores nothing. The entry
follows the two statements that agree and says the disagreement out loud.

Everything else the two sources state, they state alike: the 64-card pack, the
rank order with the ten second, the deal in packets of three, two and three, the
whole meld schedule from 20 up to 500, and 1,000 as the target.

The originality tool flagged four findings on the finished draft and **all four
were mine**, which is now the expected outcome rather than a surprise: two
verbatim runs on the trick-taking rule and the no-follow-suit rule, one short
sentence almost word for word, and an ORDER finding of nine points at 88% across
`setup` — the section the 2026-08-01 pass already identified as the one that
reaches for the source's sequence, because dealing a game has a natural order.
Reorganised rather than reworded: the rank oddity now leads, since it is what a
new player most needs, and the turned-up seven moved down to sit with the rest of
the dix rules.

A second read caught **two prevalence claims**, both mine — Rubicon called the
form competitive play settled on, and the six-pack game called what people mean
when they say they play seriously. Neither source ranks either. What one of them
does say is which forms are still played and where, which is what the entry says
now.

### The third read of the second batch, and of `bezique`

The first batch of the day got three reads and the third found two errors. The
second batch and `bezique` had shipped on two, so they got the missing one. This
records what that consisted of, because "read again" is not a procedure.

Four checks, all mechanical enough to be repeated:

- **Every claim about what a source says.** Thirty-one across the six entries,
  each traced back to the sentence behind it. The *both accounts* claims matter
  most, because one is wrong the moment only one account says it — that is how
  two errors got into these entries earlier in the day.
- **Every number, against the source or against arithmetic.** All twelve values
  in `bezique`'s `scoring_table` appear in the source text, and its prose agrees
  with its own table. Its two derived figures check out: 64 cards less sixteen
  dealt and one turned up leaves 47 in stock, which with the turn-up is 48 cards
  drawn two to a trick, so the first phase runs 24 tricks and the whole hand 32 —
  64 cards, which is the pack. Eight aces and eight tens make 160 points of
  brisques.
- **Prose against structured fields.** Player ranges, deck counts, durations and
  difficulty against what the prose claims.
- **Figures against prose.** This is where a corrected fact was found still
  alive earlier today, in `palace`.

**One finding, in `war`.** Its three-cards-down variant said the three-card war
is "the version most people know". Both accounts say *many* players do it. That
is an escalation from many to most, in the category that has been this project's
largest for four batches running, and it was written by the same pass that
removed a dozen others. Corrected to what the sources say.

Everything else held. That is a useful result rather than a wasted pass: it is
the first time this session that a read has come back with the entries in better
shape than the reader.

### A fifth sitting — one new entry, `solo-whist`

Not an audit either. Written from two sources and stamped the same day, so it
belongs to this record for the same reason `bezique` does. It closes the gap
`bezique` left: the candidate list had named Solo Whist as the last conspicuous
absence in trick-taking, which now stands at 21.

**The A-Z index earned its warning again, in a new way.** `pagat.com/alpha.html`
answers **301** and the extractor read the redirect stub as the page — 276 bytes
of "Moved Permanently", from which a search for "Solo Whist" returned nothing at
all. That is indistinguishable from "the index does not list it", which is a
real outcome for two entries audited earlier the same day. Following the
redirect to `/alpha/` gives 1,635 links and the game is there. Ninth instance of
the silent-failure class this session and the first where the scaffold was a
single missing `-L`.

The index also has three separate "Solo" rows pointing at three unrelated games,
and Solo Whist is filed under `/boston/`, not `/whist/` — so the URL a reasonable
person would guess is a 404 and two of the plausible index rows are the wrong
game. The page's own title, read before anything else, says `Solo Whist - card
game rules`.

**Wikipedia's rules are in a table its API does not return.** `prop=extracts&
explaintext=1` drops wikitables silently, so the extract carries a Bidding
section with no bids in it — the second source would have contributed nothing to
the eight contracts and their values, while still being recorded as consulted.
Fetched the article HTML separately for the table. Both accounts then agree on
every unit value: 1, 1, 2, 3, 3, 4 and 6, which Wikipedia states as the totals
across three opponents and pagat as the amount each one pays.

Three things the two accounts do not agree on, all of them said out loud in the
entry rather than resolved silently:

- **A proposal nobody accepts.** One throws the hand in; the other first offers
  the proposer the chance to raise to a solo or better. This changes what a
  speculative prop costs, so it is a rule to settle before dealing.
- **The cyclic trump order**, for tables that drop the turn-up. One gives
  hearts, clubs, diamonds, spades; the other hearts, diamonds, clubs, spades.
- **When the game reached Britain.** 1852 with an importing family named, or
  vaguely the late nineteenth century.

Two source defects were found and neither was carried in. pagat's alternative
scoring schedule is garbled where the solo figure belongs — "prop & cop 2; solo;
2 misère 3" — and gives no figure at all for an abundance in trumps; the entry
states the values that are legible and says the other two have to be agreed at
the table, rather than repairing a source's typo and presenting the repair as a
fact. And Wikipedia's bid table gives Abundance Declared the hand-exposure
clause word for word from its own Misère Ouverte row, which pagat contradicts
and Wikipedia's own prose does not repeat. The entry follows pagat.

**The originality tool flagged four verbatim runs and an ORDER finding, and all
five were mine.** Sixth pass running where every finding was introduced by the
writing rather than inherited. Two of the four were the same sentence about who
leads to the first trick matching both sources at once, at eleven words and
seven — that sentence has one obvious English form and it took a deliberately
different one to get out of it. The ORDER finding was `background` walking
Wikipedia's History section in Wikipedia's order, which is chronological, so the
fix was to organise the paragraph around what the two accounts disagree about
instead of around the timeline. Reorganised, not reworded, and it cleared.

One READ finding was left standing and is a false positive of the documented
shape: a ten-word list item for *abundance in trumps* matched against pagat's
table row for a *different* contract, sharing only "alone" and "the suit turned
up", which is the game's own vocabulary for the turn-up.

**The second read found three over-claims, one of them structural.** Two
sentences called a disagreement "the one place" and "the one thing" the accounts
differ — in an entry that names three disagreements in three different fields.
An absolute is a prevalence claim wearing a different hat, and it is wrong for
the same reason. The third: the ladder listed Cop between Prop and Solo under
"from lowest to highest", which reads as though accepting a proposal outbids it.

**One defect was introduced by a fix and caught by re-reading the result.** A
substitution meant to replace "solo contracts" with "single-handed contracts"
matched at a line break and produced "one of the solo single-handed contracts".
It validated, it rendered, and it would have shipped. Fifth time this session
that repairing something broke something, and the second where the repair was
mechanical rather than editorial.

`whist`'s own Solo Whist variant was cut back to a summary that points at the
new entry, using the cross-reference wording `golf-multiplayer` and
`texas-holdem` already use. Its four claims were checked against the sources
first and all four held; the trim is to stop two entries carrying the same bid
ladder, not to correct one. `variants` is outside the prose fingerprint, so
`whist` keeps its 2026-08-03 check.
