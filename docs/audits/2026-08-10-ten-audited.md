# 2026-08-10 — Ten audited: the last of the 2026-08-01 group

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-10

## What was checked

**10 entries, checked 2026-08-10**, in two sittings on the same day, and with
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
