# 2026-08-16 — The nested prose swept against sources, and stamped for the first time

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-16

## What was checked

**0 entries, checked 2026-08-16** — and the zero is correct, for the same reason
[2026-08-15](2026-08-15-verbatim-resweep.md)'s was. No source was read for what
it says, only for what words it uses, and `checked.date` is a statement about a
fact-check. What moved is the other half of the record.

**Every entry's variant names and descriptions, layout caption, figure captions,
row labels and card notes, and scoring-table items and notes were compared
against every source its `checked.sources` names, and all 80 carry
`checked.nested` dated today.** That is **80 entries, 169 source files,
2,727,211 characters of source text** against **1,980 passages, 233,036
characters and 3,163 sentences of ours** — the 31% of the corpus's prose that
[decision 0026](../decisions/0026-a-second-fingerprint-for-the-nested-prose.md)
made stampable on 2026-08-15 and deliberately left at zero, because stamping it
from an audit record rather than from files actually read is the same dishonesty
in a different coat. Seventy-two entries had two sources on disk, seven had
three, one had four.

`npm run validate` said "No entry has had its variant descriptions, captions and
table notes compared against a source" on every run since 2026-08-15. It says
80/80 now.

**Findings, at the measured bar of seven words verbatim:**

- **Eight runs in the nested fields, and eight of them were already known.**
  `pitch`'s trump ranking with the jokers against both sources and its "the
  other five of the same colour"; `scopa`'s "the ace, two and three of coins";
  `seven-card-stud`'s variant *name*; `slapjack`'s "a card that is not a jack"
  and "the player to the left of"; `tarneeb`'s throw-in condition. Every one is
  on 2026-08-15's kept list and every one was kept again.
- **One new run: `solo-whist`'s reordering-the-ladder variant**, seven words with
  pagat, which is the whole shape of pagat's sentence — rank misère above
  abundance in trumps, misère ouverte as the highest bid of all, adjust the
  scoring. Rewritten, and the re-run is clean.
- **Eleven runs in the four fields the checker has always read**, in `big-two`,
  `canasta`, `cribbage`, `euchre`, `gin-rummy`, `koi-koi`, `rummy`,
  `golf-multiplayer` three times and `skat`. All are the kept vocabulary of the
  games, and this pass did not touch that half of any entry.

The ninth run 2026-08-15 kept — `red-dog`'s "card face up in front of you" —
**does not reproduce against the two sources this pass installed**, because
neither of them contains the phrase. See *Recorded, not acted on*.

## A third instrument, because the checker does not read this half for order

`npm run originality` runs `alignPassage` over `PROSE_FIELDS` only, so the ORDER
tier has never looked at a variant description. Running it over the nested prose
by hand is what found most of what this pass rewrote, and none of it would have
appeared in any tier of the report:

- **`nertz`'s joker variant walks pagat's joker paragraph point for point** and
  closes on "Jokers score like any other card" against their "Jokers score like
  any other cards". Five words is a reading-list entry; a whole sentence
  identical to a source's is not, whatever its length.
- **`snap`'s Menagerie** covered six of pagat's points in pagat's order at 58%
  mean similarity, the highest in the corpus.
- **`solo-whist`'s overtrick schedule** covered five in order at 51% against
  pagat and 54% against Wikipedia, opening on "Many players add a payment for
  overtricks" against their "Many people play with a payment for overtricks".
- **`twenty-nine`'s seventh-card variant** paraphrased two consecutive pagat
  sentences clause for clause.

**Thirty nested passages followed a source's own sequence before the rewrites and
twenty-three after; seven cleared and none appeared.** The twenty-three that
remain were read and kept: most pair our sentences against a page heading, a
navigation breadcrumb or a bibliography line, which is the artefact
`CONTRIBUTING.md` records from Forty Thieves, and the rest are procedure in the
only order it happens.

## The controls, in both directions, before anything was read

Every fetch path was controlled against a real target and an invented one, with
the **title read back out of the body** rather than the status:

- **Wikipedia and Wikibooks through the API**, which answered `Whist` with 14,934
  characters and `Card Games/Durak` with 5,394, and an invented title with an
  explicit `missing` marker rather than a page named after the request. A
  non-JSON body is refused outright, which is the rate-limiting failure the
  skill's third incident is about.
- **pagat, gamerules.com, Solitaire Laboratory, Bicycle, Denexa, BVS Solitaire,
  Wizard of Odds, Sheepshead.org and Fuda Wiki** each answered an invented path
  with a 404 whose title names it — "Page not found - Game Rules", "404 Page Not
  Found - Wizard of Odds", "Page Not Found | Fuda Wiki". **Those bodies run from
  236 bytes to 155 KB**, which is why the size is not the test.
- **The PDF reader**: the DDV rules extracted 28 pages, and the invented URL's
  146,877-byte HTML body raised a stream error rather than extracting anything.
- **bvssolitaire.com** was fetched through curl, as 2026-08-15 established; every
  fetch in this sitting went through curl for that reason.
- Every source was fetched **twice** and its extracted text had to agree before
  it was installed. **Wikimedia answered HTTP 429 to 25 of the first pass's
  requests**; all 25 were refused rather than installed, and retried with
  exponential backoff.

**Then the checker itself was controlled against all fourteen source families**
by planting the longest sentence each file has into a *variant description* — the
half being stamped — and requiring the real `npm run originality` to report it.
**All fourteen were caught, at 27 to 78 words**, each at exactly the planted
length and against the right file and the right field path. Every entry was
restored byte-for-byte and the restore was checked against `git status` rather
than assumed.

## Two ways the source text was wrong, both found by the controls

Neither would have been found by reading a report, and both make a run
unfindable rather than inventing one — so the symptom of each is a clean result.

1. **Fuda Wiki serves its whole article inside a `<template>`, which the
   extractor was stripping.** The page fetched, answered 200 and read its own
   title back correctly, and yielded **zero characters**. Only the
   1,500-character floor caught it. `koi-koi` would otherwise have been swept
   against one source while reporting two.
2. **The extractor turned block boundaries into newlines and then split on
   newlines — so it split on the source's own newlines too**, which is the
   70-column wrap the skill warns about, applied to every HTML source at once.
   Measured on the Solitaire Laboratory FreeCell FAQ: **the longest sentence in
   116,000 characters was 28 words and most capped at 18.** With boundaries
   carried on a sentinel instead it is **101 words** — the same 101 that
   2026-08-15 names as its longest plant on that file. Every HTML source was
   dropped and re-extracted.

**The first round of plants passed against the still-wrapped files**, and how is
worth keeping: the plant picked the most distinctive sentence in an 18-to-45-word
window rather than the longest the file had, and `accordion`'s Solitaire
Laboratory page tops out at 22 words while wrapped. It planted 22, caught 22, and
reported success. What failed was asking for 55 words and being told the file has
no sentence that long — the wrap stating itself. **Plant the longest sentence the
file has, not a long enough one.** After the fix that same file plants 71 words,
pagat 65 and German Wikipedia 78.

The **DDV PDF** arrives line-broken at the page width — longest sentence 17 words
in 54,000 characters — and was unwrapped the same way, after which it plants 39.

## The two instruments agree

The exhaustive longest-run sweep was run beside the checker as an independent
instrument: every sentence of ours against every sentence of every source, no
ranking, no early-out, no one-match-per-sentence rule. Over **8,059 sentences of
ours and 3,853,962 sentence pairs** it finishes on **19 runs at seven words or
more, and the checker reports the same 19 at the same lengths** — compared
row by row, not eyeballed. Neither instrument found anything the other missed,
which is not proof of a third blind spot's absence but is the only check
available for one.

## What was rewritten

**Fifteen passages across eleven entries**, all in the nested fields, all wording
rather than fact:

- **`nertz`** — the joker variant, which followed pagat's paragraph and ended on
  their sentence; and the partnership variant, whose "one partner works the stock
  in threes while the other keeps an eye on the Nertz pile" is theirs with the
  nouns moved.
- **`snap`** — Menagerie, reorganised so the table size and the joke come first
  and the deal follows, rather than tracking pagat top to bottom.
- **`solo-whist`** — the seven-word run in the ladder variant, and the overtrick
  schedule, which now leads with the three contracts that pay nothing.
- **`twenty-nine`** — the seventh-card variant's last two sentences.
- **`old-maid`** — Scabby Queen's rap count and its red/black branches, both
  inverted; and Black Peter, which now gives the purpose-made pack before the
  ordinary one, the reverse of pagat's order.
- **`spades`** — the two-handed draw, reframed as "every turn takes two cards and
  keeps one" rather than as pagat's two branches in pagat's order; the odd card
  in three-handed; and "both jokers as the top two trumps", six words.
- **`sheepshead`** — "Most tables require a trick to qualify" against their "Most
  groups require that a player take at least one trick to qualify".
- **`war`** — the ten-units-or-twenty example and the tie side bet.
- **`spit`** — "flipped from each end pile onto the centre piles".
- **`indian-rummy`** — a scoring-table note echoing a pagat clause.
- **`fan-tan`** — the six-and-eight rule's opening sentence.

**No `PROSE_FIELDS` prose was touched**, which is checked rather than asserted:
every entry's `checked.prose` still fingerprints its current sections.

**And the rewrites introduced no prevalence marker**, measured rather than
eyeballed: `npm run prevalence` counts **431 flagged sentences across the corpus
before and 429 after**. Per entry, nine of the eleven did not move, `sheepshead`
went 14 to 13 and `old-maid` 2 to 1. Both moved **down**, and none moved up —
which is the same result 2026-08-15 got, and for the same reason: a rewrite that
changes no claim cannot add an unsupported one.

## One code change, which the stamp forced

`checked.nested` had never been set on any entry, and setting it exposed a
disagreement about what it covers. **`--stamp-nested` fingerprints the entry
`loadGames` hands out, with `figure_refs` resolved; the validator read the files
itself and did not resolve them.** So the four entries with shared figures —
`five-card-draw`, `omaha`, `seven-card-stud`, `texas-holdem` — reported
themselves edited since a check made a minute earlier, every time, and there was
no way to stamp them.

The stamper is the side that is right: the checker compares the resolved
captions, so the fingerprint has to cover them. The splice is now
`resolveFigures` in `naibi`, called by `loadGames` and by the validator, rather
than written out in one place and missing from the other. A test pins the reason
— that resolving changes those four entries' fingerprints, and that resolving by
hand agrees with `loadGames` — and from today the gate covers the end of it too,
because 80 stamped entries make `npm run validate` the end-to-end check.

## What the bookkeeping did and did not have to do

**No entry's `checked.date` moved**, so no older record's count changed and no
count moved between dates. The ledger still reads
**Audited 72, faulty 66, clean 6, errors 593**, and the corpus still divides
across the same nine dates it did yesterday. This record's own heading is
**0 entries, checked 2026-08-16**, which is the whole of decision 0025 applied to
a pass that checked no facts.

[The 2026-08-11 source map](../specs/2026-08-11-source-map-for-the-unverified-32.md)
gained the seven rows it was missing — `accordion`'s Solitaire Laboratory page,
`forty-thieves`' and `yukon`'s BVS Solitaire and Denexa Games pages, `mau-mau`'s
Game Rules page and `whist`'s Bicycle page. All seven are sources those entries'
`checked.sources` name and no map carried, so every one had to be resolved again
before the entry could be given what its own record claims.

## Recorded, not acted on

- **`bezique` rests on Wikipedia alone.** pagat's `marriage/bezique.html` is
  1,561 characters of history and links with no rules on it, exactly as
  2026-08-15 found. It clears the 1,500-character floor by 61 characters and is
  counted as a file read, because it was; it is not a second account of the game.
- **`red-dog`'s kept run does not reproduce here.** "card face up in front of
  you" appears in neither the pagat In Between page nor the Wikipedia article
  this pass installed. A sweep against a page an earlier pass did not use
  produces false negatives and never false positives, so the risk is a missed
  run — but it is a concrete instance of the limit 2026-08-15 named, and the
  first time the two passes' source sets have been shown to differ.
- **Sixty-two runs of exactly six words sit in the nested fields**, below the
  measured bar of seven and left alone. They were read: they are card names, score amounts and
  deal vocabulary — "two game points rather than one", "the twos of clubs and
  hearts", "two piles of ten". The bar is the 99th percentile of what our own
  unrelated passages manage against each other, and this is what the tier below
  it looks like.
- **`solo-whist`'s overtrick schedule still aligns at 49% against Wikipedia**
  after the rewrite, down from 54%. What is left is the numbers — four, five or
  six units for a solo; two for an overtrick and one for an undertrick — and
  rewording those would make the entry wrong.
- **The Wikipedia text is still the `explaintext` extract, which drops every
  table.** Reuse from a source table into one of our table notes would not be
  found by this pass either. Named as unswept rather than swept.
- **`npm run originality` still does not run the ORDER tier over these fields.**
  This pass ran it by hand and it produced most of what was rewritten. Whether
  that belongs in the tool is a decision, not a task.

## What this pass does not establish

**It establishes nothing about any entry's facts.** A `checked.nested` stamp says
that those fields were compared against those sources on that date and nothing
else — not that anybody read the sources for what they say, and not that the
variant descriptions are true. Every disagreement between sources an earlier
record left open is still open, and `checked.date` remains the only field that
speaks to facts.

The originality tool cannot certify an entry clean. A clean run means no run this
instrument can see, in the fields it read, against the sources that were on disk
— and this sitting is a reminder of how much work that last clause is doing.
**Every Solitaire Laboratory file on disk this morning was one no run longer
than eighteen words could have been found in**, and the sweep over them came back
clean — as it would have gone on doing. What made that visible was planting a
sentence longer than the file's longest and being told there wasn't one; nothing
in any report said a word about it. Thorough paraphrase scores like independent
writing and none of this touches it either.
