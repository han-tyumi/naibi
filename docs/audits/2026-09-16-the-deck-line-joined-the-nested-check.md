# 2026-09-16 — The deck line joined the nested check, and the only REUSE was a rank list

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-09-16

## What was checked

**0 entries, checked 2026-09-16.** No `checked.date` moved, for the same reason
[2026-08-16](2026-08-16-nested-prose-swept-and-stamped.md)'s and
[the deal-note pass](2026-09-16-deal-notes-joined-the-nested-check.md)'s did not.
One fact *was* read and corrected, in `rummy-500`; the section on it says why
that still does not move the entry's fact date.

**All 80 `decks` values — 5,262 characters, 44 distinct strings — were compared
against every source on disk for their entry, and all 80 entries carry
`checked.nested` dated today.** 169 (entry, source) pairs over 16 families:
Wikipedia (78 entries), Pagat (66), Solitaired (5), Bicycle Cards (3),
GameRules.com (3), Solitaire Laboratory (3), Denexa Games (2), and one each of
Board Game Arena game help, CardGames.io, Game Rules, Semicolon Solitaire Rules,
Sheepshead.org, Wikibooks, Wikibooks Card Games, Wikipedia (German) and Wizard of
Odds. 73 entries have two sources, five have three and two have four.

## Why it had never been checked

`nestedProse` is the single definition of which fields sit outside
`PROSE_FIELDS`, and `decks` was not in it — not because anyone decided it was
metadata, but because the set had until now been read as "the prose hanging off
the structured data" and `decks` is a plain top-level field. The name was doing
the deciding. **The rule is, and now says it is: a string the schema allows,
outside `PROSE_FIELDS`, that is not in `NOT_PROSE`.**

It is prose, and it is published in all three outputs — `**Deck:**` on every
page of the booklet, in the booklet's index table, on every game page of the
site, and in each page's `<meta name="description">`. At 5,262 characters it was
larger than every other uncovered field put together (4,041), and until today it
could be rewritten with no fingerprint moving and no stamp going stale.

42 of the 44 distinct values run to seven words or more. The two that do not are
`1 standard deck (52 cards)` and `2 standard decks (104 cards)`.

## The date on 79 of these stamps moved without a re-reading

Worth stating rather than leaving to be inferred. A `checked.nested` stamp goes
stale when the fingerprint changes, and the fingerprint changes for **two**
different reasons: the text was edited, or the set of fields the walk covers grew.
Only the second happened for 79 of the 80 entries here — their variant
descriptions, captions, figure labels and table notes are the same words the
2026-08-15 and 2026-08-16 passes read. What is true of those 79 today is that
their deck line was read against sources, and the rest of their nested prose is
unchanged since it was read then.

This is the second pass in two to move dates that way, so it is a pattern and not
an accident. **A record that cannot tell "the words changed" from "the walk
widened" costs a corpus-wide re-stamp every time a field joins the set, and
quietly overstates what the new date means.** Fixing it means recording the
covered field set alongside the fingerprint so the validator can say which of the
two happened. That is a decision and a schema addition, and it is not in this
pass.

## Controls, before any of it was believed

Both index sources were proved to answer a real page and refuse an invented one.
Wikipedia's API returns an explicit `missing` marker for
`Zorbulax_Frimwhistle_Cardgame`; Pagat answers `/zorbulax/frimwhistle.html` with
a 404 and 236 bytes.

**Then the title was read back on every fetch, and it caught three articles that
every other check passed.** Each answered HTTP 200, each was about something, and
one of them was over 59 KB:

| entry | asked for | landed on | size |
| --- | --- | --- | --- |
| `canfield` | `Demon` (a real alias) | **Demon** — the folklore article, on supernatural entities | 59,159 chars |
| `golf-multiplayer` | `Hara Kiri` (a real alias) | **Seppuku** — Japanese ritual suicide | 23,791 chars |
| `schieber-jass` | `Schieber` | **Schieber** — a German surname disambiguation page | 208 chars |

Only the third would have been caught by a size floor, and none by a status code.
All three were refetched by explicit title (`Canfield (solitaire)`,
`Golf (card game)`, `Jass`) and the first line of each read back to confirm it.

Three more failure shapes, each already on the record and each seen again:

- **solitaired.com answers an invented path with HTTP 404 and 2,148 characters of
  extracted text** — and answered `/klondike` with *the same 2,148 characters*. A
  length floor passes both. Only the status told them apart, and the real page
  was at `/klondike-solitaire`.
- **gamerules.com answered HTTP 200 with 81 characters**, `One moment, please...`
  — the bot check. A retry with the same user agent got 4,864 characters of rules.
- **gambiter.com answered over http with HTTP 502 and a Russian error page**, and
  over https with HTTP 200 and a 1,342-character site index. Neither is a source;
  both look like one from the status line.

Resolving 67 Pagat URLs from its A–Z index needed 11 disambiguations by hand,
and two of those mattered: `Cribbage` resolves first to **five-card** cribbage
where the entry is explicitly six-card, and `Concentration` resolves to
**the dominoes game** of that name — an honest page, correctly titled, about
something else. The entry's alias `Pelmanism` found the card game. Nothing but
reading the title finds either.

**Finally the check was controlled where it had never run: a sentence from each
source file was planted into that entry's `decks`, and all 160 (entry, source)
pairs the sweep had on disk reported it as a verbatim REUSE.** 156 of the plants
were 28–45 words,
which cannot survive a hard-wrapped file as one run, so the sources, the unwrap
and the new coverage are established together. The four entries with no sentence
that long in one of their files were planted with their longest (15–27 words).

## Findings, at the measured bar of seven words verbatim

**Five findings on `decks` across 80 entries. One REUSE, and it was left.**

- `skat` — seven words verbatim against Pagat: `A K Q J 10 9 8 7 in each suit`,
  against *"32 cards are used: A K Q J 10 9 8 7 in each suit"*. **Left, and this
  is a judgement rather than an oversight.** The run is the eight ranks of a
  32-card pack, in the order every source prints them, plus the three words "in
  each suit". Nothing short of reordering the ranks or dropping them clears it,
  and both are edits made to a detector rather than to a reader — the same
  hand-tuning this project already refuses over thresholds. Card names are the
  class `NOT_PROSE` protects for exactly this reason. Six entries share the
  string (`belote`, `mau-mau`, `piquet`, `sheepshead`, `skat`, `twenty-nine`) and
  the other five did not flag on the two sources each had, which says something
  about those five pages and nothing about the words.
- `canasta` ×2 — 100% in order against Wikipedia and 80% against Pagat, on
  `2 standard decks plus 4 jokers (108 cards)`. The longest run of identical
  words is **one**. Every content word of ours appears in theirs in order because
  the pack is the pack; there is no shared phrasing under it.
- `mus` — 80% against Pagat's *"The standard 40 card Spanish pack is used."*
  The overlap is `40 card Spanish pack`, which is the name of the object.
- `nertz` — 80% against Pagat's *"Each deck must have a different back design."*
  Four words in common, in a source sentence short enough that any longer
  sentence of ours containing the fact would score this well.

**Two structural findings my eye produced and the numbers killed.** Both were
written up as echoes before being measured, and both were wrong:

| pair | what it looked like | order | longest run |
| --- | --- | --- | --- |
| `hand-and-foot` vs Pagat | "one more deck than there are players" following the source's clause order | 33% | 3 |
| `bezique` vs Pagat | the same parenthetical construction for a 64-card pack | 27% | 2 |

The bar is 80% in order or 7 words. Neither is close to it. This is the discipline
working in the direction it is usually quoted in reverse: the eye finds structure
in two sentences that state the same fact, and counting is what settles it.

The findings outside `decks` were the ones the earlier passes read and left.
Nothing new appeared in them and nothing was churned. The eight entries refetched
with broader source sets were re-checked against them before re-stamping, and
four flagged: `doppelkopf` and `schieber-jass` on scoring-table items that are
enumerations of scoring terms (`Stöck`, `Karlchen Müller`, "no 90, no 60, no
30"), `sheepshead` on the deal note the deal-note pass had already judged
vocabulary rather than structure, and `whist` on four pairs whose source
sentences are short and generic ("There are four players in two fixed
partnerships", "The winner of each trick leads next") against much longer
sentences of ours. Two ORDER findings on `background` sections stood where
2026-08-15 left them. All read, none acted on.

## One fact, read and corrected

The deal-note pass earlier today left a question it could not settle: Pagat says
108 cards where `rummy-500`'s `deal[].note` said 104, and that entry's own
`decks` field said `2 decks (104-108)`. Both sources fetched for this pass answer
it:

> **Pagat:** 500 Rummy is played with a standard 52 card deck plus two jokers, 54
> cards in all. […] When 5 or more people play, two decks shuffled together (108
> cards) should be used.
>
> **Wikipedia:** […] can use 52 cards, or 53–54 cards including one or two jokers.
> […] When playing with 5 or more players, two decks of cards should be used with
> a total of 104–108 cards.

The range is right and the notes were picking one end of it while the entry's own
deck line documented the range — 104 without the jokers, 108 with them. All seven
notes now carry the range: *"One pack, 52 cards or 54 with the jokers"* and
*"Two packs shuffled together, 104 cards or 108 with the jokers"*. Three READ
findings went with it, which is the incidental part; the entry agreeing with
itself is the point.

`checked.date` did not move, and should not: it covers `PROSE_FIELDS`, and a
deal note is nested prose. The fact was read today and the record that covers it
— `checked.nested` — is dated today.

## What the re-stamp did to the source records, which was not all good

`--stamp-nested` writes the sources it **actually read**, so re-stamping 80
entries rewrote 80 `checked.nested.sources` lists to whatever this pass could
reach. The first cut of that was a quiet loss: eight entries came out with fewer
sources than they had, `yukon` dropping from four to two, because the pass had
stopped at the two it needed to clear the floor.

Seven of the eight were then refetched and re-stamped, and one was not:

| entry | before | after | what happened |
| --- | --- | --- | --- |
| `accordion` | 3 | **4** | all three found, plus Bicycle Cards |
| `yukon` | 4 | 4 | restored |
| `blackjack`, `forty-thieves`, `schieber-jass`, `sheepshead`, `whist` | 3 | 3 | restored |
| `doppelkopf` | 3 | **2** | the Deutscher Doppelkopf-Verband rules page could not be found; its site answers 404 at `/regeln/` and `/regeln/turnierspielregeln/` and its front page carries no link this pass could follow |

Eight more kept their count and changed which sites they name — `canfield`,
`clock`, `egyptian-ratscrew`, `golf`, `klondike`, `koi-koi`, `spider` and
`tripeaks`. In each case the previously recorded second source was unreachable
today (bvssolitaire.com answers 503 for every path; several gamerules.com and
Bicycle Cards paths have moved) and an equally attributed one was read instead.
The record now names what was read, which is the point of it, but a reader
comparing this pass's list against 2026-08-16's should know the difference is the
web, not a judgement.

**`sheepshead.org` is worth one more line**, because it failed differently from
the last two times: `/rules/` answers 200 with 897 characters of menu, and the
rules are at `/rules/sheepshead-basic-rules/`. The bot check that caught the
deal-note pass did not recur; an index page did.

## What this does not establish

The checker cannot certify an entry clean; thorough paraphrase scores like
independent writing. This says 80 deck lines were read against two sources each
and none had to be rewritten for wording, not that they are original.

**For a large minority it establishes close to nothing.** 43 of the 80 entries
share their exact deck line with at least one other entry — 18 of them say
`1 standard deck (52 cards), jokers removed` and 12 say `1 standard deck (52
cards)` — and 13 entries are under the seven-word verbatim bar, where the checker
has only its order score and a short string scores high against anything.

**Two sources for 73 of the 80 entries, where the entries cite a median of
seven.** The pass fetched what was reachable and attributed, not everything
attributed: 78 Wikipedia and 66 Pagat carry it. `mau-mau` cites Pagat, and Pagat has no
Mau-Mau page in its A–Z index at all — that attribution is worth someone's
attention.

**The prevalence gate does not read `decks`, and `--outside` does not reach it
either.** That matters more here than in a caption: 7 of the 44 distinct values
carry a judgement about how people actually play, and the measured vocabulary
sees 2 of them.

| seen | `contract-bridge` "most tables keep a second pack", `president` "jokers usually removed" |
| --- | --- |
| **missed** | `baccarat` "eight is the casino **norm** and six is **usual** online", `blackjack` "six is the casino **norm**", `red-dog` "six is the casino **norm**", `egyptian-ratscrew` "**some groups** leave the jokers in", `hand-and-foot` "the **usual** four-player game" |

The misses are all `the casino norm`, `usual` and `some groups`. The vocabulary
has `the norm` and `usually` and neither matches. This is a measurement, not a
proposal: widening the markers changes the precision numbers the
[vocabulary write-up](../specs/2026-08-13-prevalence-vocabulary-precision.md)
measured, and re-baselining 330 frozen claims is its own pass.

**A test that could not have failed was found and repaired.** The schema-walk
accounting test added this morning derives what is covered from a hand-written
fixture, and that fixture carried no `decks` — so `decks` stayed on its list of
uncovered paths whether or not it was in `nestedProse`, and the test went green
either way. It now builds the fixture *from the schema*, with a control that
fails if the fixture stops carrying every string the schema allows. Removing
`decks` from the walk fails five tests, measured by doing it. Under the fixture
as it stood this morning, the schema-walk test was not one of the five.

## What is left uncovered

**4,041 characters, down from 9,303**, and `npm run validate` names them:
`layout.rows[][].label` (2,055), `equipment.special_deck` (1,393),
`equipment.other[]` (593). The row labels are mostly one or two words and the
deck compositions are enumerations of a pack, which is why they are reported
rather than swept.
