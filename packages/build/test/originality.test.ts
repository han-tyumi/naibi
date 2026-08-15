/**
 * The closeness detector.
 *
 * The whole point is the case a phrase search cannot see: a sentence that
 * follows a source's clause order with different words in the slots. Nothing is
 * quoted, so nothing is searchable, and every pass on this corpus that relied on
 * searching phrases missed exactly this. So the fixtures below are real examples
 * of that shape, and the detector has to catch them while leaving genuinely
 * independent writing alone.
 *
 * Both directions matter. A detector that flags everything is as useless as one
 * that flags nothing — it just moves the work to whoever reads the report.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { readFileSync } from "node:fs";

import { PROSE_FIELDS, SCHEMA_PATH, loadGames, proseFingerprint } from "naibi";
import {
  DEFAULTS,
  PAIR_SAMPLE,
  alignPassage,
  baseline,
  compare,
  comparePrepared,
  contentWords,
  longestRun,
  orderedOverlap,
  prepare,
  samplePairs,
  sentences,
  SOURCES_PER_CHECK,
  sourcesRead,
  type Thresholds,
  words,
} from "../originality.ts";

const flags = (ours: string, theirs: string) => compare(ours, theirs, "fixture");
const flagged = (ours: string, theirs: string) => flags(ours, theirs).length > 0;

// --- the pieces -----------------------------------------------------------

test("prose splits into sentences, bullets included", () => {
  assert.deepEqual(sentences("One thing. Two things!\n- Three things"), [
    "One thing.",
    "Two things!",
    "Three things",
  ]);
});

test("function words are dropped but card vocabulary is not", () => {
  // "deal", "trick", "trump" are the signal, not noise: two sentences naming
  // the same actions in the same order is the thing being looked for.
  assert.deepEqual(contentWords("The dealer deals a trick to the player with the trump"), [
    "dealer",
    "deals",
    "trick",
    "player",
    "trump",
  ]);
});

test("ordered overlap counts matches in sequence, allowing gaps", () => {
  assert.equal(orderedOverlap(["a", "b", "c"], ["a", "x", "b", "y", "c"]), 3);
  assert.equal(orderedOverlap(["a", "b", "c"], ["c", "b", "a"]), 1, "order matters");
  assert.equal(orderedOverlap(["a", "b"], ["x", "y"]), 0);
  assert.equal(orderedOverlap([], ["a"]), 0);
});

test("longest run counts only consecutive words", () => {
  assert.equal(longestRun(words("one two three four"), words("zero one two three nine")), 3);
  assert.equal(longestRun(words("one two three"), words("three two one")), 1);
  assert.equal(longestRun(words("nothing alike"), words("totally different")), 0);
});

// --- the failure mode this project actually has ---------------------------

test("a sentence following a source's clause order is caught, though it quotes nothing", () => {
  const theirs =
    "The dealer deals five cards to each player, one at a time, and places the " +
    "remaining cards face down in the middle of the table to form the stock.";
  // Same things named in the same order; every joining word changed. No shared
  // phrase for a search to find.
  const ours =
    "Each player receives five cards, dealt singly by the dealer, after which " +
    "what is left of the pack goes face down at the centre as a stock.";

  const [match] = flags(ours, theirs);
  assert.ok(match, "the exact shape this detector exists for went unflagged");
  assert.ok(match.order >= DEFAULTS.order, `order was only ${match.order.toFixed(2)}`);
  assert.ok(match.run < DEFAULTS.run, "fixture accidentally shares a long phrase");

  // Not a verdict. Nothing is quoted, so this is a pair worth reading, and the
  // report says so rather than pretending to have decided.
  assert.equal(match.tier, "candidate");
});

test("near-verbatim reuse is a finding, not a suggestion", () => {
  const [match] = flags(
    "The player to the left of the dealer leads the first trick.",
    "The player to the left of the dealer leads to the first trick.",
  );
  assert.equal(match!.tier, "reuse");
});

test("the two tiers are separated by a measured gap, not a guess", () => {
  const source =
    "The dealer deals five cards to each player, one at a time, and places the " +
    "remaining cards face down in the middle of the table to form the stock.";

  const copy = flags(
    "Each player receives five cards, dealt singly by the dealer, after which " +
      "what is left of the pack goes face down at the centre as a stock.",
    source,
  );
  const rewrite = compare(
    "Set the undealt pack down as a stock before anyone picks up. Hands are " +
      "five, and it does not matter whether you deal them singly or in one go.",
    source,
    "f",
    { ...DEFAULTS, order: 0 },
  );

  // The threshold has to sit between these two, or it is decoration.
  assert.ok(copy[0]!.order > DEFAULTS.order, "the copy scores below the bar");
  assert.ok(
    Math.max(...rewrite.map((m) => m.order)) < DEFAULTS.order,
    "an independent rewrite scores above the bar",
  );
});

test("a near-verbatim sentence is caught on the run alone", () => {
  const theirs = "The player to the left of the dealer leads to the first trick.";
  const ours = "The player to the left of the dealer leads the first trick.";

  const [match] = flags(ours, theirs);
  assert.ok(match);
  assert.ok(match.run >= DEFAULTS.run, `longest run was only ${match.run}`);
});

test("genuinely independent writing about the same rule is left alone", () => {
  const theirs =
    "The dealer deals five cards to each player, one at a time, and places the " +
    "remaining cards face down in the middle of the table to form the stock.";
  // Same rule, reorganised: the stock first, the hand size as a consequence,
  // different emphasis. This is what a rewrite is supposed to look like.
  const ours =
    "Set the undealt pack down as a stock before anyone picks up. Hands are " +
    "five, and it does not matter whether you deal them singly or in one go.";

  assert.equal(flagged(ours, theirs), false, "a legitimate rewrite was flagged");
});

test("two entries about unrelated games do not match each other", () => {
  const theirs = "Aces are low and the game ends when a player has no cards left.";
  const ours = "Shuffle the tiles and build a wall two rows high around the table.";
  assert.equal(flagged(ours, theirs), false);
});

test("shared card-game boilerplate alone is not a match", () => {
  // Every rulebook says these. Flagging them would bury the real findings.
  const theirs = "Shuffle the deck. The player to the dealer's left goes first.";
  const ours = "Shuffle the deck. The player to the dealer's left goes first.";
  const found = flags(ours, theirs);

  // They ARE identical, so being flagged is correct — but only because they are
  // identical, not because they are short and common.
  assert.ok(found.length > 0);
  assert.ok(
    flags("Shuffle the deck.", "Shuffle the deck. Then deal.").length === 0,
    "a sentence too short to carry structure was flagged",
  );
});

// --- reporting ------------------------------------------------------------

test("one sentence of ours yields one finding, not one per source sentence", () => {
  const theirs =
    "The dealer deals five cards to each player one at a time. " +
    "The dealer deals five cards to each player one at a time, then stops. " +
    "The dealer deals five cards to each player one at a time again.";
  const ours = "The dealer deals five cards to each player one at a time.";

  assert.equal(flags(ours, theirs).length, 1, "the same problem reported three times");
});

test("a long verbatim run is not hidden by a better-aligned sentence elsewhere in the source", () => {
  // Found on 2026-08-14, in an entry the tool had just passed. Only one match is
  // kept per sentence of ours -- rightly, since a passage matching five pages is
  // one problem -- but it was picked by `order` alone, with `run` breaking ties.
  // So a source sentence that walks our clause order with different words in the
  // slots displaced one sharing eleven words verbatim, and the report named the
  // first: three words, candidate tier, no reuse anywhere. `five-hundred`'s setup
  // shared eleven words with pagat's deal sentence and came back clean.
  //
  // Verbatim reuse is the finding you act on. It must outrank a reading list.
  const ours = "The keeper lifts the lantern, checks the rope, and signals the boat with three short flashes.";
  const aligned =
    "The keeper quietly lifts a battered lantern, then checks a frayed rope, " +
    "and afterwards signals a distant boat using three short flashes.";
  const verbatim =
    "Every evening the harbour watch checks the rope, and signals the boat with " +
    "three short flashes, whatever the weather.";

  // Each is found on its own: the aligned one scores higher on order, the other
  // is outright reuse. The bug was only ever visible with both in one source.
  assert.equal(flags(ours, aligned)[0]?.tier, "candidate");
  assert.equal(flags(ours, verbatim)[0]?.tier, "reuse");

  for (const theirs of [`${aligned} ${verbatim}`, `${verbatim} ${aligned}`]) {
    const [match] = flags(ours, theirs);
    assert.ok(match, "nothing reported at all");
    assert.equal(match.tier, "reuse", "the verbatim run was hidden behind the better-aligned sentence");
    assert.equal(match.theirs, verbatim, "the wrong source sentence was reported");
    assert.ok(match.run >= 7, `run reported as ${match.run}, so the run was never scanned`);
  }
});

test("a finding carries both sentences, so it can be judged rather than trusted", () => {
  const theirs = "The player to the left of the dealer leads to the first trick.";
  const [match] = flags("The player to the left of the dealer leads the first trick.", theirs);

  assert.ok(match);
  assert.equal(match.theirs, theirs, "the source sentence is not reported");
  assert.ok(match.ours.length > 0);
  assert.equal(match.source, "fixture");
});

test("thresholds can be loosened without touching the code", () => {
  const theirs = "Deal seven cards each and turn the next card up to start the discard pile.";
  const ours = "Give everyone seven cards, then turn one card up as the discard pile.";

  const strict = compare(ours, theirs, "f", { ...DEFAULTS, order: 0.95 });
  const loose = compare(ours, theirs, "f", { ...DEFAULTS, order: 0.3 });
  assert.ok(loose.length >= strict.length);
  assert.equal(strict.length, 0);
});

test("empty or missing source text finds nothing rather than throwing", () => {
  assert.deepEqual(flags("Some prose here about dealing cards.", ""), []);
  assert.deepEqual(flags("", "Some source prose about dealing cards."), []);
});

// --- the prose fields, and the consumers that must agree on them -----------

test("the fingerprint covers every field the check reads, and nothing else", () => {
  // The defect this replaces: "which fields are prose" was written out in four
  // places and kept in step by hand. A field added to one and missed in another
  // means either prose that ships unchecked, or a `checked` date that survives
  // an edit to the very text it claims to cover. Both are silent.
  //
  // Tested by behaviour rather than by comparing two lists, because comparing
  // lists only proves they were copied correctly — this proves the fingerprint
  // actually moves with the field.
  const [game] = loadGames();
  assert.ok(game);

  for (const field of PROSE_FIELDS) {
    const edited = { ...game, [field]: `${game[field]} An added sentence.` };
    assert.notEqual(
      proseFingerprint(edited),
      proseFingerprint(game),
      `editing ${field} did not change the fingerprint, so a check of it would survive the edit`,
    );
  }

  // And the other direction: a field nobody could copy a source into must not
  // invalidate a reading of the rules. Adding an alias is not a rewrite.
  assert.equal(
    proseFingerprint({ ...game, aliases: [...game.aliases, "Another Name"] }),
    proseFingerprint(game),
    "a non-prose field invalidated the check, which would make re-reading meaningless busywork",
  );
});

test("every prose field is a string field of the schema", () => {
  // PROSE_FIELDS is typed against keyof CardGame, so a typo cannot compile —
  // but a field could be renamed in the schema while the constant kept the old
  // name and quietly read undefined off every entry.
  //
  // Checked against the schema rather than against an entry, because a prose
  // field is allowed to be optional: asserting it is present on some game would
  // reject exactly the case this list exists to accommodate.
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as {
    properties: Record<string, { type?: string }>;
  };
  for (const field of PROSE_FIELDS) {
    const property = schema.properties[field];
    assert.ok(property, `${field} is not a field of the schema at all`);
    assert.equal(property.type, "string", `${field} is in PROSE_FIELDS but is not prose`);
  }
});

// --- the sample the corpus measurements are taken over ---------------------

/**
 * The corpus, its passages, and the bar measured from them — at most once.
 *
 * Two tests below need the bar, and measuring it is the most expensive thing in
 * this file. It is a pure function of the corpus, so measuring it twice times
 * the machine rather than checking anything.
 */
const games = loadGames();
/**
 * The passages, and which game each one came from.
 *
 * A parallel array rather than arithmetic on the index. A passage's game was
 * `Math.floor(i / 3)` for as long as PROSE_FIELDS held three fields, and
 * stopped being it the day `background` joined: four entries contribute a
 * fourth passage, so every index after the first of them named the wrong game.
 * That went on passing, because what it feeds is compared against a ratio.
 */
const passages: string[] = [];
const gameOf: number[] = [];
games.forEach((game, index) => {
  for (const field of PROSE_FIELDS) {
    const text = game[field] ?? "";
    if (text.length > 0) {
      passages.push(text);
      gameOf.push(index);
    }
  }
});
let measured: Thresholds | undefined;
const bar = () => (measured ??= baseline(passages));

test("the sample is bounded, and does not drop an entry to stay bounded", () => {
  // The reason this exists. Comparing every pair is quadratic, and quadratic in
  // the corpus is the one cost that compounds against adding games: at 72 games
  // these measurements were 61 of the test suite's 62 seconds, and four times
  // the games was fifteen times the work.
  for (const count of [54, 216, 900, 3000]) {
    const pairs = [...samplePairs(count)];
    assert.ok(pairs.length <= PAIR_SAMPLE, `${count} entries drew ${pairs.length} pairs`);
    assert.equal(
      new Set(pairs.map(([i]) => i)).size,
      count,
      `${count} entries but some were never compared with anything`,
    );
    assert.equal(pairs.filter(([i, j]) => i === j).length, 0, "an entry was compared with itself");
    assert.equal(
      new Set(pairs.map(([i, j]) => `${i},${j}`)).size,
      pairs.length,
      "the same pair was drawn twice, so the sample is smaller than it claims",
    );
  }

  // Past PAIR_SAMPLE passages — 1,800 games — the floor of one partner each
  // wins, on purpose: a bar measured over a corpus most of which was never
  // looked at would be worse than a slow one. Linear from there, not squared.
  assert.equal([...samplePairs(20000)].length, 20000);
});

test("the sample does not lean on a passage's neighbours, which are its own game", () => {
  // Passages arrive grouped by game, so a passage's neighbours are its own
  // entry's other fields. Those resemble each other for reasons that have
  // nothing to do with copying, and a sampler drawn from near neighbours would
  // quietly measure that instead. The stride-7 sweep this replaces always took
  // i+1 first, which made 2.15% of its pairs same-game.
  const pairs = [...samplePairs(passages.length)];
  const sameGame = pairs.filter(([i, j]) => gameOf[i!] === gameOf[j!]).length;

  // What an unbiased sample would give. Averaged over passages rather than
  // assumed to be two apiece: an entry carrying a `background` has three
  // same-game partners and the rest have two.
  const sizes = new Map<number, number>();
  for (const game of gameOf) sizes.set(game, (sizes.get(game) ?? 0) + 1);
  const unbiased =
    gameOf.reduce((sum, game) => sum + (sizes.get(game)! - 1), 0) /
    gameOf.length /
    (passages.length - 1);
  assert.ok(
    sameGame / pairs.length <= unbiased * 1.2,
    `${((sameGame / pairs.length) * 100).toFixed(2)}% of sampled pairs are one game's own ` +
      `fields, against ${(unbiased * 100).toFixed(2)}% among all pairs`,
  );
});

test("a second sampling phase draws pairs the first one did not", () => {
  // What makes the rate below a real check rather than a percentile restating
  // itself: the bar is measured on one sample and met on another.
  const measuredOver = new Set([...samplePairs(passages.length)].map(([i, j]) => `${i},${j}`));
  const heldOut = [...samplePairs(passages.length, PAIR_SAMPLE, 1)];

  assert.ok(heldOut.length > 0);
  assert.equal(
    heldOut.filter(([i, j]) => measuredOver.has(`${i},${j}`)).length,
    0,
    "the held-out sample is not held out",
  );
});

// --- against the corpus ---------------------------------------------------

/**
 * Pairs for the fixed-threshold measurement below.
 *
 * Smaller than PAIR_SAMPLE because that measurement only has to show an order
 * of magnitude, not estimate a percentile.
 */
const FIXED_SAMPLE = 720;

test("a fixed threshold cannot separate copying from formulaic prose", () => {
  // Not a failing test — a recorded measurement, and the reason baseline()
  // exists. Entries that copy nothing from each other still match each other
  // in their hundreds at any fixed bar, because there is one natural way to
  // write "deal seven cards to each player, one at a time".
  //
  // Over a fixed sample, so the measurement does not grow with the corpus. The
  // count is what it is over these pairs; the rate is the part that carries.
  const ready = games.map((game) => prepare(game.play, DEFAULTS));
  let matches = 0;
  let pairs = 0;
  for (const [i, j] of samplePairs(games.length, FIXED_SAMPLE)) {
    pairs += 1;
    matches += comparePrepared(ready[i]!, ready[j]!, games[j]!.id, DEFAULTS).length;
  }

  assert.ok(
    matches > 100 && matches / pairs > 0.5,
    `only ${matches} over ${pairs} pairs (${(matches / pairs).toFixed(2)} each) — if this has ` +
      "dropped, the corpus or the metric changed and the claim in DEFAULTS' comment needs " +
      "re-measuring",
  );
});

test("the bar is measured from the corpus, and our own entries mostly clear it", () => {
  const limits = bar();

  // A percentile bar has to land above the floor, or it is not measuring
  // anything and the tool is back to a guessed constant.
  assert.ok(limits.order > DEFAULTS.order, `bar ${limits.order} did not beat the floor`);
  assert.ok(limits.order <= 1, "an impossible bar flags nothing");

  // Held out: phase 1 shares no pair with the phase the bar was measured from,
  // which the test above checks. So this is the bar meeting writing it has not
  // seen, rather than a percentile being asked to confirm itself.
  const ready = passages.map((passage) => prepare(passage, limits));
  let over = 0;
  let pairs = 0;
  for (const [i, j] of samplePairs(passages.length, PAIR_SAMPLE, 1)) {
    pairs += 1;
    if (comparePrepared(ready[i]!, ready[j]!, "x", limits).length > 0) over += 1;
  }

  // Two independent 99th-percentile conditions, so a couple of per cent is
  // right. Much more and the bar is decoration; much less and it is unreachable.
  const rate = over / pairs;
  assert.ok(
    rate > 0.001 && rate < 0.06,
    `${(rate * 100).toFixed(1)}% of ${pairs} held-out pairs cleared their own bar`,
  );
});

test("a verbatim copy clears the measured bar that formulaic prose does not", () => {
  const limits = bar();

  // The end-to-end property, and the half of it a sampling change could break:
  // paste an entry back at itself and the same bar our own unrelated entries
  // sit under has to catch it. Every entry, not one — a bar sampled a little
  // low or a little high still has to be a bar.
  const missed = games.filter(
    (game) => compare(game.play, game.play, "itself", limits).length === 0,
  );
  assert.deepEqual(
    missed.map((game) => game.id),
    [],
    "an exact copy of an entry did not clear the bar",
  );

  // And the other half of the name. Two people describing the same deal is the
  // null hypothesis here, so the measured bar has to leave an independent
  // rewrite of a source alone even though it covers exactly the same ground.
  const theirs =
    "The dealer deals five cards to each player, one at a time, and places the " +
    "remaining cards face down in the middle of the table to form the stock.";
  const rewrite =
    "Set the undealt pack down as a stock before anyone picks up. Hands are " +
    "five, and it does not matter whether you deal them singly or in one go.";
  assert.deepEqual(compare(rewrite, theirs, "rewrite", limits), [], "a rewrite cleared the bar");
});

// --- passage order --------------------------------------------------------

test("a passage that walks a source in the source's own order is flagged", () => {
  // No sentence here is close to its counterpart. What gives it away is that
  // the same points arrive in the same sequence.
  const theirs = [
    "The dealer shuffles and deals seven cards to each player.",
    "The rest of the pack is placed face down to form the stock.",
    "The top card of the stock is turned over to start the discard pile.",
    "The player to the dealer's left plays first.",
    "A player who cannot play must draw from the stock.",
  ].join(" ");
  const ours = [
    "Whoever deals gives out seven apiece after a shuffle.",
    "What remains of the pack sits face down as a stock.",
    "Flip the stock's top card over to begin the discard pile.",
    "Play opens with the person on the dealer's left.",
    "Anyone unable to play draws from the stock instead.",
  ].join(" ");

  const alignment = alignPassage(ours, theirs, "fixture");
  assert.equal(alignment.follows, true, "a passage tracking the source went unflagged");
  assert.ok(alignment.monotonic >= 0.75, `only ${alignment.monotonic} moved forward`);
});

test("the same points in a different order are not flagged", () => {
  // Covering the same ground is not copying. Covering it in someone else's
  // sequence is the signal.
  const theirs = [
    "The dealer shuffles and deals seven cards to each player.",
    "The rest of the pack is placed face down to form the stock.",
    "The top card of the stock is turned over to start the discard pile.",
    "The player to the dealer's left plays first.",
    "A player who cannot play must draw from the stock.",
  ].join(" ");
  const ours = [
    "Anyone unable to play draws from the stock instead.",
    "Play opens with the person on the dealer's left.",
    "What remains of the pack sits face down as a stock.",
    "Whoever deals gives out seven apiece after a shuffle.",
  ].join(" ");

  assert.equal(alignPassage(ours, theirs, "fixture").follows, false);
});

test("a short passage cannot establish an order", () => {
  const alignment = alignPassage(
    "The dealer shuffles and deals seven cards to each player.",
    "The dealer shuffles and deals seven cards to each player. Then play begins.",
    "fixture",
  );
  assert.equal(alignment.follows, false, "one sentence was treated as a sequence");
});

// --- what this cannot do --------------------------------------------------

test("paraphrase that replaces the vocabulary scores like independent writing", () => {
  // Documented, not tolerated. A rewrite that keeps a source's structure but
  // swaps nearly every noun and verb is not mechanically separable from honest
  // writing, which is exactly why the report calls these reading lists and why
  // nothing here can certify an entry clean.
  const theirs = "The dealer deals five cards to each player one at a time.";
  const ours = "Five go to everybody, handed out singly by whoever is dealing.";

  const found = compare(ours, theirs, "f", { ...DEFAULTS, order: 0 });
  assert.ok(found[0]!.order < DEFAULTS.order, "if this now scores high, tighten the docs");
});

// --- what a stamp is allowed to record ------------------------------------

test("source files are recorded under the names the entry attributes", () => {
  // The files are slugs and the attribution is prose. Recording the slug would
  // leave a name no reader could match to anything, so they are mapped back.
  const { read, stray } = sourcesRead(
    ["Pagat", "Bicycle Cards", "Wikibooks Solitaire card games"],
    ["bicycle-cards.txt", "pagat.txt"],
  );
  assert.deepEqual(read, ["Bicycle Cards", "Pagat"]);
  assert.deepEqual(stray, [], "a file that matches an attribution was treated as stray");
});

test("punctuation and case in an attribution do not stop it matching", () => {
  const { read, stray } = sourcesRead(["CardGames.io", "Wikipedia"], ["cardgames-io.txt"]);
  assert.deepEqual(read, ["CardGames.io"]);
  assert.deepEqual(stray, []);
});

test("a source the entry does not attribute comes back as stray, not dropped", () => {
  // Dropping it would record a shorter list than was actually read, which is
  // the failure mode worth guarding: the record would look complete and be
  // wrong. The caller refuses the whole stamp on any stray.
  const { read, stray } = sourcesRead(
    ["Pagat", "Wikipedia"],
    ["pagat.txt", "some-random-blog.txt", "wikipedia.txt"],
  );
  assert.deepEqual(read, ["Pagat", "Wikipedia"]);
  assert.deepEqual(stray, ["some-random-blog"], "an unattributed source was silently accepted");
});

test("one source is never enough for a check", () => {
  // Not a style rule. One source cannot corroborate itself, so a check with a
  // single source is the exact thing `checked.sources` exists to make visible.
  const { read } = sourcesRead(["Pagat", "Wikipedia"], ["pagat.txt"]);
  assert.equal(read.length, 1);
  assert.ok(read.length < SOURCES_PER_CHECK, "the floor no longer rejects a single source");
});

test("no sources on disk records nothing rather than an empty check", () => {
  const { read, stray } = sourcesRead(["Pagat"], []);
  assert.deepEqual(read, []);
  assert.deepEqual(stray, []);
  assert.ok(read.length < SOURCES_PER_CHECK, "an entry with no source text could be stamped");
});

/**
 * Cross-game duplication, which nothing else here can see.
 *
 * `npm run originality` compares an entry against its sources and never against
 * the rest of the collection, so a sentence copied from one of our own entries
 * into another is invisible to it. That is not hypothetical: the 2026-08-01 pass
 * recorded one trick-taking formula propagating into five entries, and on
 * 2026-08-08 `euchre` and `sueca` were found carrying the same twenty-word
 * sentence one article apart.
 *
 * The obvious check does not work and was measured failing. At the bar the
 * source comparison uses there are 357 cross-game pairs, and the top of that
 * list is the vocabulary this project has deliberately kept -- the ace-ten card
 * values, the rummy stock sentence, "deal N cards to each player, one at a
 * time". A hypothesis that multiplicity would separate a propagated formula
 * from shared vocabulary was tested and failed: the legitimate phrases are the
 * most multiple of all.
 *
 * So this freezes instead of judging, the way the oversize-figure list does. At
 * twelve words there are nine pairs, every one of them a formula card games
 * genuinely share, and a tenth has to be argued for rather than arriving
 * unnoticed. The threshold is fixed rather than measured from the corpus,
 * because a moving bar would churn the list on every edit.
 */
const SHARED_RUN = 12;

/** Pairs of entries known to share a run this long, and why that is fine. */
const KNOWN_SHARED: readonly string[] = [
  "belote:setup ~ doppelkopf:setup",
  "belote:setup ~ skat:setup",
  "canasta:setup ~ gin-rummy:setup",
  // canasta:setup ~ hand-and-foot:setup went away on 2026-08-12. The audit
  // rewrote hand-and-foot's deal after finding the packet size is not agreed
  // between sources, and the shared run went with it. Not a deliberate fix --
  // it fell out of a correction made for another reason entirely.
  "crazy-eights:setup ~ spades:setup",
  "doppelkopf:setup ~ skat:setup",
  "hearts:play ~ whist:play",
  "old-maid:setup ~ president:setup",
  "old-maid:setup ~ slapjack:setup",
];

test("no new entry repeats another entry's sentence", () => {
  // A shingle index rather than the pairwise comparison above: same definition
  // of a verbatim run, since runs never cross a sentence boundary there either,
  // but linear in the corpus instead of quadratic. Exhaustive comparison finds
  // the same nine pairs and takes eighty times as long.
  const index = new Map<string, Set<string>>();
  for (const game of loadGames()) {
    for (const field of PROSE_FIELDS) {
      for (const sentence of sentences(game[field] ?? "")) {
        const run = words(sentence);
        for (let i = 0; i + SHARED_RUN <= run.length; i += 1) {
          const key = run.slice(i, i + SHARED_RUN).join(" ");
          let where = index.get(key);
          if (!where) index.set(key, (where = new Set()));
          where.add(`${game.id}:${field}`);
        }
      }
    }
  }

  const found = new Set<string>();
  for (const where of index.values()) {
    const places = [...where];
    for (let i = 0; i < places.length; i += 1) {
      for (let j = i + 1; j < places.length; j += 1) {
        // Two fields of one entry sharing a run is relocation, not repetition.
        if (places[i]!.split(":")[0] === places[j]!.split(":")[0]) continue;
        found.add([places[i]!, places[j]!].sort().join(" ~ "));
      }
    }
  }

  assert.deepEqual(
    [...found].sort(),
    [...KNOWN_SHARED].sort(),
    "cross-game duplication changed. A new pair means one entry now repeats " +
      "another's sentence: rewrite one of them. A pair that disappeared means " +
      "somebody fixed one, so delete it from KNOWN_SHARED and say so.",
  );
});

/**
 * The second way this tool hid a verbatim run, found on 2026-08-15 by an
 * exhaustive longest-run sweep over a corpus the tool had just passed.
 *
 * `prepare()` dropped any sentence with fewer than `minWords` content words, so
 * one in seven of our sentences could not be reported however many words it
 * shared with a source. `twenty-nine`'s "The player to the dealer's left
 * leads." has four content words and seven of them verbatim in pagat's play
 * section; the run below is that case with the sentences shortened.
 *
 * The order ratio is still not computed for a pair that short -- a ratio over
 * four words is noise, which is what minWords was always for.
 */
test("a run in a sentence too short to score is still reported", () => {
  const ours = "The player to the dealer's left leads.";
  const theirs =
    "The player to the dealer's left leads to the first trick, and the winner of each " +
    "trick leads to the next one after that.";
  const found = compare(ours, theirs, "src", { order: 0.8, run: 7, minWords: 5 });

  assert.equal(found.length, 1, "the short sentence was dropped instead of compared");
  assert.equal(found[0]!.tier, "reuse");
  assert.ok(found[0]!.run >= 7, `run was ${found[0]!.run}`);
  // No order score is claimed for a pair that cannot carry one.
  assert.equal(found[0]!.order, 0);
});

test("a short sentence still cannot be flagged on order alone", () => {
  // The same shortness that must not hide a run must go on hiding a ratio: two
  // four-word sentences naming the same two things score 1.0 and mean nothing.
  const found = compare("The dealer shuffles.", "The dealer shuffles.", "src", {
    order: 0.8,
    run: 7,
    minWords: 5,
  });
  assert.deepEqual(found, [], "a three-word sentence was reported on its order score");
});

test("a sentence of nothing but function words does not score", () => {
  // prepare() no longer drops these, so they reach the comparison and their
  // mass is zero. A NaN here would compare false against every threshold and
  // read like a real number in the report.
  const found = compare("It is in the of and to.", "It is in the of and to.", "src", DEFAULTS);
  for (const match of found) assert.ok(Number.isFinite(match.order), "order came back NaN");
});

/**
 * The differential test: an exhaustive longest-run sweep, and the checker,
 * must agree.
 *
 * The checker has hidden a verbatim run twice, and neither time did any test
 * here notice. On 2026-08-14 it ranked a tidy alignment above a longer
 * quotation; on 2026-08-15 it dropped short sentences before comparing at all.
 * Both were found the same way — by scoring every sentence pair exhaustively,
 * with no ranking, no early-out and no one-match-per-sentence rule, and reading
 * the difference. That instrument is what this test is.
 *
 * The scan below is deliberately naive and deliberately not imported from the
 * module under test: it is the second opinion, and a second opinion that shares
 * the first one's code is not one. What it asserts is the property the whole
 * tool rests on — **a run at or over the bar is never hidden** — plus the
 * stronger one that fell out of ranking reuse on the run: the number reported
 * is the longest run there actually is.
 *
 * Sources are not available here (`.sources/` is gitignored and absent in CI),
 * so our own passages stand in for them. That is the harder case rather than a
 * weaker one: entries that copy nothing from each other still share the
 * formulaic sentences this corpus is full of, so there are real runs to find.
 */
test("no run at the bar is hidden, and the run reported is the longest one", () => {
  const limits = bar();

  /** Every sentence of `ours`, with the longest run it has anywhere in `theirs`. */
  const exhaustive = (ours: string, theirs: string) => {
    const mine = sentences(ours).map((s) => ({ text: s, raw: words(s) }));
    const source = sentences(theirs).map(words);
    return mine
      .map((a) => ({
        text: a.text,
        run: source.reduce((best, b) => Math.max(best, longestRun(a.raw, b)), 0),
      }))
      .filter((s) => s.run >= limits.run);
  };

  let compared = 0;
  let runs = 0;
  for (const [i, j] of samplePairs(passages.length, 1200)) {
    compared += 1;
    const found = new Map(
      compare(passages[i]!, passages[j]!, "x", limits).map((m) => [m.ours, m]),
    );
    for (const { text, run } of exhaustive(passages[i]!, passages[j]!)) {
      runs += 1;
      const match = found.get(text);
      assert.ok(
        match,
        `a ${run}-word run was not reported at all:\n  ${text}`,
      );
      assert.equal(
        match.tier,
        "reuse",
        `a ${run}-word run was reported as a reading-list match:\n  ${text}`,
      );
      assert.equal(
        match.run,
        run,
        `the report understates the run it found (${match.run} against ${run}):\n  ${text}`,
      );
    }
  }

  // Silence is not coverage: a sweep that found nothing to check would pass
  // this test while asserting nothing at all about the checker.
  assert.ok(
    runs > 20,
    `only ${runs} runs over ${compared} pairs — the sweep is not finding enough to check`,
  );
});

/**
 * The half of that property the corpus cannot exercise.
 *
 * "The run reported is the longest one" needs a sentence of ours with TWO
 * verbatim partners, the tidier of which is the shorter — and that shape does
 * not arise between our own passages, so the sweep above passes with the old
 * ranking in place. It is the shape a real source produces all the time: a page
 * that states a rule twice, once in its own words and once in a heading.
 *
 * Under the ranking this replaced, the tidier partner won on its order score
 * and the report named ten words where there were fourteen.
 */
test("between two verbatim partners the longer quotation is the one reported", () => {
  const ours = "The dealer shuffles the pack and deals five cards to each player one at a time.";
  const tidier =
    "The dealer shuffles the pack and then deals five cards to each player, one at a time.";
  const longer =
    "Before anything else somebody shuffles the pack and deals five cards to each player " +
    "one at a time, which takes a while.";
  const limits = { order: 0.8, run: 7, minWords: 5 };

  // Separately: the tidier one scores higher and quotes less.
  assert.deepEqual(
    [tidier, longer].map((t) => {
      const [m] = compare(ours, t, "src", { order: 0.01, run: 99, minWords: 5 });
      return [m!.run, Number(m!.order.toFixed(2))];
    }),
    [[10, 1], [14, 0.9]],
    "the fixture no longer has one partner tidier and the other longer",
  );

  const found = compare(ours, [tidier, longer].join("\n"), "src", limits);
  assert.equal(found.length, 1, "one sentence of ours is one finding");
  assert.equal(found[0]!.run, 14, "the report named the tidier partner over the longer quotation");
});

/**
 * `--stamp-nested` amends, and that is the whole of why it exists.
 *
 * A pass that reads only the prose hanging off the structured data must not
 * touch the sections' record. Stamping "both" from such a pass would move every
 * entry's `checked.date` to that day -- claiming a fact-check nobody made, and
 * moving the entry between dates in the audits ledger, where the counts are
 * keyed on exactly that field. Found by running the real thing against the real
 * corpus before using it, which is the only way this shows up.
 */
test("a nested stamp leaves the sections' record exactly as it stands", () => {
  const before = {
    checked: {
      date: "2026-08-12",
      prose: "a".repeat(16),
      sources: ["Pagat", "Wikipedia"],
      reworded: { date: "2026-08-15", prose: "b".repeat(16) },
    },
  };
  const nested = { date: "2026-08-16", prose: "c".repeat(16), sources: ["Pagat", "Wikipedia"] };

  // What the "nested" branch does, spelled out: spread the existing record and
  // replace one key.
  const after = { ...before.checked, nested };

  assert.equal(after.date, before.checked.date, "the sections' date moved");
  assert.equal(after.prose, before.checked.prose, "the sections' fingerprint moved");
  assert.deepEqual(after.sources, before.checked.sources, "the sections' sources moved");
  assert.deepEqual(after.reworded, before.checked.reworded, "a wording amendment was dropped");
  assert.deepEqual(after.nested, nested);
});

test("the ledger keys on the field a nested stamp must not touch", () => {
  // Not a restatement of the test above but the reason for it: every entry's
  // `checked.date` is what docs/audits/ counts, so a stamp that moved them all
  // to one day would collapse the ledger into a single date and the test that
  // guards it would be the only thing that noticed.
  const dates = new Set(loadGames().map((game) => game.checked?.date).filter(Boolean));
  assert.ok(
    dates.size > 3,
    `the corpus is stamped across ${dates.size} dates; if this ever reads 1, a stamp ran wide`,
  );
});
