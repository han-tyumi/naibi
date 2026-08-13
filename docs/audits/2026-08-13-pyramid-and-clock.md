# 2026-08-13 — Pyramid and Clock: what counts as a win, and a name that means four games

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-13

## What was checked

**5 entries, checked 2026-08-13** — the day's total, not this sitting's. This
sitting read `pyramid` and `clock`; two further sittings the same day read `speed`
and `fan-tan`, then `tien-len`, recorded in
[2026-08-13-speed-and-fan-tan.md](2026-08-13-speed-and-fan-tan.md) and
[2026-08-13-tien-len.md](2026-08-13-tien-len.md). The last of those sorts after
this file and is the one the ledger test reads the day's count from. All three
records state the same 5.

**Two audited, two faulty, seven wrong or unsupported statements between them** —
four in `pyramid` and three in `clock`.

**7 entries remained on 2026-08-03 when this sitting ended.** The later sitting of
the same day took that to 5.

Sources, read with the text open: `pyramid` against
[Wikipedia](https://en.wikipedia.org/wiki/Pyramid_(solitaire)) and
[Game Rules](https://gamerules.com/rules/pyramid-solitaire/); `clock` against
[Wikipedia](https://en.wikipedia.org/wiki/Clock_(card_game)) and
[Game Rules](https://gamerules.com/rules/clock-patience/). Both entries gained
`GameRules.com` in `sources_consulted`; neither had it, and `--stamp` refuses a
source file it cannot match, so this had to be fixed before either could be
stamped. That guard fired for the second time in two sittings.

## The rate limit, and the trap it sets

**Wikipedia rate-limited this sitting twice**, and the first time it did exactly
what the originality skill warns about: answered **HTTP 200** with the plain text
`You are making too many requests`, which the extractor swallowed and wrote out
as a **zero-byte source file**. Both entries' Wikipedia files were left present
and empty.

That is the failure the skill records verbatim — "the source file was left
present and empty, the run reported the entry clean, and it stamped" — and it is
worth recording that it is still live, because nothing about it looks wrong. The
files exist. The directory listing is unremarkable. `npm run originality` would
have compared each entry against one real source and one empty one, found
nothing, and reported clean; `--stamp` refuses fewer than two sources and cannot
refuse two files one of which is empty.

Three things caught it and all three are cheap:

- the fetch helper was changed to **refuse a body that is not JSON** rather than
  let the extractor fail into an empty file;
- the empty files were **deleted rather than left**, so a later step could not
  mistake them for sources;
- the two-fetch **byte-count agreement** check ran on every file, which is what
  proved the eventual pyramid and clock fetches good (4,184 and 3,387 bytes,
  twice each).

The backoff took two rounds and roughly six minutes. Nothing was stamped until
both entries had two non-empty sources that agreed with themselves.

## `pyramid` — four

1. **What counts as a win was stated flatly, and the sources give opposite
   answers.** The entry: "You win by dismantling the whole pyramid: all 28 cards
   removed. Cards left in the stock or waste are ignored." One source agrees —
   "the game technically is won once the pyramid is gone so not all of the 52
   cards will necessarily need to make it to the discard pile". The other says
   the opposite in its own rules — "To be considered won, all cards (cards from
   the pyramid and cards from the stock) must be moved to the foundation" — and
   files the pyramid-only reading as a *variant* called **Relaxed Pyramid**.
   **Our base rule is one source's variant and our variant is the other source's
   base rule.** The entry now gives both and says to settle it, and the
   `Clear everything` variant says which account calls which the default.
2. **A prevalence claim about software.** "Most computer versions default to
   three passes instead." Nothing counts computer versions. One source does name
   the three-pass form — **Par Pyramid**, which the entry's variant did not
   name — so the variation is real and only the count was invented.
3. **A figure the entry lacked and a source gives.** "A clear is genuinely
   uncommon" where the source says the odds under the strictest rules are around
   1 in 50. Vague where the page it rests on is exact.
4. **The stock's face was stated flatly where the sources differ.** Face down in
   one, face up in the other, and the same article notes that the Microsoft
   version deals it face up. It changes no rule and it changes what you know, so
   the entry now says so.

**Two variants the sources give were missing**, both of which change the game
noticeably: a **reserve row** of seven cards below the pyramid, available all
game, which both sources describe; and the rule that lets a card be removed
**together with the card it covers**, so an exposed ace takes the queen under it
provided nothing else covers either. The entry described the strict form of the
second without mentioning that the loose form exists.

**The arithmetic and the mechanics came through clean.** The 28-card pyramid in
seven rows, 24 to the stock, the six pairings that make 13, kings going alone,
the covering rule, waste-to-waste pairing, and the scoring convention of one
point per card left standing. The figure is right too: six pairs summing to 13
and a king by itself.

## `clock` — three

1. **"Used as a fortune-telling toy."** In neither source. The rest of that
   sentence — that Clock is handed to children rather than played as a contest —
   is supported: one source calls it "a purely mechanical process with no room
   for skill", the other "a game of pure luck".
2. **A win rate on a game neither source describes.** The Grandfather's Clock
   variant claimed "the large majority of deals can be won". Nothing measures
   that, and neither source gives Grandfather's Clock's rules at all — it appears
   in one only as a name on a list of unrelated games also called Clock. The
   claim is gone; the rest of the description is named below as unverified.
3. **"One rescue per deal only"** on the Watch variant. One source describes
   Watch without a limit, the other's phrasing does not settle it.

**The odds are exactly right and worth saying so.** "One deal in thirteen, a
shade under eight per cent" — the source gives "exactly 1 in 13", and 1/13 is
7.69%. The entry's own derivation of *why* the chain can only die at the centre
is sound and is in neither source: every hour pile receives four cards and gives
four, while the centre gave one away before the game started, so it runs one turn
ahead of its supply all game. That reasoning also disposes of the beginner's
worry the entry names, and it holds.

**A `background` was added, and the reason is a name collision four deep.** The
entry carried "The Clock" as an alias with no hint of the trouble in it. One
source sets out both directions: Travellers, Hidden Cards and Four of a Kind are
offered elsewhere as other names for *this* game and are not — they are separate
descendants of an older game called Wandering Card, with different layouts and
different shuttling rules, or in Four of a Kind's case a different mechanism
entirely. Pulling the other way, Big Ben, Grandfather's Clock, a Simple Addition
game, and a German stock-and-waste patience published as *Die Uhr* are all called
Clock or The Clock and none of them is this. The background now says so, and
gives the reader the one-line test: check whether the kings go in the middle.
This collection has been bitten by exactly this shape before, on either side of
`canfield` and `klondike`.

## The originality pass, run after the fact fixes

**Both entries clean.** Both tools were controlled in both directions first — an
invented Wikipedia title returns an explicit `missing` marker, an invented Game
Rules path answers 404 under "Page not found" with a 46 KB body — and the
checker was then controlled per entry against each source file by planting a
copied sentence in each. All four came back correctly attributed: 21 words off
Wikipedia and 15 off Game Rules for `pyramid`, 12 and 18 for `clock`.

**Three claims introduced by this sitting's own corrections were caught before
the stamp**, all three REUSE the tool found, and all three in sentences written
to fix a finding: the new odds sentence ran eight words with its source, the new
name-collision sentence ran eight, and the rewritten "no room for skill" sentence
ran ten. That is the tenth sitting running for this failure mode, and the third
in which every instance was in a correction rather than in inherited prose.
Writing beside an open source is the cause, which is why it was added to
CONTRIBUTING's numbered steps
[the same day](2026-08-12-banking-pair.md).

## Recorded, not acted on

- **`clock`'s Grandfather's Clock description rests on nothing read.** Twelve
  foundations built up in suit to the card matching each hour, forty cards in
  eight columns of five, Big Ben as the two-pack relative — none of that is in
  either source, which name the game only. Its arithmetic checks out internally
  (12 + 40 = 52) and it was left in place.
- **`clock`'s "Play it out" variant** — restarting the chain and scoring by the
  number of restarts — is in neither source.
- **`clock`'s aliases** are confirmed except that one source also gives
  **Clocktime**, which the entry does not carry. Left for the alias sweep.
- **`pyramid`'s aliases "Solitaire Thirteen" and "Pile of Twenty-Eight"** are in
  neither source. Same disposition.
- **`pyramid`'s Apophis, Giza and Draw three** all check out against one source,
  including Giza's attribution to Michael Keller and its eight piles of three.

## What this pass does not establish

Nothing about the 7 entries still carrying a 2026-08-03 stamp. Where the sources
disagreed — what counts as a win, whether the stock is face up — the entries now
say so impersonally rather than choosing, and this record names the
disagreements. The variants named above rest on nothing read. The originality
tool cannot certify either entry clean, and both clean results are what a
controlled tool finding nothing looks like — which this sitting has a sharper
than usual reason to insist on, having spent its first twenty minutes holding two
source files that were the right size to exist and the wrong size to say
anything.
