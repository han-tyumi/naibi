# 2026-08-11 — FreeCell and Spider, against the people who solved them

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-11

## What was checked

**11 entries, checked 2026-08-11** — the day's total across all seven records of
this date, for the reason [the first of them](2026-08-11-words-not-facts.md)
sets out. This sitting read **two** entries: `freecell` and `spider`.

**Two audited, two faulty, ten wrong or unsupported statements between them** —
six in `freecell`, four in `spider`. Both had carried a 2026-08-03 stamp from a
pass that compared wording and never checked facts.

**21 entries remain on 2026-08-03.**

Sources, read with the text open: `freecell` against
[Solitaire Laboratory's FreeCell FAQ](https://solitairelaboratory.com/fcfaq.html)
and [Wikipedia](https://en.wikipedia.org/wiki/FreeCell); `spider` against
[Solitaire Laboratory's Spider FAQ](https://solitairelaboratory.com/spidersolitaire.html)
and [Wikipedia](https://en.wikipedia.org/wiki/Spider_(solitaire)).

## Why these two, and what the pairing bought

The [source map](../specs/2026-08-11-source-map-for-the-unverified-32.md) pairs
both of these with Solitaire Laboratory rather than with a general-audience
rules page, and that is the whole point of the sitting. Every one of the ten
findings is a claim about **how often something wins, how hard it is, or what
software does** — the class of statement a rules page has no reason to carry and
no way to check. A source that solves the game does. Six of the ten came from
one section of one FAQ.

The pairing also matters the other way. `golf` was blocked last sitting by a
[Game Rules outage](2026-08-11-golf-multiplayer.md); that record advised going to
the Solitaire Laboratory pair instead of waiting, and this is that sitting.
**Game Rules has since come back up** — its pages answer 200 again — so the nine
entries the outage stalled are unblocked and no longer need routing around.

## `freecell` — six

Five of the six are in one paragraph's worth of subject matter: what programs
do, and how hard the game really is. The rules themselves came through almost
untouched, and the arithmetic came through entirely untouched.

1. **The base rule about foundations was stated backwards.** The entry had
   taking a card back off a foundation "allowed in most implementations". The
   FAQ answers the question flatly: "No. In the standard form of the game, cards
   which are played to the homecells must remain there" — and then says some
   programs allow it as their ordinary rule and at least one offers it as a
   setting. This is the pattern the audit was set up to find, in its purest
   form: **a variation promoted to the base rule.** It now says the standard
   rule first, names *worrying back*, and gives the measurement that puts the
   whole thing in proportion — across the first hundred million deals, 69 are
   winnable only that way.
2. **The unsolvable-deal study was understated by more than an order of
   magnitude.** The entry said the generator had been "extended to a million
   deals, only eight unwinnable ones turned up **in total**". The FAQ carries
   the run out to ten million, where 130 are unsolvable; the eight the entry
   named are the ones that fall inside the first million. The eight numbers
   themselves were all correct. What was wrong was the word "total" — the entry
   turned a slice into a census.
3. **A nomination was reported as a consensus.** "1,941 is the answer solvers
   usually give when asked which of the 32,000 is hardest." The FAQ opens that
   answer with "Difficulty is a rather subjective question, so it is not
   possible to give a definitive answer", nominates 1941 from its author's own
   experience, and names 10692 as another candidate. Reworded to say who is
   nominating and to carry the second candidate.
4. **Deal 617 was cited as evidence of the opposite of what the source says.**
   The entry offered 617 and 1,941 together as proof that "solvable does not
   mean easy". The FAQ says 617 is "nowhere near as hard as its reputation (and
   much easier than 1941)" and explains what it actually is: the first really
   awkward deal a player meets going through them in order, and for that reason
   the most asked-about of the lot. The entry now says that instead, which is
   both true and more use to a reader.
5. **An alternative supermove formula that neither source contains.** The entry
   described "a minority of programs" that multiply rather than double, capping
   a move at `(1 + empty free cells) × (1 + empty columns)`. Nothing in either
   source describes that rule. What the FAQ actually describes is Microsoft's
   shortfall, which is a different shape: correct with one empty column, failing
   to get the most out of two or more, and — with no cell free — treating an
   empty column as though it were a cell. Replaced with that.
6. **Prevalence on the supermove itself.** "Almost every version lets you drag a
   whole run at once." Wikipedia says computer implementations often show the
   motion where physical players just move the stack; nothing counts versions.
   It says "Computer versions" now.

**Confirmed exactly, and left alone.** The supermove formula
`(1 + empty free cells) × 2 ^ (empty columns)`, its worked examples, and the
exception where the destination column drops out of the exponent — all three are
in the FAQ almost line for line. So are 99.999 percent, deal 11,982 as the sole
impossible deal of the original 32,000, the mid-1990s volunteer effort, and
Baker's Game's lower win rate. **The arithmetic survived again**, which now
holds across every audited entry.

## `spider` — four

Three of the four are the same paragraph, and all three ran the same way: **the
entry made the game sound harder than the people who study it say it is.**

1. **The four-suit win rate was roughly a third of what both sources give.**
   "Strong players usually win well under 20 percent of deals, and casual
   averages sit in the single digits." Wikipedia: "Winning chances in a normal
   game with good play are considered to be about 1 in 3 games." The FAQ reaches
   the same number independently and says where it comes from — Morehead and
   Mott-Smith's *The Complete Book of Solitaire and Patience Games* — and adds
   that "some sources give a dubious figure of 1 in 10". The entry had landed
   between the accepted figure and the one the FAQ distrusts, and reported it as
   the accepted one.
2. **The two-suit figure was the inexpert rate, labelled as the skilled one.**
   The entry gave "30 to 40 percent" for skilled play. The FAQ's author, who
   describes himself as an inexpert player, wins one in three at two-suit and
   puts the skilled rate "well over 50%, perhaps even 75-80%". So the entry's
   number was not invented — it was correctly measured and attached to the wrong
   player.
3. **A negative claim about the literature, contradicted outright.** "Unlike
   FreeCell, Spider has no authoritative exhaustive solvability study."
   Wikipedia has a Solvability section that opens "A detailed study has been done
   on the solvability of Spider solitaire games using software." That study is
   not described in enough detail to lean on, and the FAQ's figures rest openly
   on expert judgement rather than on solvers — so the entry now says the
   estimates are estimates, says what they rest on, and says that accounts differ
   over whether a thorough software study exists at all. **A flat denial became a
   disagreement, which is what it is.**
4. **"Most software lifts a completed sequence off automatically."** Nothing
   counts software. The sentence needed the prevalence claim for nothing — the
   useful half is the advice that follows — so it now reads "Where removal is
   offered as a choice rather than done for you".

**Confirmed exactly.** Spiderette's Klondike-shaped 28-card tableau and Will o'
the Wisp's seven columns of three, with Morehead and Mott-Smith as its
inventors, are both in the FAQ. So is the requirement that every column hold a
card before a deal.

**Recorded, not acted on.** Black Widow's and Simple Simon's layouts rest on
nothing read here: the FAQ mentions Simple Simon only in passing and neither
source gives either game's deal. Wikipedia also names a Relaxed Spider that
drops the fill-before-you-deal condition, which the entry has no variant for.
Neither is an error; both are unverified.

## The originality pass, run after the fact fixes

**Clean — no REUSE finding in either entry.** A clean originality result is
exactly what a broken tool also produces, so the interesting part of this
section is not the result but what had to be done to make it mean anything.

**The tool was controlled in both directions, and the control caught a real
problem.** Solitaire Laboratory's pages are hard-wrapped at about seventy
columns, and the tool splits source text on newlines as well as on sentence
endings. A wrapped source therefore arrives as a heap of ten-word fragments, and
**no verbatim match longer than a line can ever be found in it** — the run comes
back clean whatever the entry says. Both FAQs were unwrapped paragraph by
paragraph before they went into `.sources/`, and then, for each entry, two
sentences copied straight off its two source files were planted and the run
repeated. Every plant was reported, attributed to the right file, both sides
printed: twelve words verbatim against the unwrapped FreeCell FAQ and
twenty-seven against Wikipedia, twenty against the unwrapped Spider FAQ and
sixteen against Wikipedia. Runs of twelve and twenty consecutive words out of a
wrapped file would have been impossible, so the control establishes the unwrap
as well as the tool. The plants were then removed and the clean run is the one
reported above.

Fetching was controlled too. Wikipedia was read through its API, which returns an
explicit `missing` marker rather than a page named after whatever was asked for;
an invented title came back `missing` with a zero-length extract, and `FreeCell`
came back present at 6,796 bytes. That check exists because of the
[2026-08-11 rate-limit incident](2026-08-11-zero-on-the-fifth.md), where a
throttled fetch left a present-but-empty source file and the tool reported the
entry clean against it.

**One correction was made after the run, and the run was repeated.** The
replacement for finding 5 originally carried a clause about programs differing
"in how they let you pick out the run you mean", which no source states — an
unsupported claim smuggled in by the sentence that was fixing an unsupported
claim. It was replaced with what the FAQ actually documents about Microsoft's
supermove handling, the sources were restored, the tool re-controlled, and
`freecell` re-run and re-stamped. That failure mode has now appeared in four
sittings running, and it is the strongest argument in the
[write-time gate spec](../specs/2026-08-11-prevalence-markers-and-the-write-time-gate.md):
the person most likely to write an unsupported prevalence claim about a game is
the person in the middle of deleting one.

## What this pass does not establish

Nothing about the 21 entries still carrying a 2026-08-03 stamp, `golf` among
them. The four-suit and two-suit win rates now in `spider` are expert estimates
and the entry says so; nobody has solved Spider the way FreeCell has been
solved, and this record does not claim otherwise. Black Widow, Simple Simon and
Relaxed Spider are named above as unverified rather than checked. The
originality tool cannot certify either entry clean — thorough paraphrase scores
like independent writing — and its clean result here is reported as what it is:
evidence that a controlled tool found nothing, not evidence that there is
nothing.
