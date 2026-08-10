# 2026-08-10 — Five audited: the children's games, where the endings were wrong

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-10

## What was checked

**5 entries, checked 2026-08-10** — `concentration`, `go-fish`, `nertz`,
`old-maid` and `slapjack`, the first five alphabetically of the ten survivors of
the 2026-08-01 group, each read against pagat and Wikipedia with the fetched
text open. **Five audited, five faulty, seventy-one wrong or unsupported
statements.** Nothing arithmetic failed again: the 25 pairs left by a missing
queen, the 26 pairs in a full pack, the thirteen books of four, Nertz's
thirty-five-card stock and its one-point-per-card-less-two-per-Nertz-card
scoring are all exact. What failed was the prose around them, and this batch
concentrates it in one place.

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

Twenty-three of the seventy-one are prevalence claims — *most groups*, *the
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
independent writing, and every one of the seventy-one statements above was found
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
