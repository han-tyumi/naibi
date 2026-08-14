# 2026-08-14 — Five Hundred and Accordion: a trump suit counted once, and a game whose reputation belongs to half of it

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-14

## What was checked

**2 entries, checked 2026-08-14**. The calendar had rolled past 2026-08-13, so
this is the only record of its date and no existing record needed touching
except the 2026-08-03 one, which lost the two entries below.

**Two audited, two faulty, twenty-eight wrong or unsupported statements** — 15 in
`five-hundred` and 13 in `accordion`. Rules and variants the sources give and the
entries lacked are named separately and are not counted in the twenty-eight.

**1 entry remains on 2026-08-03** and has never been read looking for false
statements: `koi-koi`. It was not reached. See the last section.

Sources, read with the text open:

- `five-hundred` — [pagat](https://www.pagat.com/euchre/500.html) (37,633 bytes)
  and [Wikipedia](https://en.wikipedia.org/wiki/500_(card_game)) (32,965 bytes),
  the two largest files this audit has pulled. They were fetched, verified and
  deliberately deleted unread on 2026-08-13; this sitting read them.
- `accordion` — [Wikipedia](https://en.wikipedia.org/wiki/Accordion_(solitaire)),
  [gamerules.com](https://gamerules.com/rules/accordion-solitaire/) and, added
  this sitting, [Solitaire Laboratory](https://www.solitairelaboratory.com/accordion.html)
  (30,863 characters). **The third source is the reason this entry's worst error
  was findable**, and it was already named in `sources_consulted`; the source map
  lists only the first two.

`accordion` gained `GameRules.com` in `sources_consulted`, which it did not
carry. **The `--stamp` source-name guard has now fired in five consecutive
sittings.** Note the shape it takes here: the attributed name slugs to
`gamerulescom` and the obvious filename `gamerules.txt` slugs to `gamerules`, so
the file has to be named `gamerulescom.txt` to match. That is a second way to
lose the same twenty minutes.

## The pairing, and what it did not produce

`five-hundred` was read against [`euchre`](../../packages/data/games/euchre.json)
(audited 2026-08-08), the last real pairing in the corpus: pagat files 500 at
`euchre/500.html`, and the bowers and the going-alone option are both inherited.
The joker was read first, as the handoff said to — `euchre` carries zero jokers
and offers one only as the Benny variant, while `five-hundred` has it in the base
43-card pack.

**That check came back clean, and it is worth saying so.** `five-hundred` claims
no going-alone option in its four-handed game, where `euchre` has one; the two
entries' trump orders differ exactly as their packs do; and neither has taken a
rule from the other. Two consecutive sittings had the pairing produce the worst
finding, and this one did not.

What the pairing *did* produce is a shape worth keeping. `euchre`'s entry says
its trump suit "holds seven cards and the same-color suit only five", which is
right, because every euchre suit is the same length. `five-hundred` made the same
move — "the trump suit, which runs thirteen deep" — and it is wrong, because its
pack is asymmetric: the red suits keep their 4 and the black ones do not. **The
sentence pattern was inherited and the arithmetic under it was not re-done.**

## `five-hundred` — fifteen

1. **The trump suit was counted once and stated as always.** "The trump suit,
   which runs thirteen deep rather than ten or eleven." Two cards join trump and
   none leaves, so with this pack it is thirteen deep when a red suit is trump and
   **twelve** when a black one is. Both sources' "13 trumps" statements belong to
   packs where that holds: the 45-card deck, where every suit has eleven cards, and
   the alternative 43-card build in which the 4♠ and 4♦ come out instead of the two
   black 4s, so that the 4 matching trump's colour is promoted to trump. Our pack
   is the other one.
2. **The game's invention was handed to a company.** "An American company drew it
   up and copyrighted it in 1904." Neither account says that. One says it arose in
   America before 1900; both say the US Playing Card Company promoted it and
   copyrighted a set of rules in 1904. Promoting a game and inventing it are not
   the same claim.
3. **The winning condition was stated flatly and the accounts disagree about it.**
   "You have to get there on a hand you bid and made." That is the antipodean
   rule, and one account gives it as such. The other's base rule is the reverse —
   trick points can win the game outright, with the contractor taking it if both
   sides cross 500 on the same deal — and **the first source's own American section
   says the same thing**, contradicting its "everyone agrees" a few paragraphs
   earlier. The entry now gives both. **The same corrected fact was alive in the
   `scoring_table` note**, which is the fifth error category and has now turned up
   in yet another sitting.
4. **Where misère sits in the bidding was stated flatly and the accounts
   disagree.** Above every seven and below every eight is the antipodean placement;
   one account gives between 8♠ and 8♣ as the usual one and the entry's version as
   what Australian decks' rule leaflets say, and the other records the 8♠/8♣
   placement twice — as a reported variation and as the American rule. Both are now
   given.
5. **A rationale contradicted by the entry's own table.** "The two misères are
   priced flat, at 250 and 500, which is what fixes them where they sit in the
   bidding order." A plain misère is worth 250 and is outbid by eight spades, which
   is worth 240. The price is exactly what does *not* fix it, which is why the
   other placement exists at all. The scoring table three fields away had both
   numbers in it.
6. **The joker's lead restriction was stated flatly and the accounts disagree.**
   The entry gave the strict form only: a named suit must not have been led, and
   leading the joker becomes illegal once all four are open. One account puts no
   limit on it — the joker may be led whenever you like and named into any suit,
   including one you hold cards in.
7. **An invented joker rule.** The variants block gave a form in which the joker
   "may be played to any trick regardless of what you hold". No account has that.
   Every version either restricts the joker to a suit you are void in, or attaches
   a condition about suits you have shown void in; none drops the restriction
   altogether.
8. **An invented variation.** "Others go the other way and require the contractor
   to nominate a suit for it in every no-trump contract." Nothing records a table
   *requiring* nomination. One account records the opposite variation — that
   nomination is unavailable in no trumps — and says nomination stays available in
   a misère under it.
9. **A claim that is false in both directions.** "Either simplification removes
   the misère trap of holding an unnominated joker." The first removes nomination,
   which makes the trap unavoidable rather than absent; the second is a rule about
   no-trump contracts and does not touch misère at all. And the one variation an
   account actually records here keeps nomination for the misère, so the trap
   survives it intact.
10. **A source's base rule filed as a variation.** The same variants entry offered
    "may be led at any time with the leader naming the suit to be followed" as
    something some tables do. It is one account's base rule for the joker in no
    trumps. First error category in the handoff, arrived at by reading the second
    source rather than the neighbour.
11. **A superlative nothing ranks.** Three-handed: "It is the sharpest version of
    the game." Replaced with what actually changes — no partner for the contractor,
    and two defenders who have agreed nothing.
12. **A prevalence claim resting on one account's hearsay.** Six-handed: the
    63-card packs "in Australia are commonly used for the four-handed game too".
    The account's own words are "I have been told that…". Now attributed as a
    report rather than stated as practice.
13. **A five-handed restriction stated flatly where the accounts disagree.**
    "Names any single card other than the joker or a bower." One account bars the
    joker and both bowers; the other says a bower is the ordinary choice and that
    only some tables bar trumps.
14. **A frequency nothing supports.** Five-handed: the partnership becomes public
    when the card appears, "which is often several tricks in and occasionally
    never".
15. **A five-handed settlement stated flatly.** "A called partner shares the
    contract's value or its loss equally." One account says half each; the other
    says full points each or half, depending on the version.

**Rules the sources give and the entry lacked.** A three-handed table may call a
**misère without anyone having bid seven first**, seven-trick bids being rarer
with no partner to lean on. Six-handed may be played as **three pairs** rather
than two threes. A five-handed contractor may **name a card they hold or have
already buried**, which is how you play alone without saying so, and misère at
that size is **barred or repriced** in both accounts as too easy for its score.
The joker variants block now carries the two restrictions both accounts record —
the bar on reneging with the joker, where the accounts differ on what happens when
it is your last card, and the free lead — plus the two narrower forms.

**The arithmetic came through clean, again.** The whole Avondale ladder, the
40-plus-100-per-trick-plus-20-per-suit formula, the worked 8♥ = 300, the slam rule
and its 250 threshold, the 10 a trick for defenders win or lose, the 43-card build,
the 3-1-4-1-3-1 deal, the bid order, the bower ranking, the 33-card three-handed
pack, the 53-card five-handed pack and the 63-card six-handed pack — every number
correct. So is the misère trap, which is stated exactly as one account states it.

## `accordion` — thirteen

The entry's problem is one idea repeated: **it treats the blind deal as the game
and the open deal as a footnote**, and every source read says otherwise.

1. **A superlative that the third source flatly contradicts.** "Accordion has a
   reputation as one of the least winnable patiences ever printed and it has earned
   it." The account that measured it rates *open* Accordion among the most winnable
   open patiences there is, ahead even of FreeCell.
2. **The open win rate was understated by roughly a factor of three.** "Careful
   open play has been reported to bring games home as often as one in three." One
   in three is the figure published for a *basic* sweeper strategy. The same
   account reports a player reaching 98–99%, a solver running hundreds of thousands
   of open deals without a single loss, and that while unwinnable layouts can be
   constructed on purpose, no shuffled one has ever been shown unwinnable. The
   entry's headline comparison was wrong at the open end.
3. **A verdict on the game as a whole that is true of half of it.** "Anything
   short of that is a loss, and losses are overwhelmingly the normal result."
4. **A prevalence claim past what the source says.** "Most computer versions use
   it." The account's words are that dealing the whole deck out "has become a
   common method of presentation in solitaire packages".
5. **An unsupported consequence.** The Open Accordion variant: "it is what most
   software deals by default, so many players have never met the blind version at
   all." Nothing counts players.
6. **A coinage attributed to players generally.** "Players call the short move a
   slide and the long one a leap." The account that uses those names introduces
   them — "we will call this move a slide" — and no other source names the moves at
   all. The entry now says the names are its own, following that account.
7. **A prevalence marker where the rule is just the rule.** "Nothing is compulsory
   in the form most people play." Two accounts give the optional move as the rules.
8. **A rule of the older form the entry lacked, stated flatly against.** "Dealing
   as you go, you may alternate freely between turning the next card and working
   the line." Two accounts say the earliest form forbade turning a card while any
   play remained; one adds that a leap was only allowed with no slide available.
   The entry now scopes the free version to the modern rules and the strict variant
   carries the third restriction.
9. **Two invented benchmarks.** "Six or seven is a decent blind deal and a dozen
   is an ordinary bad one." No source distributes pile counts.
10. **A suit narrowed without warrant.** Royal Marriage was given as "the king and
    queen of hearts". The account says the king and queen of the same suit.
11. **An unsupported claim about how a form survives.** "It survives mainly as a
    baseline."
12. **A frequency nothing measures.** "A leap… is usually the move that unlocks a
    run."
13. **An unsupported duration.** Royal Marriage "finishes in a couple of minutes".

**Numbers the sources give and the entry lacked.** The blind game now carries the
measured rates rather than a gesture: a solver taking the plays as they come won
**4 in 10,000** in one run, and over all 86,400 numbered deals of one program won
**56 taking the nearer move first and 37 taking the longer one** — so the tie-break
the strict rules impose is itself worth half again as many wins. The one-in-a-hundred
figure that both Wikipedia and the third source quote turns out to be a classic
book's **shorthand for a rate too low to quote**, not a measurement, and the entry
now says so. The five-piles-or-fewer target it suggested is a **published**
suggestion tied to blind play, and is now given as one.

**The rest of the entry was right.** The move rule, the two distances, the
suit-or-rank test, piles moving whole, gaps closing behind a move, distances counted
on the line as it stands, the dead end at the left-hand end, the 1880s strict rules
and their compulsory nearer move, and the win condition — all correct against three
sources.

## The originality pass, run after the fact fixes

All three fetch tools were controlled in both directions first. pagat, gamerules
and Solitaire Laboratory each **refused an invented path and wrote nothing**;
Wikipedia's API refused an invented title with its explicit `missing` marker
rather than echoing the requested title back. Every source was fetched twice and
required to agree on length before being installed. **Wikipedia's API answered
HTTP 429 with a plain-text body on the first attempt of the session** — the
documented rate-limit failure, arriving with a status this time rather than a 200 —
and the fetcher's refuse-a-non-JSON-body rule caught it before anything was written.

The checker was controlled against **each source file separately** by planting a
copied sentence in each: 21 and 19 words for `five-hundred`, and 18, 24 and 16 for
`accordion`. All five were reported with the right attribution. **The 16-word run
was planted out of the Solitaire Laboratory file specifically to prove the unwrap**,
since that site is served hard-wrapped at about 70 columns and no run longer than
one line can be found in a wrapped file; catching it establishes the unwrap and the
tool together.

**The standard run reported no REUSE in either entry. An exhaustive sweep found
five, and this is the important operational finding of the sitting.**

`npm run originality` pairs each of our sentences with its **single best-scoring**
source sentence and reports that one. A longer verbatim run against a *different*
source sentence is hidden behind it. `five-hundred`'s setup shares an **11-word
run** with pagat's deal sentence — "cards to each player and three face down in the
middle" — and the tool reported that sentence at a run of 5, against a different
sentence that scored higher on order. Sweeping every sentence pair for the longest
run, rather than scoring the best pair, found:

- `setup`, 11 words with pagat (the deal sentence above) — **inherited, and past
  what the kept-vocabulary list covers**: "deal N cards to each player" is
  formulaic, "three face down in the middle" is a choice. Rewritten.
- `play`, 7 words with pagat — "the contractor leads to the first trick", an exact
  sentence. Rewritten as an opening lead; the rule is unchanged.
- the six-handed variant, 11 words with pagat. **Inherited.** Rewritten.
- the joker variant, 8 words with pagat and 8 with Wikipedia — **both in prose this
  sitting wrote beside an open source.** Thirteenth sitting running for that
  failure mode. Rewritten.
- `layout.caption`, 7 words with pagat, the same run as the setup sentence.
  Rewritten.

After the rewrites nothing in either entry reaches 7 words against any source. The
three runs left at 6 are trick-taking vocabulary — "a trick leads to the next", "of
the suit of the same colour", "may lead the joker and" — and are under the measured
bar.

**The same comparison was run by hand over the fields `PROSE_FIELDS` does not
read.** For `five-hundred`, 37 passages and 5,115 characters; for `accordion`, 18
and 2,031. It found three of the five runs above — the six-handed variant, the
joker variant and the layout caption, none of which any tool in the repository
reads — and one more in `accordion`'s Royal Marriage description, 7 words with
Wikipedia, since rewritten. **That is the fourth sitting in which hand-running the
comparison over the unread 31% has found real reuse.**

Two READ findings were judged and kept. `five-hundred`'s misère paragraph aligns
100% against a Wikipedia *section heading*, which is the giveaway the handoff
names. Its deal sentence aligned 83% against a short generic source sentence
contained inside a longer one of ours, and the deal has one natural order.

**A marker check ran over both entries.** `five-hundred` finished with one flagged
sentence, "a side can climb **most** of the way to 500", which is spatial rather
than a prevalence claim, and zero under the measured vocabulary. `accordion`
finished with two, both legitimate: one repeats its source's own word ("a **common**
method of presentation"), and the other is an attributed claim — "one account rates
it among the **most** winnable open patiences". **Three of `accordion`'s four
initial flags were in sentences this sitting had just written**, and all three were
fixed: a frequency claim about leaps, a duplicated software claim, and an
apportionment ("almost all of that gap is information rather than cleverness") that
nothing measures.

**Two sentences the precision measurement had hand-read were rewritten here, and
they landed on opposite sides.** The test that guards those samples caught both, as
it is meant to.

- The held-out sample's item 1 was `accordion`'s "it is what **most** software
  deals by default, so many players have never met the blind version at all",
  judged **claim**. This sitting deleted it for exactly that reason. **The verdict
  is confirmed, not revised** — the first sampled sentence a later audit has
  removed on the grounds the vocabulary flagged it for.
- The other sample's item 2 was "careful open play has been reported to bring games
  home as **often** as one in three", judged **innocent**. That judgement was right
  and still stands: "as often as one in three" is a rate, not a claim about how
  commonly something is played. **The sentence was false anyway.** A marker check
  cannot see a wrong number, and this is the cleanest illustration of its ceiling
  the audit has produced — a sentence correctly cleared by the instrument and
  carrying the sitting's second-worst error.

Both are now recorded in `edited_since` with their reasoning, which is the
mechanism the `tien-len` sitting added.

## Recorded, not acted on

- **`players.max` disagrees with the entry's own prose, and this is the third
  instance.** `five-hundred` caps `players.max` at 5 while its variants block
  describes the six-handed game, exactly as `speed` and `tien-len` cap at 4 while
  their variant text says more can play. The handoff says a third inheritance would
  be a pattern and that it should be settled rather than inherited. **It is now a
  pattern.** Left visible and unchanged, because raising it drags in
  `decks_by_players`, a `large-group` tag and the picker's behaviour, and because
  the handoff files this among the decisions that are not a sitting's to make
  alone. Both sources also document a **two-handed** 500, which `players.min: 3`
  excludes; the entry carries no two-handed variant, so nothing contradicts itself
  there.
- **`accordion`'s alias `Leapfrog` is in none of the three sources.** `The Idle
  Year`, `Tower of Babel` and `Methuselah` are all in Wikipedia. Alias sweep.
- **Royal Marriage's discard mechanic rests on a sibling game's description.** The
  only account read gives Royal Marriage's aim and its layout, not its rule for
  which cards come out; the one-or-two-cards-trapped-between-a-matching-pair rule
  is described there for The Queen and Her Lad, a game of the same family. Kept,
  because the entry is pointing at the game rather than teaching it, and named here
  as resting on that rather than on a Royal Marriage rule set.
- **`five-hundred`'s advance nomination of the joker's suit rests on one account.**
  The other describes nomination only at the moment of leading and does not
  contradict it. Same for the must-play-when-void-under-misère distinction.
- **The `--stamp` source-name guard, fifth consecutive sitting.** Still a
  write-time check wearing a stamp-time coat. The slug collision noted above —
  `GameRules.com` needing a file called `gamerulescom.txt` — is worth folding into
  whatever fixes it.
- **Solitaire Laboratory's leap-value variants were left out.** Slides with leaps
  of 4 through 10 are documented and measured, and medium values may be *easier*
  than the standard 1/3 game. Real, interesting, and it would need its own variant
  written from notes rather than beside the page.
- **`accordion`'s history sits in `setup`** and `five-hundred`'s does too — where
  the game came from is what `CONTRIBUTING.md` says belongs in `background`. Not
  touched; it is a structural change rather than a fact one, and moving prose
  between fields has its own procedure.
- **The rendered footer overstates what was checked, corpus-wide.** Both pages end
  "Rules checked against: …" and list `sources_consulted` rather than
  `checked.sources`, so `five-hundred`'s page names three sources where two were
  read and `accordion`'s names seven where three were. Every entry whose attributed
  list is longer than its checked list reads the same way. Found by reading the
  rendered page, which is the eleventh sitting running in which that step turned up
  something the diff did not; not acted on, because it is one line of the renderer
  and a decision about which list that sentence should name.
- **The verbatim sweep should be re-run over entries already audited.** The blind
  spot above was in the tool the whole time, so a "no REUSE" result on any earlier
  pass carries the same weakness. `.sources/` is deleted after every sitting, so
  this means re-fetching rather than re-reading — cheap per entry, and it needs no
  judgement beyond looking at what comes back. Worth doing before anyone trusts the
  corpus-wide claim about wording.

## `koi-koi` was not reached

It is the last entry on the 2026-08-03 stamp. Nothing was fetched for it and
nothing about it is established by this pass. It is genuinely alone — no other
entry in the collection uses a hanafuda pack, so there is no pairing to be had —
it is not on pagat, and its second mapped source, `fudawiki.org`, is a fetch path
this audit has never exercised. Its scoring is a dense table of yaku, which is the
kind of arithmetic that has come through every previous audit intact and would
still have to be checked value by value. Two entries were finished properly
instead, which is what the handoff asks for.

## What this pass does not establish

Nothing about `koi-koi`.

Where the sources disagreed — the win condition, the misère ranking, the joker's
lead, the five-handed nominated card and its settlement, what happens when the
joker is your last card — the entries now say so impersonally and this record names
the disagreements. The variants and procedures listed above as resting on nothing
read still rest on nothing read.

The originality tool cannot certify either entry clean; thorough paraphrase scores
like independent writing. What this sitting can say more usefully is narrower:
**a clean run of that tool is weaker evidence than it looks**, because it reports
one counterpart per sentence and an 11-word verbatim run sat behind a
higher-scoring pair in an entry it had just passed. The exhaustive sweep and the
hand-run over the unread fields are both worth building in; between them they found
five runs the gate did not.
