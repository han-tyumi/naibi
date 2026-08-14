# 2026-08-14 — Variants that change the player count

**Kind:** Design, agreed and not yet built. The measurement in it is real; the
schema and the picker behaviour are proposals.

## The problem, measured

`players.max` is a hard bound and `npm run pick` filters on it exactly:

```ts
games = games.filter((g) => g.players.min <= players && players <= g.players.max);
```

So a game whose *variants* seat a different number is invisible at that number.
`five-hundred` renders as "Players: 3-5" and the page below it explains how six
people play.

The handoff called this a third inheritance after `speed` and `tien-len`. **It is
not three entries, and it is not settleable by a scan** — which is the first thing
this design had to learn.

Two regexes were run and then every hit was read. The loose one returned 15
entries; the tight one returned 16 variants; **they disagreed with each other and
both were wrong**, in opposite directions.

**Read-verified, the real set is about 12 variants across 10 entries:**

| entry | facet | variant | really serves |
| --- | --- | --- | --- |
| `belote` | 4-4 | Short-handed belote | 2-3 |
| `conquian` | 2-2 | Three or four players | 3-4 |
| `conquian` | 2-2 | Panguingue | 4-8, on eight 40-card packs |
| `contract-bridge` | 4-4 | Honeymoon bridge | 2 |
| `five-hundred` | 3-5 | Six-handed | 6 |
| `gin-rummy` | 2-2 | Three- and four-handed gin | 3-4 |
| `mus` | 4-4 | Three, five and six players | 3, 5, 6 |
| `skat` | 3-4 | Officers' Skat | 2 |
| `snap` | 2-6 | Menagerie | up to 8 |
| `tien-len` | 2-4 | Other player counts | 5-8, on two packs |
| `whist` | 4-4 | German Whist | 2 |
| `whist` | 4-4 | Knock-Out Whist | 2-7 |

**Five scan hits were false, and two of them failed the same way:** `klondike`'s
Double Klondike is *two decks*, not two players, and `canasta`'s Hand and Foot is
"four to six **decks**". A pattern hunting for player counts reads deck counts as
player counts — which is worth knowing in a design whose whole point is that decks
travel with player counts. `sheepshead` and `spoons` matched digits belonging to
card counts and round counts; `sueca`'s Sueca Italiana says only that its shape
resembles "the five-handed Italian calling games", which is a remark about other
games rather than a claim about its own table.

**One hit was a false negative in the tight scan and a true positive in the loose
one** — `tien-len`, whose variant says five to eight can play with two packs but
never puts a digit next to the word "players". Neither pattern can be trusted, and
a third would have its own blind spot.

**So the migration cannot be driven by a scan.** It needs a read of all 80 entries'
variants, which is the same shape of work as the audit itself. The table above is
what one careful pass over the scan output produced; it is a floor, not a census.

**It runs in both directions**, which is the finding the design rests on. Variants
seating *fewer* are as common as variants seating more: `belote`, `contract-bridge`,
`skat` and `whist` all seat two where the facet says four, and `gin-rummy` and
`conquian` extend upward from two. A reader with two players is denied games as
often as one with six. Were it only the upward cases, widening three caps by hand
would nearly cover it; it is the two-player variants hiding inside four-player
games that make a hard range the wrong shape.

## What was decided

Three questions were settled before designing:

1. **Scope: player range only.** Variants may declare a player range and nothing
   else. Not a general facet-override block — that can be argued for later if a
   second facet earns it.
2. **The picker groups them after exact matches**, labelled, rather than mixing
   them in or hiding them behind a flag. This matches how the collection already
   treats variants: alternatives, not the main game.
3. **Deck requirements travel through the existing `decks_by_players`**, not a new
   field. No new deck logic anywhere.

**Decision 3 turned out not to work, and this is the open question.** Building it
on 2026-08-14 hit an existing invariant with a test behind it: `decks_by_players`
keys **must lie inside `players.min..players.max`**
(`packages/data/test/corpus.test.ts`, "every step map is keyed inside the game's
player range"), and a companion test ties the deck prose to the map's threshold.
Those are exactly the keys an upward variant needs — `five-hundred` wants `{"6": 2}`
against a range topping out at 5. The field cannot express the requirement it was
chosen to carry.

The four variants that seat *fewer* went in cleanly, because a smaller table cannot
want more packs and rule 3 never fires. **Everything upward is blocked** pending a
choice between:

- **Widen the invariant** — allow a step-map key inside any variant's range as well
  as the game's own. Small, but it loosens a rule someone wrote deliberately, and
  the deck-prose test needs thinking about too, since `five-hundred`'s `decks`
  sentence says nothing about a six-player threshold.
- **Put the deck requirement on the variant after all** — the option rejected as
  duplicating `decks_by_players`. It no longer duplicates anything, because
  `decks_by_players` is scoped to the main game by rule and by test.
- **Ship seats-fewer only** — the picker gains two-player games hiding inside
  four-player entries, which is half the value and all of the safety, and the
  upward half waits.

The third is what is committed. The first two are design decisions, not
implementation details.

## The data

```json
"variants": [
  {
    "name": "Six-handed",
    "description": "Two partnerships of three, sitting alternately…",
    "players": { "min": 6, "max": 6 }
  }
]
```

Optional, and absent on the large majority of variants that do not change the
count. `ideal` is deliberately not part of it: it is a recommendation about the
game the entry teaches, and a variant asserting its own ideal is noise.

### Validation rules

Enforced in `npm run validate` so a bad one cannot land:

1. `min <= max`, both at least 1. The same rule the top-level range has.
2. **The range must differ from the entry's main range.** A variant restating
   4-4 on a 4-4 game is noise and would double that game's rows in the picker.
3. **If the range extends past the main `max`, the entry must either carry
   `decks_by_players` covering that count, or need no more decks than it already
   does.** This is what makes "never recommend a game the reader cannot play"
   checkable rather than a matter of care. `five-hundred` gains `{"6": 2}`;
   `tien-len` gains `{"5": 2}`.

### Two things that make this cheaper than it looks

- **No re-stamping.** `PROSE_FIELDS` is `setup`, `play`, `goal_and_scoring` and
  `background`. `variants` is not in it, so adding this field does not move any
  `checked` fingerprint. Ten entries gain a facet with no implied claim that
  anybody re-read them.
- **No new deck logic.** `decksNeeded()` already reads `decks_by_players`, and
  `withDecksOnHand()` already filters on it.

### The honesty constraint

Adding this to ten entries means asserting twelve new facts. Where the variant prose
gives the count plainly — "Two partnerships of three", "four to eight players" —
the range is carried by prose already checked against sources, and the field is a
restatement rather than a new claim. **Where the prose is vague, the field is
omitted rather than guessed.** An absent range costs a missed recommendation; a
wrong one costs a reader sitting down to a game that does not work at their table.
The second is the failure this collection exists to avoid.

## The picker

`--players N` gains a second pass. Exact matches are unchanged and come first.
Then, separately:

```
Also playable at 6, with a variant:
  Five Hundred — Six-handed          2 decks
```

Rules for the second group:

- A game qualifies if any variant's range contains N **and** the main range does
  not, so nothing appears twice.
- **The existing deck filter applies to the group unchanged.** If the reader said
  what they own and `decksNeeded(game, N)` exceeds it, the row is dropped, exactly
  as in the first group. This is the whole of rule 3's payoff.
- The variant's name is printed, because it is what makes the row actionable —
  "Five Hundred (Six-handed)" tells the reader what to look for on the page.
- The group is omitted entirely when empty, so the common case looks as it does
  today.

`--decks` and the other filters need no changes: they already run over whatever
set they are given.

## What is not in scope

- **Rendering.** The website and the booklet are untouched. A variant's player
  range is data for filtering; the prose already tells the reader. If the pages
  should show it, that is a separate change with its own `--check` churn across
  every generated file.
- **The `players.ideal` question**, and whether the main range should mean "the
  game this entry teaches" — this design answers that implicitly by leaving the
  main range alone, and nothing else needs to change for it.
- **Whether a variant deserves its own entry.** `CONTRIBUTING.md` already answers
  that: its own game if the goal or the core mechanic changes, or if it needs a
  different deck or table layout. A player count on its own does not meet that
  bar — Six-handed 500 is 500 — so these stay variants.

## Testing

- Schema: a variant range that inverts `min`/`max`, one that restates the main
  range, and one that extends past the main max without the decks to back it —
  each rejected by `npm run validate`, each with a test naming it.
- `pick`: a game whose variant seats N and whose main range does not appears in
  the second group and not the first; a game seating N outright appears in the
  first group and not the second; the second group disappears when the reader's
  deck count cannot cover it; an empty second group prints nothing.
- The corpus: every variant range present in the data satisfies the three rules,
  asserted against the real entries rather than fixtures, the way the geometry and
  ranking tests already are.

## Migration

One entry at a time, prose first. For each of the twelve above, add the range and
add `decks_by_players` where rule 3 requires it — `conquian`'s Panguingue wants
eight packs, `tien-len`'s larger game two, `five-hundred`'s six-handed two.

Then read the variants of the other seventy entries, because the table is a floor
rather than a census and no pattern can be trusted to complete it. That read is the
bulk of the work and it is worth doing once, properly, rather than shipping a facet
that is right about twelve games and silently absent on the rest.
