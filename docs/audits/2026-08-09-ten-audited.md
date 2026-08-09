# 2026-08-09 — Ten audited: rules that point the wrong way

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-09

## What was checked


**12 entries, checked 2026-08-09**, in four groups. The first six are `mus`,
`briscola`, `big-two`, `casino`, `seven-card-stud` and `truco`, the six densest
survivors of the 2026-08-01 group, read against pagat and Wikipedia with the fetched text open. **Six
audited, six faulty, fifty-seven wrong or unsupported statements.** No entry in
this batch came back clean, and the reason is visible in what the errors were.

Nothing arithmetic failed. Every stone value in mus, every card point in
briscola, every penalty tier in Big Two, the eleven casino points, the whole
stud limit structure and both truco ladders are exact. What failed, again, was
everything around the numbers, and this batch adds a category the earlier ones
had not isolated: **a rule stated the right way round but pointing the wrong
way.**

- `big-two` had play running clockwise where pagat says anticlockwise; the deal
  passing round the table where the winner deals; the three of diamonds opening
  only the first deal, where it opens every deal and the alternative is the
  variation; and a pass costing you the whole round as the main rule, where that
  is the Indonesian rule and the ordinary one costs a turn. It also declared
  A-2-3-4-5 and 2-3-4-5-6 not to be straights when they are the two lowest, and
  defined a dragon as twelve ranks when it is thirteen.
- `mus` described the four-king variant as removing the threes and twos and
  substituting eights and nines. Both sources say the pack is unchanged and the
  threes and twos simply count as themselves — and a Spanish forty has no eights
  or nines to substitute, which is the kind of thing a second look catches and a
  first one does not.
- `briscola` attributed a last-three-tricks follow-suit obligation to Spanish
  Brisca. Spanish Wikipedia says Brisca does not oblige you to head a trick at
  all; English Wikipedia puts that obligation on Briscolone. The rule was real
  and filed under the wrong game.
- `truco` said the malas/buenas split "is not bookkeeping". pagat says in as many
  words that it is traditional and has no effect on the play. It also had the
  mano's *side* winning every tie, where priority runs seat by seat from the mano
  and can hand a tie to an opponent — the same over-claim then turned up in `mus`
  on the second read, which is how it was caught.
- `casino` said most spades cannot be tied. Thirteen is odd, so two sides cannot
  tie it — but three or four playing separately can, and pagat's Royal Casino page
  says so explicitly. It also put sweeps first in the count-out order where the
  source puts them last.
- `seven-card-stud` had the deck-exhaustion remedy as "the dealer stops burning".
  Both sources say the burned cards are fetched back and shuffled in, which is a
  different mechanic and changes which player counts force a community card.

Twelve of the fifty-seven are prevalence claims — *most tables*, *the tournament
convention*, *commonly*, *widely used in* — attached to things no source ranks.
That is the third batch running in which they are the largest single category,
and they are cheap to write and invisible to every check in the repository.

**The one to hand on: an entry can invert a rule and still read perfectly.**
None of these six looked wrong. Big Two's play direction, mus's four-king pack
and Big Two's pass rule are all fluent, plausible and confidently stated, and
every one of them is backwards. Reading the entry will not find them. Only
reading the source next to it will.

The second group of four is `contract-rummy`, `rummy-500`, `bs` and
`crazy-eights` — the rules-heaviest of what was left. **Four audited, four
faulty, forty-five more wrong or unsupported statements.** Still nothing
arithmetic: what broke was again the surrounding prose, and in the two rummies
it broke in the same place twice.

- Both rummies had a **card value scheme from the wrong game**. `contract-rummy`
  scored every non-court card at a flat 5 where pagat and Wikipedia both say pip
  value; the flat 5 is Shanghai Rummy's scheme, one variant down the page.
  `rummy-500` had pip values where Wikipedia gives the flat 5 as standard and
  pagat gives it as the variation — the same disagreement, landed on from
  opposite sides. Both entries now say which is which.
- `contract-rummy` had two runs of a contract needing to be **in different
  suits**. They may share a suit; what they may not be is contiguous, and
  overlapping runs are explicitly fine. That error had also propagated into the
  contract table, which is the third time a fact fixed in prose has been found
  alive in a `scoring_table`.
- Its variants were worse than its rules. Shanghai Rummy was given ten deals and
  wild twos; it has seven and no wild twos. Progressive Rummy was described as
  growing its deal size; it deals eleven throughout and runs to fifteen
  contracts. Liverpool Rummy was given a shorter contract list and extra jokers;
  it is Contract Rummy unchanged apart from a fifty-point bonus for cutting the
  pack to exactly the right depth. **A variant paragraph is prose like any
  other, and nothing had ever read these against a source.**
- `rummy-500` was missing **calling "Rummy!"** altogether — the rule that lets
  any other player pounce on a discard that could have been melded, take the
  pile down to it and finish a turn. It is a page-and-a-half of the source and
  it changes when you dare to meld. Its Persian Rummy variant also had the game
  running to 500 when it is decided in two deals.
- `crazy-eights` said a player holding a legal card must play it rather than
  draw. Both sources say the opposite in as many words: you may always draw,
  even holding something playable, which is precisely how you keep an eight back
  for a better moment. Its point target was given as 100 or 500 where the
  sourced rule is fifty per player at the table.
- `bs` claimed a four-card ceiling on what you may put down. Nothing caps it —
  the pack does, and a claim of five in a single-deck game is a legal play and a
  transparent lie, which is a different thing from an illegal one.

Ten of the forty-five are prevalence claims. Four more are aliases or variant
names attached to a **neighbouring game rather than this one**: `bs` listed
Bluff as one of its own names where the source gives that name to the
same-rank game on a different page.

The third group is one entry, `kings-in-the-corner`, and it is here because it
had the **turn structure backwards**. The entry began a turn by drawing; both
sources draw at the *end*, and pagat lists draw-first as a variation with a
practical objection attached — with the draw at the end, drawing is the signal
that your turn is over, and moving it to the front leaves nobody able to tell
when you have finished. The entry carried the real rule as a variant and the
variant as the rule.

Four more, none arithmetic. A king turned up in the opening layout was said to
be swapped for a fresh card off the stock; it is the first player who moves it,
filling the gap from their own hand — and the same player may move a turned card
that happens to fit onto another, which the entry did not mention at all. The
"compulsory play" variant generalised to every card a rule the source applies
only to kings, and omitted that the source thinks it unenforceable and prefers
the ten-point penalty. The target score was given as 25 or 100 where both
accounts say 25 or 50. And a rule barring anyone from going out while the stock
still held cards was attributed to "a few written rule sets"; neither source
has it.

**One audited, one faulty, nine wrong or unsupported statements.**

The fourth group is `president`, and it repeats the batch's own lesson at
the level of a whole rule. The entry gave the card exchange as two cards
between Scum and President and one between the Vice pair. Both sources give
**one card each way** as the base, scaling with however many ranked
positions a table runs — the two-and-one scheme is one configuration of
that, stated as though it were the rule. The entry also asserted that the
Scum deals; the two accounts disagree, one giving the job to the Scum and
the other to the President. A second deck was said to be needed past about
seven players where the source says nine, the scoring carried a Scum
penalty and an eleven-point target neither account mentions, and the
pass-locks-you-out variant was called the more widely played version,
"particularly in North America", where the only source that places it at
all reports it from Australia.

**One audited, one faulty, seven wrong or unsupported statements.**

