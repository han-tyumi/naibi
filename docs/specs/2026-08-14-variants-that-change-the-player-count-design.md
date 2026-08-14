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
not three entries.** A rough scan of every variant description for a player count
outside its entry's range returns **about 13 to 15 of 80**, roughly one in six —
rough because the scan is a regex and two of its hits (`spoons`, `sheepshead`) are
false positives, while `conquian`'s "Four to eight players" and `snap`'s "four to
eight players" are real. The list wants a per-entry read before anyone acts on it.

**It runs in both directions**, which is the part that had been missed. Variants
that seat *fewer* are as common as variants that seat more:

| entry | facet | a variant serves |
| --- | --- | --- |
| `belote` | 4-4 | 2, 3 |
| `contract-bridge` | 4-4 | 2 (Honeymoon bridge) |
| `skat` | 3-4 | 2 (Officers' Skat) |
| `whist` | 4-4 | 2 (German Whist) |
| `gin-rummy` | 2-2 | 3, 4 |
| `conquian` | 2-2 | 3, 4, and 4-8 (Panguingue) |
| `canasta` | 2-4 | 6 (Hand and Foot) |
| `five-hundred` | 3-5 | 6 |
| `tien-len` | 2-4 | 5-8 |
| `mus` | 4-4 | 6 |
| `sueca` | 4-4 | 5, 6 |
| `snap` | 2-6 | 8 |
| `klondike` | 1-1 | 2 (Double Klondike) |

A reader with two players is denied games as often as one with six.

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
  `checked` fingerprint. Thirteen entries gain a facet with no implied claim that
  anybody re-read them.
- **No new deck logic.** `decksNeeded()` already reads `decks_by_players`, and
  `withDecksOnHand()` already filters on it.

### The honesty constraint

Adding this to ~13 entries means asserting ~13 new facts. Where the variant prose
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

One entry at a time, prose first. For each of the ~13, read the variant's own text,
add the range only where the text states a count plainly, and add
`decks_by_players` where rule 3 requires it. The scan that produced the table above
is a starting list, not an answer — it has known false positives, and the per-entry
read is the work.
