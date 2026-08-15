/**
 * Properties that must hold across every entry in the corpus.
 *
 * The validator checks that entries are well formed. This checks that they can
 * actually be *drawn* and *read*: that every layout produces finite geometry,
 * every figure fits on a page, every shared figure reference resolves. A number
 * that comes out NaN here becomes an invisible card in the PDF, which is the
 * kind of thing nobody notices until it is printed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import type { CardGame } from "naibi";
import {
  blocks,
  buildDiagram,
  buildFigure,
  decksNeeded,
  loadGames,
  loadSharedFigures,
  nestedProse,
  nestedProseFingerprint,
  playableWith,
} from "naibi";

const games = loadGames();

test("there are games to check", () => {
  assert.ok(games.length >= 30, `only ${games.length} games loaded`);
});

test("games arrive sorted by display name", () => {
  const sorted = [...games].sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );
  assert.deepEqual(games.map((g) => g.name), sorted.map((g) => g.name));
});

test("every layout produces finite, positive geometry", () => {
  for (const game of games) {
    if (!game.layout) continue;
    const diagram = buildDiagram(game.layout);

    assert.ok(Number.isFinite(diagram.width) && diagram.width > 0, `${game.id}: width`);
    assert.ok(Number.isFinite(diagram.height) && diagram.height > 0, `${game.id}: height`);
    assert.ok(diagram.piles.length > 0, `${game.id}: drew no piles`);

    for (const pile of diagram.piles) {
      for (const card of pile.cards) {
        assert.ok(Number.isFinite(card.x) && card.x >= 0, `${game.id}: card x`);
        assert.ok(Number.isFinite(card.y) && card.y >= 0, `${game.id}: card y`);
      }
    }
    for (const label of diagram.labels) {
      assert.ok(Number.isFinite(label.y), `${game.id}: label y`);
      // A caption whose baseline falls past the bottom of the diagram is drawn
      // over whatever comes next.
      assert.ok(label.y <= diagram.height, `${game.id}: label below the diagram`);
    }
  }
});

test("every figure produces finite geometry and fits the page", () => {
  // Wider than this and the PDF has to shrink it below readable size. Fourteen
  // cards is the schema's limit; this is the practical one.
  const MAX_WIDTH = 14 * 36 + 74;

  for (const game of games) {
    for (const [index, figure] of (game.figures ?? []).entries()) {
      const where = `${game.id} figure ${index + 1}`;
      const built = buildFigure(figure);

      assert.ok(Number.isFinite(built.width) && built.width > 0, `${where}: width`);
      assert.ok(Number.isFinite(built.height) && built.height > 0, `${where}: height`);
      assert.ok(built.cards.length > 0, `${where}: drew no cards`);
      assert.ok(built.width <= MAX_WIDTH, `${where}: ${built.width} units wide`);
    }
  }
});

test("every figure_refs id resolves, and resolves into the game", () => {
  const shared = loadSharedFigures();
  const ids = new Set(Object.keys(shared));
  assert.ok(ids.size > 0, "no shared figures defined");

  for (const game of games) {
    for (const ref of game.figure_refs ?? []) {
      assert.ok(ids.has(ref), `${game.id} references unknown figure "${ref}"`);
      assert.ok(
        game.figures?.some((f) => f.caption === shared[ref]?.caption),
        `${game.id} references "${ref}" but it was not spliced in`,
      );
    }
  }
});

test("every prose section parses into at least one block", () => {
  for (const game of games) {
    for (const key of ["setup", "play", "goal_and_scoring"] as const) {
      assert.ok(blocks(game[key]).length > 0, `${game.id}: ${key} parsed to nothing`);
    }
  }
});

test("no prose section ends mid-list", () => {
  // A section whose last block is a one-item list is usually a bullet that lost
  // its siblings to a bad paste.
  for (const game of games) {
    for (const key of ["setup", "play", "goal_and_scoring"] as const) {
      const last = blocks(game[key]).at(-1);
      if (last?.kind === "list") {
        assert.ok(last.items.length > 1, `${game.id}: ${key} ends in a one-item list`);
      }
    }
  }
});

test("a game whose prose calls for another deck says so as data", () => {
  // The boolean this replaces was never read by anything, so it could say
  // "yes, sometimes" for years without a filter noticing. This asserts the
  // other direction: prose promising a second pack must be backed by a map,
  // or the filter goes on offering the game to someone who cannot play it.
  // "More decks than the baseline, tied to a number of players." Both halves
  // are needed. Without the player count, contract-bridge's convenience second
  // pack and red-dog's casino house style match; without the floor of two, the
  // baseline "1 standard deck" in every entry matches. Durak and Hearts change
  // the PACK with the count rather than the number of decks, and are correctly
  // not caught. Verified against all 72 entries: exactly the 14 with a map.
  const MORE = "[2-9]|1[0-2]|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|second|third|another|more";
  const ANY = "\\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve";
  const promisesMoreDecks = new RegExp(
    `\\b(?:${MORE})\\s+(?:52-card |standard )?(?:packs?|decks?)\\b|\\b(?:packs?|decks?) per player\\b`,
    "i",
  );
  const tiedToPlayerCount = new RegExp(
    `\\b(?:${ANY})[- ](?:or more )?players?\\b|\\bper player\\b|\\bthan there are players\\b|\\b\\d+-player\\b`,
    "i",
  );
  const missing = games
    .filter((g) => promisesMoreDecks.test(g.decks) && tiedToPlayerCount.test(g.decks) && !g.equipment.decks_by_players)
    .map((g) => g.id);
  assert.deepEqual(missing, [], "prose promises more decks at a player count, with no decks_by_players");
});

test("every step map is keyed inside the game's player range", () => {
  const strays: string[] = [];
  for (const game of games) {
    for (const key of Object.keys(game.equipment.decks_by_players ?? {})) {
      const n = Number(key);
      if (!Number.isInteger(n) || n < game.players.min || n > game.players.max) {
        strays.push(`${game.id}:${key}`);
      }
    }
  }
  assert.deepEqual(strays, [], "step map keyed outside the game's player range");
});

test("a step map raises the requirement from its key upward", () => {
  // The numbers here used to say six, because bs's map said six while both of
  // its own prose statements said five. The map was the wrong one of the three
  // and was corrected; the test below this one is what would have caught it.
  const bs = games.find((g) => g.id === "bs")!;
  assert.equal(decksNeeded(bs, 4), 1, "four players still fit one pack");
  assert.equal(decksNeeded(bs, 5), 2, "five is where the second pack starts");
  assert.equal(decksNeeded(bs, 10), 2, "and it stays at two above that");
});

test("the deck prose and the deck map name the same threshold", () => {
  // `decks` and `equipment` say the same thing twice on purpose -- one for the
  // reader, one for the filters -- so they can disagree, and twice they did.
  // bs promised a second pack "for five or more players" while its map started
  // at six; president promised one "at about nine players" while its map said
  // eight, on a game seating at most eight. A reader and a filter gave
  // different answers, and nothing failed.
  //
  // Only prose that states a threshold in a form this can read is judged. The
  // rest is counted and named rather than passed over in silence, because a
  // check that quietly skips most of its subject reads exactly like a clean one.
  const WORDS: Record<string, number> = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7,
    eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13,
  };
  const digits = (s: string) =>
    Object.entries(WORDS).reduce((t, [w, n]) => t.replace(new RegExp(`\\b${w}\\b`, "gi"), String(n)), s);
  // "5 or more" / "from 5 players" / "5+ players" / "at (about) 9 players" all mean N.
  const AT = /\b(\d+)\s+or\s+more\b|\bfrom\s+(\d+)\s+(?:players?|up)\b|\b(\d+)\+\s*players?\b|\bat\s+(?:about\s+)?(\d+)\s+players?\b/gi;
  // "more than 6" / "above 6" mean the step starts at 7.
  const ABOVE = /\b(?:more\s+than|above|over|past|beyond)\s+(\d+)\b/gi;

  const mismatched: string[] = [];
  let judged = 0;
  const unjudged: string[] = [];
  for (const game of games) {
    const map = game.equipment.decks_by_players;
    if (!map) continue;
    const prose = digits(game.decks);
    const stated = new Set<number>();
    for (const m of prose.matchAll(AT)) for (const g of m.slice(1)) if (g) stated.add(Number(g));
    for (const m of prose.matchAll(ABOVE)) stated.add(Number(m[1]) + 1);
    if (stated.size === 0) {
      unjudged.push(game.id);
      continue;
    }
    judged++;
    const lowestKey = Math.min(...Object.keys(map).map(Number));
    const lowestSaid = Math.min(...stated);
    if (lowestKey !== lowestSaid) {
      mismatched.push(`${game.id}: prose says ${lowestSaid}, map starts at ${lowestKey}`);
    }
  }

  assert.deepEqual(mismatched, [], "`decks` prose and `decks_by_players` disagree on when the next pack is needed");
  assert.ok(judged >= 6, `only ${judged} deck thresholds were readable; the patterns have stopped matching`);
  // Named, not hidden: these state their requirement in prose this cannot parse
  // (per-player games, and tables written as "1 deck for 2-5; 2 decks for 6-7").
  assert.deepEqual(
    unjudged.sort(),
    ["contract-rummy", "crazy-eights", "dou-dizhu", "golf-multiplayer", "hand-and-foot", "nertz"],
    "the set of entries whose deck threshold this cannot read has changed -- check the new one by hand",
  );
});

test("a per-player game climbs with every seat", () => {
  const nertz = games.find((g) => g.id === "nertz")!;
  assert.equal(decksNeeded(nertz, 2), 2);
  assert.equal(decksNeeded(nertz, 8), 8, "everyone plays their own deck");
});

test("a game with no map needs the same packs at every count", () => {
  const hearts = games.find((g) => g.id === "hearts")!;
  assert.equal(decksNeeded(hearts, 3), 1);
  assert.equal(decksNeeded(hearts, 6), 1);
});

test("standard_decks is the requirement decksNeeded gives at the minimum table, for every entry", () => {
  // The schema defines standard_decks as the requirement at a game's minimum
  // player count -- decksNeeded's own doc comment repeats the claim, and
  // pick.ts repeats it again, but nothing before this checked it. A step map
  // that keyed its own minimum to something other than standard_decks would
  // make the field's definition false for that entry, and stay silent until
  // someone read the two side by side.
  for (const game of games) {
    assert.equal(decksNeeded(game, game.players.min), game.equipment.standard_decks, game.id);
  }
});

test("a purpose-built pack is never playable from standard decks", () => {
  // standard_decks 0 means a pack ordinary cards cannot stand in for, so no
  // number of decks held may answer yes. This was a real defect in the picker
  // before it was one on the site.
  const koiKoi = games.find((g) => g.id === "koi-koi")!;
  assert.equal(playableWith(koiKoi, 2, 8), false);
});

test("the decks a table needs are the decks it is asked for", () => {
  const mauMau = games.find((g) => g.id === "mau-mau")!;
  assert.equal(playableWith(mauMau, 2, 1), true, "two players, one pack");
  assert.equal(playableWith(mauMau, 8, 1), false, "eight players want two");
  assert.equal(playableWith(mauMau, 8, 2), true);
});

/**
 * The walk that decides what the second fingerprint covers.
 *
 * `nestedProse` is the one definition of which fields sit outside
 * `PROSE_FIELDS` -- it replaced two copies, and the reason a constant exists for
 * the first list is that two copies is two chances to add a field and leave one
 * behind. Both directions, because a walk that quietly returned nothing would
 * make the fingerprint constant and the coverage count a lie.
 */
test("nestedProse finds every field outside PROSE_FIELDS and none inside it", () => {
  const game = {
    setup: "a".repeat(40),
    play: "b".repeat(40),
    goal_and_scoring: "c".repeat(40),
    background: "d".repeat(40),
    variants: [{ name: "Ab", description: "cdef" }],
    layout: { caption: "ghi" },
    figures: [{ caption: "jk", rows: [{ label: "l", cards: [{ note: "mn" }] }] }],
    scoring_table: [{ item: "op", note: "q" }],
  } as unknown as CardGame;

  assert.deepEqual(
    nestedProse(game).map((p) => p.where),
    [
      "variants[0].name",
      "variants[0].description",
      "layout.caption",
      "figures[0].caption",
      "figures[0].rows[0].label",
      "figures[0].rows[0].cards[0].note",
      "scoring_table[0].item",
      "scoring_table[0].note",
    ],
  );
  // 2 + 4 + 3 + 2 + 1 + 2 + 2 + 1, and none of the four 40-character fields.
  assert.equal(nestedProse(game).reduce((n, p) => n + p.text.length, 0), 17);
});

test("the nested fingerprint moves when a caption moves between figures", () => {
  // The field path is hashed with the text. The same words describing a
  // different drawing is an edit, and a stamp should notice -- which it cannot
  // if only the concatenated text is hashed.
  const one = { figures: [{ caption: "x" }, { caption: "y" }] } as unknown as CardGame;
  const two = { figures: [{ caption: "y" }, { caption: "x" }] } as unknown as CardGame;
  assert.notEqual(nestedProseFingerprint(one), nestedProseFingerprint(two));
});

test("every entry's nested prose is found, and it is most of them", () => {
  // Against the real corpus rather than a fixture: a walk that missed a whole
  // container would pass the fixture above and quietly cover nothing here.
  const games = loadGames();
  const carrying = games.filter((game) => nestedProse(game).length > 0);
  assert.equal(carrying.length, games.length, "an entry has no nested prose at all");
  assert.ok(
    new Set(games.map((game) => nestedProseFingerprint(game))).size === games.length,
    "two entries share a nested fingerprint, so the walk is not reading them",
  );
});
