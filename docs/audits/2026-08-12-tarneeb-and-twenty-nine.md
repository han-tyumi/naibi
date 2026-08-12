# 2026-08-12 — Tarneeb and Twenty-Nine: two auctions, and an entry that was mostly right

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-12

## What was checked

**10 entries, checked 2026-08-12** — the day's total across all five records of
the date, not this sitting's. This sitting read `tarneeb` and `twenty-nine`; the day's other eight are in
[the golf and TriPeaks record](2026-08-12-golf-and-tripeaks.md),
[the Yukon and Forty Thieves record](2026-08-12-yukon-and-forty-thieves.md),
[the Beggar-My-Neighbour and Egyptian Ratscrew record](2026-08-12-beggar-and-ratscrew.md) and
[the Hand and Foot and Indian Rummy record](2026-08-12-rummy-pair.md).

**Two audited, two faulty, eight wrong or unsupported statements between them** —
four in each. That is the lightest sitting of the four, and the reason is worth
recording rather than padding: **`twenty-nine` is the most accurate inherited
entry this audit has read.** Its ranking, its card values, its 28-point total,
its bid floor and ceiling, the forced dealer bid, the secret trump indicator, the
reveal-on-shortage rule, the Royals adjustment with both its caps, the game-point
scoring and the six-pip scoreboard all check out line for line. So do all five of
its variants, in detail — down to the Delhi tables that use twos for reverse and
jokers or threes for the no-trump forms. It was written from the same page this
sitting read, and written carefully.

**13 entries remain on 2026-08-03.**

Sources, read with the text open: `tarneeb` against
[pagat](https://www.pagat.com/auctionwhist/tarneeb.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Tarneeb); `twenty-nine` against
[pagat](https://www.pagat.com/jass/29.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Twenty-eight_(card_game)).

## The Twenty-Nine source is an article about a different game

`Twenty-nine (card game)` redirects to **Twenty-eight (card game)**, exactly as
[the source map](../specs/2026-08-11-source-map-for-the-unverified-32.md) warns.
The redirect was logged by the fetch, so there was no doubt about what had been
retrieved — but it makes the article usable only in the places where it speaks
about 29 by name, and that is a much smaller page than it looks.

**The trap is live and it was nearly stepped in.** The article carries a scoring
ladder reading "20 to 29 — if the bidding team wins, they get 1 point and if they
lose the opponents get 2 points", which reads like a scoring rule for this game
and is nothing of the kind: it belongs to **Forty**, a six-player variant
described three sections further down, and the "29" in it is a bid range rather
than the game's name. Reading the section headings rather than grepping the page
is what separated them.

The same applies to direction. Twenty-eight is played **anti-clockwise**, and its
article says so in the bidding section; 29 is played **clockwise**. An entry built
by pattern-matching on that page would have reversed the game. Ours had it right.

Where the article does speak about 29, it disagrees with pagat about the minimum
bid, and with itself: the Twenty-Nine section says bidding starts from 16, a
parenthesis in the bidding section says 17, and pagat says 15 with 16 as a named
variation. The entry now says the floor is not agreed.

## `tarneeb` — four

1. **The `setup` had the wrong player leading, and contradicted the entry's own
   `play` section.** "The player sitting on the dealer's right both speaks first
   and leads first." Speaking first is right. Leading is not: both sources give
   the first lead to whoever wins the auction — "the final bidder then announces
   the trump suit and leads to the first trick", "the player who won the auction
   leads to the first trick" — and `play` said so correctly three paragraphs
   later. A reader who set the table from `setup` would have opened the hand from
   the wrong seat.
2. **An origin was firmed up past its source.** "Most likely originating in
   Lebanon" against "possibly having originated in Lebanon"; the other account
   only traces the game to the Levant. Now "may have originated".
3. **Two prevalence claims about signalling, in one sentence.** "Common in casual
   play and disapproved of nearly everywhere that takes the game seriously."
   Nothing counts casual play, and what the source actually says is narrower —
   the practice is "not allowed in some areas and generally frowned upon". The
   rewrite also picked up what the entry had left out: these moves have names.
   Slamming a card asks for the suit back; flicking the last card of a suit is
   **na'f**.
4. **"Common enough in some regions to be assumed rather than announced"** on the
   trump-lead variant. Both sources give it as a regional rule and neither says
   anybody assumes it.

**Four things the sources give that the entry did not**, all now in: the game is
played in Tanzania as well as the Middle East; some tables run the whole game
clockwise, in which case the dealer's left opens; some force the dealer to bid
seven if the first three pass rather than killing the hand; and the hopeless-hand
throw-in is presented as a standing right by one account and as an optional rule
by the other, which the variant now says.

**The scoring came through untouched, and it is the part most worth trusting.**
Bid seven and take ten and you score ten, not seven. A contract that stands up
leaves the defenders on nothing at all. Kaboot off a low bid pays 16, thirteen
bid and made pays 26, thirteen bid and missed costs 16 with the defenders
doubled. Every one of those is exact in both sources. So is the entry's judgement
call on the target score — it says the accounts genuinely split on whether 31 or
41 is the default, and they do: pagat gives 31 with 41, 51 and 61 by agreement,
Wikipedia gives 41 with 31 and 61 as regional. That sentence was already right
and is the kind of thing this audit usually has to add.

## `twenty-nine` — four

1. **The scoreboard was short by two cards, and the entry contradicted itself.**
   `setup` said "the two sixes are the scoreboard". There are four: each
   partnership takes one red six and one black six — which `goal_and_scoring`
   states correctly. A reader following `setup` would have set aside half the
   scoreboard.
2. **Direction was stated flatly where a source gives a regional reversal.** The
   entry said only "play goes clockwise". That is the main rule and it is right,
   but some regions play 29 counter-clockwise, with the dealer's right bidding
   first and leading — and the Bangladesh version the source describes at length
   is one of them. Direction is the third category in this audit's taxonomy and
   this is the second entry in two sittings to have the base rule right and the
   variation missing.
3. **The bid floor was stated flatly where the accounts disagree.** "Fifteen is
   the floor and 28 the ceiling." Fifteen is pagat's figure; 16 appears both as a
   named variation there and as the flat rule in the other account, which
   elsewhere says 17. The entry's `scoring_table` already carried "some tables
   start at 16" as a note, so the disagreement was known to whoever wrote it and
   simply had not reached the prose.
4. **"The commonest addition to the game"** on the doubling ladder. Nothing ranks
   additions, and the source lists a dozen variations without ordering them.

**What did not need touching is the interesting part.** The J-9-A-10-K-Q-8-7
ranking; jacks 3, nines 2, aces and tens 1, everything else nothing, for 28; the
two rival explanations of the name, including the 16-plus-13 arithmetic, both of
which the source gives; the dealer forced to 15 after three passes; the trump
indicator built from the player's own twos to fives; the first player unable to
follow suit being obliged to ask, with no obligation to trump afterwards; the
dead hand when trumps are never revealed at all; Royals capped below by the
minimum bid and above at 28. The entry even generalises one of those caps
correctly — the source says "a minimum of 15", the entry says "the minimum bid",
which is what makes it still true at tables using the 16 floor.

## The originality pass, run after the fact fixes

**Both entries clean.** Neither carries a finding at any tier after the rewrites.

**Both tools controlled in both directions**: the Wikipedia API returned an
explicit `missing` marker for an invented title and logged the
Twenty-nine → Twenty-eight redirect on the real one; pagat answered 404 under
"404 Not Found" for an invented path and 200 under its own titles for both real
pages.

**The checker was controlled per entry against each source file**, and this is
where the sitting nearly recorded something false. Two sentences were planted in
`tarneeb`, one from each source; the report grouped them under a single
`Wikipedia.txt` heading, which read at a glance as though pagat had not been
exercised at all. Rather than write that down, the pagat file was re-tested on its
own with a pagat-only sentence, which came back at **12 words verbatim, correctly
attributed to `Pagat.txt`**. The first reading was wrong: the second plant had
landed as a 100%-in-order finding under its own heading rather than as REUSE.
Both files are live. **A control is only worth what you read out of it, and the
first read of this one was mistaken.**

**Three claims introduced by this sitting's own corrections were caught before the
stamp** — the seventh sitting running. Two were REUSE the tool caught, both in
sentences written to fix a finding: the new lead-to-the-first-trick sentence ran
seven words with one source, and the new counter-clockwise sentence ran seven
with the other. The third was caught by re-reading: a rewrite said both signalling
moves are frowned on where the game is taken seriously, where the source says
that of the slam and only says of the flick that it is not always allowed.

**A fourth was caught by reading the rendered page**, which is now seven
consecutive sittings for that step as well. `tarneeb`'s technique paragraph opens
"two pieces of it have names" and then names Tashleeh and Ta'leem — which was
true until this sitting added na'f to the end of it, at which point the entry
counted its own contents wrong. Nothing about it shows in a diff of the sentence
that changed, because the sentence that became false is the one nobody touched.

**One pre-existing READ finding was also acted on.** `tarneeb`'s sentence
defining its own name sat at 80% against the source's, following its clause order
exactly — "Tarneeb is the Arabic word for trump in this game" against "Tarneeb is
what Arabic speakers call the trump in this game". The name is a term of art and
could not be changed, so the sentence was inverted to run from the Arabic to the
game rather than from the game to the Arabic.

## Recorded, not acted on

- **`tarneeb`'s Tashleeh gloss** — that drawing trumps lets "the long suit you
  chose the contract on" run — is the entry's reasoning, not the source's, which
  says only to eliminate as many trumps as possible.
- **Variations not carried**, all from the sources and all deliberate omissions
  rather than oversights: for `tarneeb`, dealing in packets of thirteen, and the
  Egyptian sub-variation where a double also multiplies the defenders' score; for
  `twenty-nine`, auto-double at bids of 21 or more, voluntary rather than
  compulsory asking for trumps, guess-the-first-trump, and the Lucknow and
  Bangladesh versions, the last of which runs to a page on its own. The schema
  asks for a few well-known variations rather than an exhaustive list.
- **`twenty-nine`'s `layout` puts the trump indicator in the middle of the
  table.** The source has the bidder arranging their own set of low cards. The
  figure was left as it is — it is a diagram convention for showing a face-down
  card in play, and the caption says only that it names the trump suit and that
  the bidder alone knows it, both of which are true.
- **The last-trick point.** pagat's own page is inconsistent: its introduction
  says most players no longer count it, and its scoring section counts it anyway.
  The entry follows the introduction and names the point as optional in its
  scoring table, which is the reading the other source contradicts by treating
  the point as the game's defining feature. Left as it stands, and named here.

## What this pass does not establish

Nothing about the 13 entries still carrying a 2026-08-03 stamp. `twenty-nine`
having come through with four findings and no arithmetic error does not mean the
remaining entries will; the four sittings of this date have run from nine
findings in one entry to four, and the variation is in the entries rather than in
the method. Where the sources disagreed — Tarneeb's target score and the status
of its throw-in, Twenty-Nine's bid floor — the entries now say so impersonally
and this record names the disagreements. The originality tool cannot certify
either entry clean; both clean results are what a controlled tool finding nothing
looks like. And the Twenty-Nine reading rests on an article about Twenty-Eight:
**everything taken from it was taken from a passage naming 29 explicitly**, and
that is the whole of what it can support.
