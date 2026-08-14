# 2026-08-13 — Teen Patti: a hedge that turned out to be right, and a festival that was the wrong one

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-13

## What was checked

**6 entries, checked 2026-08-13** — the day's total across all four records of the
date. The day ran [`pyramid` and `clock`](2026-08-13-pyramid-and-clock.md),
[`speed` and `fan-tan`](2026-08-13-speed-and-fan-tan.md),
[`tien-len`](2026-08-13-tien-len.md), and this sitting, which read **`teen-patti`
alone**. Note the filename sort: `teen-patti` comes before `tien-len`, so
**`2026-08-13-tien-len.md` is the record the ledger test reads the day's count
from**, not this one. All four state the same 6.

**One audited, one faulty, six wrong or unsupported statements.** One figure the
sources give and the entry lacked is named separately.

**3 entries remain on 2026-08-03**: `accordion`, `five-hundred`, `koi-koi`.

Sources: [pagat](https://www.pagat.com/vying/teen_patti.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Teen_patti). Both were already in
`sources_consulted`, so the `--stamp` guard did not fire — the first sitting in
five where it did not.

## This is a good entry, and it is worth saying why before the findings

Six findings against `tien-len`'s twelve and `speed`'s fifteen, and the difference
is not luck. **Almost everything mechanical in this entry is exactly right**: the
blind and seen rates and their ranges, the halving that passes half a seen bet on
as the next stake, the one-way door from blind to seen, all four show costs, the
sideshow and its condition that every remaining player be seen, the asker folding
on a tie in a sideshow, the whole six-category ranking with A-K-J the best colour
and 5-3-2 the worst, A-A-K the best pair and 2-2-3 the worst, and the flat rule
that any category beats any lower one. Both figures are right, including the
caption's point that with three cards runs are rarer than flushes, which is the
thing that catches poker players out.

**And its most delicate claim turned out to be verified.** On whether A-2-3 or
A-K-Q is the higher run, the entry says: "a genuine disagreement between good
sources — some rank A-2-3 highest, others A-K-Q — so settle it at your own table
before the first deal rather than over an exposed hand." That is **exactly what
the two sources do.** One: "Ace can be used in the run A-2-3, which is the highest
straight run. Next comes A-K-Q." The other, listing from the top: "A-K-Q, A-2-3,
K-Q-J". Opposite answers, stated flatly by each.

That is worth recording because it is rare and because it is the shape every other
sitting has found inverted. Twelve times this audit has met an entry that stated
one source's rule flatly and buried the other in a hedge. Here somebody met the
same disagreement and wrote it down as a disagreement. **Nothing needed changing,
which is a result only reading both sources can produce.**

## `teen-patti` — six

1. **The wrong festival, with a prevalence claim attached.** "A fixture of Diwali
   gatherings across India, which is where most people meet it." Neither source
   mentions Diwali. One ties the game to **Janmashtami**, the celebration of
   Krishna's birth. Nothing counts where most people meet it. The entry now names
   the festival its source names, and says the game came from India and is played
   more widely through South Asia, which is what that source says.
2. **A prohibition stated flatly that one source does not have.** "Seen, against
   a blind opponent, you are not allowed to ask at all. Bet on, or get out. That
   prohibition is the blind player's protection and it is worth a great deal."
   One source agrees. **The other allows exactly that show, at four times the
   current stake.** The entry now gives both and says what each implies: under one
   a blind player is unshiftable except by folding, under the other the same
   position is merely expensive. **The layout caption carried the same claim** —
   "Blind players bet half as much and cannot be forced to a show" — and was
   corrected with it. Fifth sitting running in which a corrected fact was also
   live in a caption.
3. **A source-level disagreement demoted to a house rule.** "Some tables split
   the pot on a tied show instead of giving it to the player who did not ask."
   The asker-loses rule is one source's; **splitting is the other source's base
   rule**, not a table's preference. The sub-case the handoff names: a rule
   demoted to a house rule when a source gives it flatly.
4. **"Three turns is a common figure"** on the blind-limit variant. Both sources
   give three, and both give it as an *example*; one also offers two. Corrected to
   say so.
5. **"Two ways to loosen the ceiling, often used together."** The source lists
   them as two separate variations and says nothing about their being combined.
6. **A wild-rank variant timed wrongly.** "A card turned up **before** the deal."
   The source draws it **after** dealing, which matters: a card nominated after
   the deal cannot be played around when deciding to look.

**One figure the sources give and the entry lacked**, and it is the most
interesting thing on either page. The straight run is **rarer than the trio** — 48
of them against 52 trios — and yet ranks below it. One source says so and gives the
house rule that evens them: count 2-3-5 of a suit as a straight run, which brings
the straight runs to 52 as well. The arithmetic checks: twelve distinct three-card
runs times four suits is 48, thirteen ranks times four trios each is 52, and the
thirteenth run type makes 52 apiece. The entry now carries it.

## The pairing, which came back clean and explained something

`teen-patti` was read against `three-card-poker`, on the strength of its own
`Live Teen Patti` variant, which says the casino game is essentially Three Card
Poker with Teen Patti's ranking substituted for poker's.

**The two entries rank the same two hands in opposite orders**, and both are
right. `three-card-poker` gives "straight flush, three of a kind, straight, flush,
pair, high card" — the rarity-correct order. `teen-patti` puts the trio above the
straight run. That looked like a contradiction and is not: it is precisely the
anomaly finding 7 above records, which one source states outright — the pure
sequence is rarer, and trios are ranked higher anyway. So the casino game orders
them by rarity and the kitchen-table game does not, and the sentence added to
`teen-patti` is what now connects the two entries for a reader who notices.

Second clean pairing of the day, after `big-two` and `tien-len`'s deliberately
opposite suit orders. Both are results a sweep looking for consistency would have
destroyed.

## The originality pass, run after the fact fixes

Both fetch tools controlled in both directions and both refused their invented
targets, writing nothing. Sources agreed with themselves twice: 9,349 and 23,052
bytes. The checker was controlled against each source file by planting a copied
sentence — 23 words off pagat, 21 off Wikipedia, both correctly attributed.

**One REUSE, in a sentence this sitting had just written.** The new tied-show
sentence ran nine words with pagat on "the player who did not pay for the show".
Thirteenth instance of this failure mode, and the fix was to invert the sentence
rather than resynonymise it — stating the rule from the asker's side instead of the
opponent's, which is what the handoff prescribes and what has worked every time
swapping words has not. Clean after the rewrite.

The comparison was also run by hand over the fields `PROSE_FIELDS` does not read —
3,707 characters. Three candidates, all `scoring_table` cells like "A blind
player's bet — 1 to 2 times the stake" scoring against long source sentences about
the same numbers. A table cell restating a numeric rule has no second phrasing;
judged noise.

**The marker check caught three of the six findings** — the Diwali sentence, "a
common figure" and "often used together" — leaving the caption claim, the demoted
house rule and the mis-timed wild card to reading. That is a third recall figure
for [the precision measurement](../specs/2026-08-13-prevalence-vocabulary-precision.md):
**3 of 6 here, against 8 of 12 on `tien-len` and 5 of 26 on the morning's pair.**
Three entries, three rates between a fifth and two thirds. The tool finds a real
and variable minority.

It also produced a false positive worth writing down rather than fixing: "the game
across a kitchen table and the game in the casino have almost nothing **in
common**" — the idiom, not a prevalence claim. `nothing in common` belongs in the
not-a-claim list. **It is deliberately not being added**, because the last time a
filter was tuned on a single observed sentence the verdict behind it turned out to
be wrong the same day. It goes on the list for a future sample to confirm.

## Recorded, not acted on

- **Wikipedia's variant list is enormous** — Best-of-four, Lowball (mufliss), four
  kinds of wild, Bust card draw, Stud, Community, Draw, High-low split, Kiss/miss/
  bliss, Cobra, and a one-eyed-court-card variant. The entry keeps five, which is
  the range `CONTRIBUTING.md` asks for, and spends them on the blind limit, bet
  sizes, tie-breaking, jokers and the casino name collision. **Mufliss, which
  inverts the entire ranking, is the strongest candidate for a sixth** and is
  named here rather than added.
- **Two source-level details left out.** One source allows the boot to be a single
  larger amount put up by one player on rotation, rather than an equal amount from
  everyone. And it adds that a sideshow requested for the third time cannot be
  refused, in a sentence too garbled to state confidently.
- **The two sources disagree on what happens when a sideshow is refused.** One
  continues betting with the next player; the other says the asker must bet again
  or fold. The entry follows the first and does not mention the second.
- **Aliases.** `Teen Pathi`, `Flash` and `Flush` are all confirmed. One source
  also gives the Punjabi `Tre Patte`, which the entry lacks. Alias sweep.
- **`difficulty: easy` and `duration_minutes: 30-60`** rest on nothing read, as
  everywhere.

## What this pass does not establish

Nothing about the 3 entries still carrying a 2026-08-03 stamp. Where the sources
disagreed — the higher run, whether a seen player may demand a show against a blind
one, what a tie at a show pays — the entry now says so impersonally and this record
names the disagreements. On the first of those it already did, correctly, before
this sitting.

The originality tool cannot certify the entry clean. What can be said is narrower:
this is the first entry in fifteen sittings to be found substantially right, and
the reason is visible in its prose — whoever wrote it met a source disagreement and
wrote it down instead of picking. **Six findings is what an entry looks like when
that habit is already present.**
