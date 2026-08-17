# 2026-08-17 — The variant player-count census

**Kind:** Working aid, and the read
[the design](2026-08-14-variants-that-change-the-player-count-design.md) said had
to happen before the facet could be trusted. Not a record of a pass; this checks
no facts and moves no `checked` stamp.

## Why this exists

The design closes on the one thing it could not do:

> The table above is what one careful pass over the scan output produced; it is a
> floor, not a census.
>
> Then read the variants of the other seventy entries, because the table is a
> floor rather than a census and no pattern can be trusted to complete it. That
> read is the bulk of the work.

**It is done. All 80 entries and all 369 variants were read**, in order, not
sampled and not grepped — 189,594 characters. What follows is the census.

## What the read found that the scan did not

The floor was 12 variants across 10 entries. **The census is 15 across 13**, and
the three additions are the interesting part, because each is a different way for
a pattern to be wrong.

- **`concentration`'s Solitaire Concentration — "play alone against your own
  record"** — seats **1** where the entry's minimum is 2. No scan found it
  because it names no number at all. The design's table has no `concentration`
  row of any kind. **This is the one case the shipped rules already allow, and it
  is in**: `npm run pick --players 1` now offers Concentration under *Also
  playable at 1, with a variant*, where before a solo reader saw only the
  solitaires.
- **`klondike`'s Double Klondike**, which the design lists among the five *false*
  hits — "two decks, not two players". The scan hit really was on the deck count,
  and the variant really does end: *"The name is also used for a two-player race
  in which each player has their own tableau but both feed a shared set of
  foundations."* A false positive and a true one in the same paragraph.
- **`sheepshead`'s Three-handed and four-handed**, also listed among the false
  hits as a digit "belonging to card counts". It ends: *"Six, seven and
  eight-handed forms exist too, generally by shrinking the hands and adding
  partners."* Six to eight against a `players.max` of 5.

Both corrections have the same shape: **the scan hit was genuinely false, the
entry was cleared on the strength of that, and the real claim was a sentence or
two further down the same variant.** Dismissing a hit is not the same as reading
the variant, and the difference cost two rows.

## The census

Every variant whose stated count falls outside its entry's `players` range.
Variants seating a count *inside* the range are not listed: `big-two`'s
short-handed play, `briscola`'s five-handed calling game, `casino`'s Draw and
Partnership forms, `cribbage`'s three- and four-handed, `durak`'s teams,
`euchre`'s cutthroat, `five-hundred`'s three- and five-handed, `hand-and-foot`'s
two/three/five, `hearts`' Black Maria, `pinochle`'s two- and three-handed,
`pitch`'s cutthroat, `scopa`'s Scopone, `spades`' two- and three-handed,
`speed`'s three or four, `truco`'s two-handed and a dozen more are all already
covered by the main range and need no facet.

| entry | main | variant | serves | direction | state |
| --- | --- | --- | --- | --- | --- |
| `belote` | 4-4 | Short-handed belote | 2-3 | down | **carried** |
| `concentration` | 2-8 | Solitaire Concentration | 1 | down | **carried, added today** |
| `contract-bridge` | 4-4 | Honeymoon bridge | 2 | down | **carried** |
| `skat` | 3-4 | Officers' Skat | 2 | down | **carried** |
| `whist` | 4-4 | German Whist | 2 | down | **carried** |
| `conquian` | 2-2 | Three or four players | 3-4 | up | blocked |
| `conquian` | 2-2 | Panguingue | 4-8 | up | blocked, wants 8 packs |
| `five-hundred` | 3-5 | Six-handed | 6 | up | blocked, wants 2 packs |
| `gin-rummy` | 2-2 | Three- and four-handed gin | 3-4 | up | blocked |
| `klondike` | 1-1 | Double Klondike | 2 | up | blocked, wants 2 packs |
| `mus` | 4-4 | Three, five and six players | 3, 5, 6 | both | blocked, and see below |
| `sheepshead` | 3-5 | Three-handed and four-handed | 6-8 | up | blocked |
| `snap` | 2-6 | Menagerie | 4-8 | up | blocked |
| `tien-len` | 2-4 | Other player counts | 5-8 | up | blocked, wants 2 packs |
| `whist` | 4-4 | Knock-Out Whist | 2-7 | both | blocked above 4 |

### Five more, read and deliberately omitted

The design's honesty constraint — *"Where the prose is vague, the field is
omitted rather than guessed"* — decides these, and it is worth listing them so
the next reader does not have to reach the same verdict from scratch.

- **`hearts`, Cancellation Hearts** — "Built for six or more players". A minimum
  and no maximum. A range needs both, and inventing the top of it is the failure
  the constraint exists to prevent.
- **`spoons`, Two packs for a crowd** — "a group past thirteen". Same shape.
- **`spit`, Nertz** — "it takes two players or many". Same shape, and `nertz` is
  its own entry anyway.
- **`palace`, Smeghead** — "for a bigger table", no number anywhere.
- **`sueca`, Bisca** — "Versions exist for two, three, four and six players", but
  Bisca is the wider family Sueca belongs to rather than Sueca at another count.
  This is the same judgement `caribbean-stud`'s "the stud game it borrows from"
  gets: a pointer to other games, not a claim about this one.

## Two things the census establishes that the design could not

### Six of the ten upward cases need no extra decks at all

This is the measurement the open question was missing. Splitting the blocked
upward rows by what they actually require:

- **Want more packs — 4:** `conquian`'s Panguingue (eight 40-card packs),
  `five-hundred`'s Six-handed (a second pack, or a purpose-made 63-card one),
  `tien-len`'s five-to-eight (two packs), `klondike`'s two-player race (two).
- **Want nothing extra — 6:** `conquian`'s three or four players, `gin-rummy`'s
  three- and four-handed, `mus`'s five and six, `sheepshead`'s six to eight,
  `snap`'s Menagerie, `whist`'s Knock-Out. Every one of these is the same single
  pack the entry already calls for.

The design's **rule 3 as written** grants exactly these six a clear path:

> If the range extends past the main `max`, the entry must either carry
> `decks_by_players` covering that count, **or need no more decks than it already
> does**.

**The shipped code has no second clause.** `checkVariantPlayers` requires a
`decks_by_players` key strictly past `players.max`, whatever the variant needs,
so a one-pack game extending from 6 to 8 is refused as firmly as one wanting
eight packs. That is faithful to the *decision* — option 3, ship seats-fewer only
— and not to the rule the design states. **Closing that gap alone unblocks six of
the ten, and touches neither of the two contested options**: the step-map
invariant stays exactly as it is, and no deck requirement moves onto a variant.
The remaining four are the ones the real argument is about.

This is left as a decision rather than done here, because the design is explicit
that the choice among its three options belongs to a person. What has changed is
that the choice now has a denominator: it is four cases, not ten.

### A range is contiguous and at least one real variant is not

**`mus`'s "Three, five and six players" serves 3, 5 and 6 — and not 4**, which is
the main game. `{min: 3, max: 6}` is the only shape the facet can express, and it
claims a count the variant does not describe.

In practice the picker is unharmed: it shows the variant group only for counts
the main range misses, so a 3-6 range on a 4-4 game is consulted at 3, 5 and 6
and inert at 4. But the *data* would assert something the prose does not, which
is the same objection that keeps the five vague cases out. Whether the facet
should accept a list of counts, or whether `mus` should carry a range the picker
happens to read correctly, is a third design question — smaller than the deck one
and previously invisible, because a scan that never read `mus` in full could not
raise it.

## What this does not establish

It is a read of the **variants**, for one thing: what player count each states.
It checked no facts against any source, so no `checked` stamp moved and none
should. Where a variant's count is wrong about the real game, this census
faithfully reproduces the error.

Nor does it settle whether every listed range *should* be carried. `klondike`'s
two-player race is a fair candidate for "the name is also used for a different
game" rather than a variant of Klondike; `sueca`'s Bisca is filed that way above.
Those are calls to make when the rows are added, not now.
