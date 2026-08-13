# 2026-08-12 — Hand and Foot and Indian Rummy: a meld the entry did not have

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-12

## What was checked

**10 entries, checked 2026-08-12** — the day's total across all five records of
the date, not this sitting's. This sitting read `hand-and-foot` and `indian-rummy`; the day's other eight are in
[the golf and TriPeaks record](2026-08-12-golf-and-tripeaks.md),
[the Yukon and Forty Thieves record](2026-08-12-yukon-and-forty-thieves.md),
[the Beggar-My-Neighbour and Egyptian Ratscrew record](2026-08-12-beggar-and-ratscrew.md) and
[the Tarneeb and Twenty-Nine record](2026-08-12-tarneeb-and-twenty-nine.md).

**Two audited, two faulty, fifteen wrong or unsupported statements between
them** — eleven in `hand-and-foot` and four in `indian-rummy`.

**11 entries remain on 2026-08-03.**

Sources, read with the text open: `hand-and-foot` against
[pagat](https://www.pagat.com/rummy/handfoot.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Hand_and_Foot); `indian-rummy` against
[pagat](https://www.pagat.com/rummy/indian.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Indian_Rummy).

## The Hand and Foot source is a section of an article about Canasta

`Hand and Foot` redirects to **Canasta**, landing on the fragment
`#Hand and Foot Canasta`. This is the second time in two sittings that a mapped
Wikipedia source has turned out to be an article about a related but different
game — `twenty-nine` redirects into *Twenty-eight* the same way — and it is the
same discipline that handles it: only the section naming the game is usable, and
everything else on the page belongs to the parent.

That matters here because the parent is so close. Canasta and Hand and Foot
share wild twos and jokers, red threes, melds of seven and the discard-pile
rules, so a sentence lifted from the wrong part of the page would look right and
be wrong. **Two of this entry's pre-existing REUSE findings were against
Canasta's general rules rather than the Hand and Foot section** — the
discard-pile turn-up and the red-threes procedure — which is the shape that risk
takes: not a false rule, but our wording tracking the parent game's article.

## `hand-and-foot` — eleven

**The flagship is a whole category of meld the entry did not know about.**

1. **The wild canasta was missing entirely.** The fuller source gives three kinds
   of meld, not two: clean, dirty, and one made of nothing but wild cards. It is
   worth **1500** — more than a clean and a dirty canasta put together, and the
   largest single number in the game. The entry said "the two kinds are counted
   separately all game" and had no third.
2. **And completing one is a condition of going out.** The source says it twice,
   once in the rules for melds — "in fact you must make such a meld to be allowed
   to go out and win the deal" — and again in the going-out conditions: two dirty,
   two clean **and one wild**. The entry's quota was "two clean and two dirty",
   so a side following it would have declared a deal it was not entitled to end.
3. **A second going-out condition was missing.** Your partner must already be
   into their foot, with at least part of a turn played from it. The entry knew
   the fact was important — it says a partner stuck in their hand "cannot help
   you finish" — but never stated it as a requirement.
4. **The rule against stripping yourself bare was missing.** A player who cannot
   go out must keep at least two cards: one to discard and one to carry on with.
5. **The wild-card limit was loose and hedged where the source is exact.** "Most
   tables cap a dirty meld at two wild cards and insist the naturals always
   outnumber them; a few allow three." The rule is a ratio — at least twice as
   many naturals as wilds — which works out as at most one wild below six cards
   and at most two at six or seven. Two prevalence markers on a rule nobody
   ranked, wrapped around an inequality that was too weak.
6. **A wild card on top of the discard pile was called untakeable.** "A wild card
   on top is as untakeable as a black three on top." It is takeable, by a player
   holding two matching wilds — two twos for a two, two jokers for a joker. Only
   a three blocks the pile outright.
7. **Red threes only ever paid.** The entry gave +100 for each one laid face up
   and never mentioned that each one *not* laid down costs 100. That is the same
   sentence in the source, and it is the sharpest edge on the entry's own point
   about unopened feet: a foot you never reached is charged for at face value
   *and* for any red three buried in it.
8. **The deal size was stated flatly and is not agreed.** "Deal two packets of
   eleven." Eleven in each is one published figure; the fullest account deals
   thirteen in each; a third version deals eleven as the hand and thirteen as the
   foot. The entry picked one silently.
9. **Six players were split the wrong way.** "Six splits into three pairs." The
   source gives six as two teams of three.
10. **The singles quota was ranked and wrong.** "Going-out quotas are usually cut
    to one clean and one dirty canasta." Nothing counts groups, and the figure
    that is published for the singles game is one clean and two dirty.
11. **`sources_consulted` did not list Wikipedia**, though the entry rests on it.
    This one was not found by reading: **the stamp refused.** `--stamp` will not
    record a source file it cannot match to the entry's own list, so it stopped
    with "source file(s) Wikipedia match nothing in sources_consulted" and
    declined to stamp either entry in the batch. That guard is described in
    CONTRIBUTING and this is the first time this audit has actually tripped it.

**And the `layout` caption went stale as a result of finding 8** — it read
"Eleven cards in each packet" while the corrected setup says the size is not
agreed. It now says "two equal packets, eleven cards each here", which is what a
diagram can honestly claim. That is the corrected-fact-in-a-caption category
again, and this time the sitting created it rather than inherited it.

**The `figures` caption went the same way**, and for the same reason: it read
"the difference between a clean and a dirty canasta is worth 200 points" — true,
and now the least of it, with a third kind of pile worth 1500 sitting
unmentioned. Rewritten. Neither caption edit moved the entry's `checked`
fingerprint, because captions are outside `PROSE_FIELDS`; that gap was recorded
in [an earlier record of this date](2026-08-12-yukon-and-forty-thieves.md) and
this sitting is a second demonstration of it.

**A cross-game duplication disappeared as a side effect.** `npm test` guards a
list of entry pairs known to share a twelve-word run, and it failed here because
a pair had *gone*: `canasta:setup ~ hand-and-foot:setup`. Rewriting the deal
after finding 8 took the shared run with it. Nothing was aimed at that pair, and
the test is right to make somebody say so rather than let the list quietly drift
— the entry it was shared with is `canasta`, one of the six clean entries in the
whole corpus.

**What survived is worth naming.** Every card value is exact — jokers 50, twos
and aces 20, eight through king 10, four through seven 5, black threes 5 — as are
the four minimum melds of 50, 90, 120 and 150, the two-card draw, the seven-card
pile limit, the seven cards taken from the discard pile, the two ways of getting
into the foot and the one-turn difference between them, and the four-deal game.
The arithmetic of the pack is right too: five decks and their ten jokers is 270
cards.

## `indian-rummy` — four

**This entry is very accurate**, and against the fuller of its two sources it is
close to exact: the seating draw, the anti-clockwise deal and play, the
crosswise stock over the turned card, the wild rank plus both printed jokers, the
printed-joker exception that leaves exactly one wild in the hand, run and set
definitions with the K-A-2 exclusion, the no-overlap rule, the straight run test
with its own worked example, the two lives, packing at 10 and 40 with the
different fates of the packer's cards, the void hand, the half rate on a
first-draw declaration and the doubling on Hand-Rummy. None of that needed
touching.

1. **The player maximum matched neither source.** The entry capped the table at
   eight. One source says as many as ten can play, "beyond this number it is
   perhaps not practical for all the players to sit around a table"; the other
   says two to six. Eight is between them and is in neither. Now ten, with the
   reason.
2. **A frequency claim contradicted its source.** "It is played for small stakes
   about as often as it is played for nothing." The source says the opposite
   plainly: "usually Rummy is played for small stakes."
3. **A winning shape was missing.** Three combinations can be 5-4-4 *or* 5-5-3;
   the entry gave only the first.
4. **The scoring conventions were half-stated.** The 80 cap was attributed to the
   pool formats alone, where the source states it generally, and the convention
   of rounding a hand to the nearest five — 62 recorded as 60 — was absent.

## Recorded, not acted on

- **Three of `hand-and-foot`'s five variants rest on nothing read here.** Hand,
  Knee and Foot appears in neither source. The exact cut appears in neither. And
  Pennies from Heaven is real — the fuller source refers to it by name and says
  another version "has much in common" with it — but its rules live on a separate
  page that was not read, so the entry's description of it (the sevens canasta,
  the bonus, the card set aside) is unsupported here. All three are left in place
  with their hedges.
- **`indian-rummy`'s "Only one run required" variant** is in neither source.
- **`hand-and-foot`'s two-or-three draw piles**, the cut-your-own-packet deal and
  the high-card cut for first deal are all in neither source. Harmless table
  practice; named here rather than removed.
- **The going-out quota is genuinely unsettled** and the entry now says so. The
  two sources give two clean, two dirty and one wild on one hand, and three clean
  and four dirty with no wild requirement on the other. Neither is presented as
  the standard, and there is no governing body to appeal to — which the entry's
  own house-rules variant already said before this sitting.

## The originality pass, run after the fact fixes

**Both entries clean.** Both tools were controlled in both directions first: the
Wikipedia API returned an explicit `missing` marker for an invented title and
logged the Hand and Foot → Canasta redirect on the real one, and pagat answered
404 under "404 Not Found" for an invented path. The checker was then controlled
per entry against each source file by planting a copied sentence in each — 22 and
23 words for `hand-and-foot`, 18 and 23 for `indian-rummy` — each returned with
the right attribution and removed before the clean run.

**Five claims introduced by this sitting's own corrections were caught before the
stamp.** Three were REUSE the tool found, one of them mine — a rewritten
going-out condition that ran eleven words with the source — and two inherited.
Two more were caught by re-reading: "eleven in each is widely written down" and
"six is usually given as two teams of three", both prevalence markers written
into sentences whose whole purpose was to remove one. That is now the eighth
sitting running for this failure mode and the second in which the sentence
carrying the new claim was the sentence fixing the old one.

## What this pass does not establish

Nothing about the 11 entries still carrying a 2026-08-03 stamp. `hand-and-foot`
is the most heavily corrected entry of the five sittings on this date and
`indian-rummy` among the cleanest, which is a fair illustration of how little the
count of findings predicts the next entry. The variants named above rest on
nothing read. Where the sources disagreed — the deal size, the going-out quota —
the entry now says so impersonally rather than choosing. And the Hand and Foot
reading rests on a section of an article about Canasta: **everything taken from
it came from the passage naming Hand and Foot**, and the two REUSE findings
against the parent game's general rules are the evidence that the distinction is
not academic.
