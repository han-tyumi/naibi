# Variant Player Counts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a variant declare the player range it serves, so `npm run pick --players 6` can surface Five Hundred's six-handed game instead of hiding it.

**Architecture:** One optional `players: {min, max}` object on a variant. Three rules in `checks.ts` keep it honest. `pick.ts` gains a second, labelled group printed after the exact matches, filtered by the deck logic that already exists. No new deck modelling and no rendering changes.

**Tech Stack:** TypeScript run directly by Node 22 (no build step), `ajv` for schema validation, `node --test` for tests.

**Spec:** [`docs/specs/2026-08-14-variants-that-change-the-player-count-design.md`](../../specs/2026-08-14-variants-that-change-the-player-count-design.md)

## Status, 2026-08-14

**Executed inline the day it was written. Tasks 1, 2, 4, 5 and 6 are done; Task 3
is half done.** The unchecked boxes below are left as written rather than ticked,
because the plan is the record of what was intended and this note is the record of
what happened.

- **Task 3 shipped the four variants that seat FEWER** — `belote`, `contract-bridge`,
  `skat`, `whist`/German Whist — which need no deck cover, since a smaller table
  cannot want more packs.
- **The eight that seat more are reverted and blocked.** Building them hit an
  existing invariant with a test behind it: `decks_by_players` keys must lie inside
  `players.min..max`, which is exactly where an upward variant's key cannot go. The
  spec's "What was decided" section records the three ways out. This plan's Task 3
  step 3 is therefore not executable as written.
- **One rule in Task 2 was wrong as planned and was corrected.** It demanded a
  step-map key on the *exact* player count; `decks_by_players` means "from this
  count upward", so a key at 5 already answers for 8. The shipped rule requires a
  key past the game's own max instead, with a test naming the case.

## Global Constraints

- Node 22.18+; the `.ts` files run directly. There is no compile step.
- `npm run check` is the whole bar: `validate --quiet`, `render --check`, `web --check`, `pdf --check`, `typecheck`, `npm test`. It must pass at every commit.
- `packages/data/schema/game.schema.json` is the single source of truth for types. After any schema edit run `npm run types`, which regenerates `packages/data/schema/game.types.ts`. Never hand-edit that file.
- Schema objects in this project set `"additionalProperties": false`. Match that.
- `variants` is NOT in `PROSE_FIELDS` (`setup`, `play`, `goal_and_scoring`, `background`), so nothing in this plan moves a `checked` fingerprint. No entry needs re-stamping.
- Commit subjects carry a conventional prefix. `feat:` for the schema and picker work (additive), `fix:` for data corrections, `docs:` for documentation. See CONTRIBUTING's release table.
- Entry data changes require `npm run build` and committing what it regenerates: `rendered/`, `site/` and `rendered/naibi.pdf`.

---

### Task 1: The schema field

**Files:**
- Modify: `packages/data/schema/game.schema.json` — `properties.variants.items.properties`
- Regenerate: `packages/data/schema/game.types.ts` (via `npm run types`)

**Interfaces:**
- Consumes: nothing.
- Produces: `CardGame["variants"][number]["players"]` typed as `{ min: number; max: number } | undefined`. Tasks 2 and 4 rely on this name and shape.

- [ ] **Step 1: Add the property to the schema**

In `packages/data/schema/game.schema.json`, inside `properties.variants.items.properties`, alongside `name` and `description`:

```json
"players": {
  "description": "The player range this variant serves, when it differs from the game's own. Omit unless the variant's prose states a count plainly -- an absent range costs a missed recommendation, a wrong one costs a reader a game that does not work at their table.",
  "type": "object",
  "additionalProperties": false,
  "required": ["min", "max"],
  "properties": {
    "min": { "type": "integer", "minimum": 1, "maximum": 12 },
    "max": { "type": "integer", "minimum": 1, "maximum": 12 }
  }
}
```

Note there is no `ideal`. That is deliberate: `ideal` is a recommendation about the game the entry teaches.

- [ ] **Step 2: Regenerate the types**

Run: `npm run types`
Expected: `packages/data/schema/game.types.ts` changes to include the optional `players` on the variant item.

- [ ] **Step 3: Confirm nothing broke**

Run: `npm run typecheck && npm run validate -- --quiet`
Expected: both pass. No entry uses the field yet, so validation is unchanged.

- [ ] **Step 4: Commit**

```bash
git add packages/data/schema/game.schema.json packages/data/schema/game.types.ts
git commit -m "feat: let a variant declare the player range it serves"
```

---

### Task 2: The three validation rules

**Files:**
- Modify: `packages/build/checks.ts` — add `checkVariantPlayers`, call it from `checkEntry`
- Test: `packages/build/test/checks.test.ts`

**Interfaces:**
- Consumes: the schema shape from Task 1; `asRecord` and `asNumber`, the private helpers already at the top of `checks.ts`; `Entry`, the loose record type the checks take.
- Produces: `export function checkVariantPlayers(data: Entry): string[]` — the same signature every other check has, returning one string per problem. Task 4's corpus test relies on this being wired into `checkEntry`.

- [ ] **Step 1: Write the failing tests**

Add to `packages/build/test/checks.test.ts`. Import `checkVariantPlayers` alongside the other checks at the top of the file.

```ts
test("a variant's player range has to be a range, and has to differ", () => {
  const base = { players: { min: 3, max: 5, ideal: 4 }, equipment: { standard_decks: 1 } };

  // inverted
  complains(
    checkVariantPlayers({
      ...base,
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 4 } }],
    }),
    "greater than",
  );

  // restating the game's own range is noise, and would double its picker rows
  complains(
    checkVariantPlayers({
      ...base,
      variants: [{ name: "Same", description: "x", players: { min: 3, max: 5 } }],
    }),
    "does not differ",
  );

  // a range that genuinely differs, backed by the decks to play it, is fine
  assert.deepEqual(
    checkVariantPlayers({
      players: { min: 3, max: 5, ideal: 4 },
      equipment: { standard_decks: 1, decks_by_players: { "6": 2 } },
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 6 } }],
    }),
    [],
  );

  // no field, no opinion
  assert.deepEqual(checkVariantPlayers({ ...base, variants: [{ name: "n", description: "x" }] }), []);
  assert.deepEqual(checkVariantPlayers({}), []);
});

test("a variant seating more players must say what it costs in decks", () => {
  // The picker will offer this row. CONTRIBUTING: recommending a game the
  // reader cannot play is the one thing it must never do.
  complains(
    checkVariantPlayers({
      players: { min: 3, max: 5, ideal: 4 },
      equipment: { standard_decks: 1 },
      variants: [{ name: "Six-handed", description: "x", players: { min: 6, max: 6 } }],
    }),
    "decks_by_players",
  );

  // seating FEWER needs no deck cover -- you cannot need more packs for a smaller table
  assert.deepEqual(
    checkVariantPlayers({
      players: { min: 4, max: 4, ideal: 4 },
      equipment: { standard_decks: 1 },
      variants: [{ name: "Short-handed", description: "x", players: { min: 2, max: 3 } }],
    }),
    [],
  );
});
```

- [ ] **Step 2: Run them to verify they fail**

Run: `node --test --test-name-pattern="variant's player range|seating more players" packages/build/test/checks.test.ts`
Expected: FAIL — `checkVariantPlayers is not a function` / import error.

- [ ] **Step 3: Implement the check**

Add to `packages/build/checks.ts`, next to `checkPlayers`:

```ts
/**
 * A variant may serve a different table than the game it belongs to -- Officers'
 * Skat is two-handed, Six-handed 500 is six. The picker offers those rows, so the
 * range has to be a real range, has to actually differ from the game's own (a
 * restatement would just double the game's rows), and where it seats MORE it has
 * to say what that costs in packs. That last rule is what keeps the picker from
 * recommending a game the reader cannot play tonight.
 */
export function checkVariantPlayers(data: Entry): string[] {
  const players = asRecord(data["players"]);
  const variants = Array.isArray(data["variants"]) ? data["variants"] : [];
  if (!players || variants.length === 0) return [];

  const gameMin = asNumber(players["min"]);
  const gameMax = asNumber(players["max"]);
  if (gameMin === null || gameMax === null) return [];

  const equipment = asRecord(data["equipment"]) ?? {};
  const steps = asRecord(equipment["decks_by_players"]);
  const covered = new Set(Object.keys(steps ?? {}).map(Number));

  const problems: string[] = [];
  for (const raw of variants) {
    const variant = asRecord(raw);
    if (!variant) continue;
    const range = asRecord(variant["players"]);
    if (!range) continue;

    const name = typeof variant["name"] === "string" ? variant["name"] : "a variant";
    const min = asNumber(range["min"]);
    const max = asNumber(range["max"]);
    if (min === null || max === null) continue;

    if (min > max) {
      problems.push(`variant "${name}": players.min (${min}) is greater than players.max (${max})`);
      continue;
    }
    if (min === gameMin && max === gameMax) {
      problems.push(`variant "${name}": player range ${min}-${max} does not differ from the game's`);
      continue;
    }
    if (max > gameMax && !covered.has(max)) {
      problems.push(
        `variant "${name}": seats up to ${max} but no decks_by_players entry covers ${max}`,
      );
    }
  }
  return problems;
}
```

- [ ] **Step 4: Wire it into the aggregator**

In `checkEntry`, add `...checkVariantPlayers(data),` immediately after `...checkPlayers(data),`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test packages/build/test/checks.test.ts`
Expected: PASS, all tests.

- [ ] **Step 6: Run the whole gate**

Run: `npm run check`
Expected: PASS. No entry carries the field yet, so no corpus entry can trip a rule.

- [ ] **Step 7: Commit**

```bash
git add packages/build/checks.ts packages/build/test/checks.test.ts
git commit -m "feat: keep a variant's player range honest about its range and its packs"
```

---

### Task 3: The twelve confirmed entries

**Files:**
- Modify: `packages/data/games/{belote,conquian,contract-bridge,five-hundred,gin-rummy,mus,skat,snap,tien-len,whist}.json`
- Regenerate: `rendered/`, `site/`, `rendered/naibi.pdf` via `npm run build`

**Interfaces:**
- Consumes: the schema from Task 1 and the rules from Task 2.
- Produces: the corpus data Task 4's corpus test and Task 5's picker test read.

Work one entry at a time, and **read the variant's own description before adding the range**. The table below is what a careful pass over a scan produced; the prose is the authority. Where a description does not state a count plainly, leave the field off and note it — an absent range costs a missed recommendation, a wrong one costs a reader an unplayable evening.

- [ ] **Step 1: Add the ranges that seat fewer players (no deck work needed)**

These need no `decks_by_players`, because a smaller table cannot need more packs.

| file | variant | add |
| --- | --- | --- |
| `belote.json` | Short-handed belote | `"players": { "min": 2, "max": 3 }` |
| `contract-bridge.json` | Honeymoon bridge | `"players": { "min": 2, "max": 2 }` |
| `skat.json` | Officers' Skat | `"players": { "min": 2, "max": 2 }` |
| `whist.json` | German Whist | `"players": { "min": 2, "max": 2 }` |

- [ ] **Step 2: Run the gate**

Run: `npm run validate -- --quiet`
Expected: PASS. Each range differs from its game's and seats fewer, so rule 3 does not apply.

- [ ] **Step 3: Add the ranges that seat more, with their deck cover**

| file | variant | add | and to `equipment` |
| --- | --- | --- | --- |
| `conquian.json` | Three or four players | `"players": { "min": 3, "max": 4 }` | `"decks_by_players": { "3": 1, "4": 1 }` if 3-4 need no extra pack; read the prose |
| `conquian.json` | Panguingue | `"players": { "min": 4, "max": 8 }` | `"decks_by_players"` covering `"8"` — the prose says eight 40-card packs |
| `five-hundred.json` | Six-handed | `"players": { "min": 6, "max": 6 }` | `"decks_by_players": { "6": 2 }` |
| `gin-rummy.json` | Three- and four-handed gin | `"players": { "min": 3, "max": 4 }` | cover `"4"` if the prose needs a second pack |
| `mus.json` | Three, five and six players | `"players": { "min": 3, "max": 6 }` | cover `"6"` per the prose |
| `snap.json` | Menagerie | `"players": { "min": 2, "max": 8 }` | cover `"8"` per the prose |
| `tien-len.json` | Other player counts | `"players": { "min": 2, "max": 8 }` | `"decks_by_players": { "5": 2 }` — the prose says five to eight with two packs |
| `whist.json` | Knock-Out Whist | `"players": { "min": 2, "max": 7 }` | cover `"7"` if the prose needs it |

The `decks_by_players` values are **not** guesses to be filled in — read each entry's variant prose and set what it states. If the prose does not say, leave both the range and the deck entry off and record the entry as unresolved in the commit message.

- [ ] **Step 4: Run validation, expecting rule 3 to catch anything you missed**

Run: `npm run validate -- --quiet`
Expected: PASS. A failure naming `decks_by_players` means an upward range has no deck cover — that is the rule working, not a bug. Fix the data.

- [ ] **Step 5: Rebuild and run the whole gate**

Run: `npm run build && npm run check`
Expected: PASS. `rendered/` and `site/` change only where `decks_by_players` altered a deck line; the variant range itself is not rendered.

- [ ] **Step 6: Commit**

```bash
git add packages/data/games rendered site
git commit -m "fix: record the player ranges the variants actually serve"
```

---

### Task 4: The corpus rule test

**Files:**
- Test: `packages/build/test/checks.test.ts`

**Interfaces:**
- Consumes: `checkVariantPlayers` from Task 2, the data from Task 3, and `loadGames` from `naibi`.
- Produces: nothing further.

This is the pattern the project already uses — geometry and ranking are asserted against the real corpus rather than against fixtures that agree with the code by construction.

- [ ] **Step 1: Write the test**

```ts
test("every variant player range in the corpus satisfies its own rules", () => {
  for (const game of loadGames()) {
    assert.deepEqual(
      checkVariantPlayers(game as unknown as Entry),
      [],
      `${game.id} has a variant player range that breaks a rule`,
    );
  }
});
```

- [ ] **Step 2: Run it**

Run: `node --test --test-name-pattern="every variant player range" packages/build/test/checks.test.ts`
Expected: PASS, given Task 3 left the data clean.

- [ ] **Step 3: Commit**

```bash
git add packages/build/test/checks.test.ts
git commit -m "test: hold every variant player range to the rules, against the real corpus"
```

---

### Task 5: The picker's second group

**Files:**
- Modify: `packages/build/pick.ts` — the `--players` filter near line 127, and the output block near line 183
- Test: `packages/build/test/pick.test.ts` (exists; add to it)

**Interfaces:**
- Consumes: `CardGame` with the Task 1 field; `decksNeeded(game, players)` and `playableWith` from `naibi`, both already imported by `pick.ts`.
- Produces: `export function alsoPlayableWith(games: readonly CardGame[], players: number): Array<{ game: CardGame; variant: string }>` — the second group, for the test to call directly.

- [ ] **Step 1: Write the failing test**

```ts
test("a game seating N only through a variant is offered separately, not hidden", () => {
  const games = loadGames();
  const six = alsoPlayableWith(games, 6);

  const five = six.find((row) => row.game.id === "five-hundred");
  assert.ok(five, "Five Hundred seats six through its six-handed variant and was not offered");
  assert.equal(five.variant, "Six-handed", "the variant's name is what makes the row actionable");

  // nothing that seats N outright appears here -- it belongs in the first group
  for (const row of six) {
    assert.ok(
      row.game.players.max < 6 || row.game.players.min > 6,
      `${row.game.id} seats 6 outright and should not be in the variant group`,
    );
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node --test --test-name-pattern="only through a variant" packages/build/test/pick.test.ts`
Expected: FAIL — `alsoPlayableWith is not exported`.

- [ ] **Step 3: Implement the selector**

Add to `packages/build/pick.ts`, near `withDecksOnHand`:

```ts
/**
 * Games that seat this many only through a variant. The main-range games are
 * the answer to the question; these are the answer to "and what else", so they
 * are collected separately and printed after. A game seating N outright is
 * excluded, or it would appear twice.
 */
export function alsoPlayableWith(
  games: readonly CardGame[],
  players: number,
): Array<{ game: CardGame; variant: string }> {
  const rows: Array<{ game: CardGame; variant: string }> = [];
  for (const game of games) {
    if (game.players.min <= players && players <= game.players.max) continue;
    for (const variant of game.variants ?? []) {
      const range = variant.players;
      if (range && range.min <= players && players <= range.max) {
        rows.push({ game, variant: variant.name });
        break;
      }
    }
  }
  return rows;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test --test-name-pattern="only through a variant" packages/build/test/pick.test.ts`
Expected: PASS.

- [ ] **Step 5: Print the group**

In the command body, after the main loop that prints each game (near line 191, just before `return 0;`):

```ts
  if (players !== undefined) {
    let extra = alsoPlayableWith(loadGames(), players);
    if (decks !== undefined) {
      extra = extra.filter(({ game }) => decksNeeded(game, players) <= decks);
    }
    if (extra.length > 0) {
      const wide = Math.max(...extra.map((r) => r.game.name.length));
      console.log(`\nAlso playable at ${players}, with a variant:`);
      for (const { game, variant } of extra) {
        console.log(`  ${game.name.padEnd(wide)}  ${variant} — ${deckLabel(game, players)}`);
      }
    }
  }
```

The deck filter is the whole payoff of Task 2's rule 3: a reader who said what they own is never offered a variant they cannot pack for.

- [ ] **Step 6: See it work**

Run: `npm run pick -- --players 6`
Expected: the usual list, then a group containing `Five Hundred  Six-handed — 2 decks`.

Run: `npm run pick -- --players 6 --decks 1`
Expected: Five Hundred is absent from the group — one deck cannot cover it.

- [ ] **Step 7: Run the whole gate**

Run: `npm run check`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add packages/build/pick.ts packages/build/test/pick.test.ts
git commit -m "feat: offer games that seat your table through a variant"
```

---

### Task 6: Document the field

**Files:**
- Modify: `CONTRIBUTING.md` — the conventions list under "The data format"

**Interfaces:**
- Consumes: everything above.
- Produces: nothing.

- [ ] **Step 1: Add the convention**

In `CONTRIBUTING.md`, in the bulleted conventions after the `decks_by_players` bullet:

```markdown
- A variant may carry its own `players` range where it seats a different table
  from the game itself — Officers' Skat is two-handed inside a three-to-four
  player entry, Six-handed 500 is six inside a three-to-five. It is `{min, max}`
  and has no `ideal`, because that is a recommendation about the game the entry
  teaches. `npm run pick` offers these separately, after the games that seat the
  table outright, so a reader can tell a main game from a variation. A range that
  seats **more** players must be backed by `decks_by_players` covering that count,
  and `npm run validate` enforces it: the picker offering a game the reader cannot
  pack for is the one thing it must never do. **Add the range only where the
  variant's prose states a count plainly.** An absent range costs a missed
  recommendation; a wrong one costs somebody an evening.
```

- [ ] **Step 2: Run the gate**

Run: `npm run check`
Expected: PASS — `docs.test.ts` checks documentation claims against the corpus.

- [ ] **Step 3: Commit**

```bash
git add CONTRIBUTING.md
git commit -m "docs: document the variant player range"
```

---

## Follow-up, deliberately not in this plan

**The census.** The twelve entries in Task 3 are a floor, not a complete list. Two regexes were run over the corpus and they disagreed with each other while both being wrong — one read deck counts as player counts (`klondike`'s "two decks", `canasta`'s "four to six decks"), the other missed `tien-len`, whose prose says five to eight can play without putting a digit beside the word "players". Completing the field means reading all 80 entries' variants, which is the same shape of work as the audit and wants its own sitting. Until it is done, the facet is right where present and simply absent elsewhere — which is the safe direction.

## Self-review

**Spec coverage.** Schema field → Task 1. The three validation rules → Task 2. Deck requirements through `decks_by_players` → Tasks 2 and 3. Picker second group, labelled, after exact matches, deck-filtered, omitted when empty → Task 5. Corpus assertion → Task 4. The twelve entries → Task 3. Rendering explicitly out of scope → untouched throughout, and Task 3 step 5 says so. Documentation → Task 6.

**Placeholders.** Task 3 deliberately leaves some `decks_by_players` values to be read from each entry's prose rather than stating them. That is not a placeholder but the plan's central instruction: the spec's honesty constraint says the count must come from the prose, and inventing eight values here would be exactly the failure the audit spent nineteen sittings correcting. The step says what to do when the prose does not say.

**Type consistency.** `checkVariantPlayers(data: Entry): string[]` is used identically in Tasks 2 and 4. `alsoPlayableWith(games, players)` returns `{game, variant}` rows in Task 5 steps 3, 5 and in the test. `variant.players` is `{min, max}` everywhere, matching the schema in Task 1.
