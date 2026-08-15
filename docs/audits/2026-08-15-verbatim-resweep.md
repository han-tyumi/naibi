# 2026-08-15 — The verbatim re-sweep: 77 entries re-read for wording, and a second way the tool hid a run

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-15

## What was checked

**0 entries, checked 2026-08-15** — and the zero is correct. This pass moved no
`checked` stamp because it checked no facts: it re-ran the **wording**
comparison over every entry whose stamp predates the 2026-08-14 fix to
`npm run originality`, and a stamp is a statement about a fact-check. Where the
prose had to change, the check keeps its own date and the rewrite is recorded
beside it — see [decision 0025](../decisions/0025-a-wording-fix-amends-the-check.md),
which was written before the first entry was touched, because the question
arrives on that entry and answering it afterwards is how a date comes to claim
cover it never had.

**77 entries re-swept against 162 source files, 2,556,698 characters.** The
three not swept are `accordion`, `five-hundred` and `koi-koi`, which were read
on 2026-08-14 under the fixed tool and by an exhaustive hand sweep besides.
Every entry got **every source its `checked.sources` names** — 162 of 162, no
entry left short of what its original check had.

Why it was worth doing: until 2026-08-14 the checker kept one match per sentence
of ours and picked it on `order`, with `run` only breaking exact ties, so a long
verbatim run could sit behind a better-aligned sentence and never be named. Every
stamp before that date was made under the old ranking. Re-running meant
re-fetching rather than re-reading, and it needed no judgement beyond looking at
what came back.

**Findings, in the two halves the tooling splits the corpus into:**

- The four fields `npm run originality` reads: **13 runs at the bar or over**.
  Three were rewritten; ten are the vocabulary of the games and were kept.
- The fields no tool reads — variant descriptions, captions, figure labels and
  table notes, 1,886 passages and 221,072 characters: **60 runs across 49
  passages in 28 entries.** Forty-one passages rewritten, eight kept.

**That is the fifth sitting running in which hand-running the comparison over
the unread 31% has found real reuse, and much the largest haul.** Fourteen of the
sixty were nine words or longer, against three in the read fields.
`rummy-500`'s wild-joker variant shared **thirteen consecutive words** with
pagat. The read fields have been swept repeatedly for two weeks; these have never
been swept at all except entry by entry during an audit, and it shows.

## Source discovery, which the map only covered for 32 entries

[The source map](../specs/2026-08-11-source-map-for-the-unverified-32.md) has two
URLs each for the 32 entries that were unverified on 2026-08-11. The other 48 had
never had their URLs written down anywhere, so this pass resolved them and wrote
them down: [the rest of the corpus](../specs/2026-08-15-source-map-for-the-rest-of-the-corpus.md).

Four of pagat's A–Z index entries point somewhere other than the game's rules,
and every one was caught by reading the page title back rather than by any
status:

- **`Rummy` in the index resolves to the Indian Rummy page.** The rules are at
  `rummy/rummy.html`.
- **`Whist` resolves to Bid Whist**, a different game; `whist/whist.html` is the
  one the entry rests on.
- **`Concentration` resolves to a page of domino rules.** The card game is
  pagat's `misc/pelmanism.html`.
- **`Five Card Draw` resolves to an index of draw poker variants**, not to the
  game.

Two pages **name the game and carry no rules**, which is the documented failure
mode the map records for pagat's Egyptian Ratscrew:

- **`beating/durak.html` is a family index.** The rules are on
  `beating/podkidnoy_durak.html`; the index page yielded 2,186 characters against
  the rules page's 25,548, and 15 rule words against 200-odd. Caught by counting
  rule vocabulary per thousand characters across every installed file, which is
  worth doing: it flagged both of these and nothing else.
- **`marriage/bezique.html` carries no rules at all** — it is a paragraph of
  history and a list of links to other people's rule sets. There is no pagat
  Bezique text to compare against, so **`bezique`'s sweep effectively rests on
  Wikipedia alone**, and this record says so rather than counting it as two.

`sheepshead.org/rules/` is a contents page; the rules are at
`/rules/sheepshead-basic-rules/`. The Deutscher Doppelkopf-Verband publishes its
Turnierspielregeln as a **PDF**, and the linked HTML page is an index — the PDF
was pulled and its 28 pages extracted, which is a fetch path this audit had never
exercised.

## The controls, in both directions, before anything was read

Every fetch path was controlled against a real target and an invented one, and
the body was read back rather than the status:

- **Wikipedia's API** answered `Whist` with 14,934 characters and an invented
  title with an explicit `missing` marker rather than echoing the title back.
- **pagat**, **gamerules.com**, **Solitaire Laboratory**, **Bicycle**, **BVS
  Solitaire** and **Wizard of Odds** each answered an invented path with a 404
  and an error title. gamerules' 404 carried a **47 KB body** and Wizard of Odds'
  a **151 KB** one, which is why the size is not the test.
- The **PDF reader** was controlled too: the DDV rules file extracted 28 pages,
  and the invented URL's 404 HTML body was refused as an invalid PDF header.

Every source was fetched **twice** and required to agree before being installed;
where the raw bytes differed the extracted text had to agree exactly, and the run
log names each case. Anything refused was deleted rather than left on disk.

**bvssolitaire.com answers node's `fetch` with HTTP 503 and `curl` with HTTP
200**, twice each, from the same machine with the same user agent. That is a
transport difference and not an outage, and it cost two entries their third and
fourth sources until the fetcher was given a curl path — which was then
controlled the same way.

**Then the checker itself was controlled against all fourteen source families**
by planting a copied sentence in the entry and requiring the real
`npm run originality` to report it with the right attribution: pagat, English
Wikipedia, German Wikipedia, gamerules.com under both of the names entries
attribute it by, Solitaire Laboratory, Bicycle, Denexa, BVS, Wizard of Odds,
Sheepshead.org, Wikibooks and the DDV PDF. All fourteen were caught, at 20 to 101
words. **The two Solitaire Laboratory plants — 68 and 101 words — are the ones
that matter**, because that site is served hard-wrapped at about seventy columns
and no run longer than one line can be found in a wrapped file; catching them
establishes the unwrap and the tool together.

## A second way the tool hid a verbatim run

An exhaustive longest-run sweep was run beside the checker as an independent
instrument — every sentence of ours against every sentence of every source, no
ranking, no early-out, no one-match-per-sentence rule. **It found two runs the
checker had just passed**, and the cause is not the one fixed on 2026-08-14:

- `twenty-nine`'s "The player to the dealer's left leads." — **seven words**, and
  the whole of our sentence, inside a longer pagat sentence.
- `tien-len`'s figure caption, "The 3♠ is the lowest card in the pack and the 2♥
  the highest." — **nine words**.

Both were invisible because `prepare()` dropped any sentence with fewer than
`minWords` content words before the comparison ran. That filter is right for the
order ratio — a ratio over four words is noise — and wrong for a run, which means
the same thing in a short sentence as in a long one. **734 of our 4,896
sentences, one in seven, could not be reported however many words they shared
with a source.**

The filter now applies per pair and to the order measure only. **The bar did not
move**: measured over the same 5,313 corpus pairs with short sentences included,
the 99th percentile of the longest run is 7, exactly where it already sat, and
**4 of 5,313 held-out pairs — 0.08% — newly clear it**. So the change surfaces
what was already there rather than lowering the threshold, which is the same
thing the 2026-08-14 fix could say.

The `tien-len` caption was rewritten. The `twenty-nine` sentence was **kept**,
and this is a judgement a later reader may want to revisit: it is the formulaic
statement of who leads, three of our own independently written entries contain
it, and a seven-word run in a sentence that short is precisely what the measured
bar says independent writing produces. It is named in `CONTRIBUTING.md` with the
other kept runs rather than left to be rediscovered.

## What was rewritten

**Three in the fields the checker reads.**

1. **`hearts`** — seven words with pagat, "penalty point and the queen of
   spades", and the surrounding clause order with it: each heart is worth one,
   the queen thirteen. The queen now leads the sentence.
2. **`canasta`** — seven words with pagat, "the next player from taking the
   pile", the black-three rule.
3. **`truco`** — seven words with pagat, "and the sevens of swords and coins".
   The four bravas are now named sevens first, which is the same four cards.

**Forty-one passages in the fields nothing reads**, across 24 entries. The ones
worth naming:

- **`rummy-500`'s wild-joker variant, thirteen words**: "jokers are wild and can
  stand for any card in a meld, even". The longest run this audit has found
  anywhere.
- **`old-maid`'s Black Peter variant, eleven**, and a second run of eight in the
  same paragraph.
- **`palace`'s transparent-eights variant, eleven**: "must beat the first card
  under it that is not an".
- **`solo-whist`'s passed-out-hand variant, eleven**: "without shuffling and the
  next hand is dealt as a goulash".
- Ten more at nine or ten words, in `mus`, `crazy-eights`, `spoons`,
  `teen-patti`, `rummy-500`, `go-fish`, `rummy`, `war` (twice), `baccarat`
  (twice) and `big-two`.

**Rewriting away from one source landed on the other, and the re-run caught it.**
`old-maid`'s special-pack sentence was rewritten to escape Wikipedia's "a chimney
sweep or a black cat" by reversing the pair — and pagat says "a black cat or a
chimney sweep", so the new sentence matched the other source at seven words. It
took a third form. This is the trap the handoff records from `piquet`, and it is
the argument for the second run rather than for any particular wording.

Three other rewrites left a run of seven behind them and were done again:
`palace`'s "jokers are not wild and cannot be", `snap`'s "must call the name of
the other", and `teen-patti`'s "twice the current stake and a seen".

## What was kept, and why

**Eleven runs in the read fields and eight passages in the unread ones.** Every
one is a name, a term of art, or procedure with no second form:

- the poker hand ranks in ascending order (`big-two`), "right bower (the jack of
  the trump suit)" (`euchre`), Skat's multiplier list (`skat`);
- "cards to each player, one at a time" (`canasta`, `cribbage`, `gin-rummy`),
  "the top card of the discard pile" (`rummy`, `golf-multiplayer` twice), "card
  face up on the discard pile" (`golf-multiplayer`);
- the trump ranking with jokers in `pitch`, which is a list of cards in the only
  order they rank; `pitch`'s "the other five of the same colour", which names a
  card; `scopa`'s "the ace, two and three of coins", which names three;
- `seven-card-stud`'s variant *name*, "Seven Card Stud Hi-Lo, Eight or Better";
- `tarneeb`'s throw-in condition, an enumeration with one natural order;
- `slapjack`'s "a card that is not a jack" and "the player to the left of", and
  `red-dog`'s "card face up in front of you" — direction and dealing vocabulary;
- `twenty-nine`'s lead sentence, discussed above.

Rewording any of these would make an entry wrong or stranger to read, which is
the test `CONTRIBUTING.md` sets.

## What the bookkeeping did and did not have to do

**No entry's `checked.date` moved, so no older record's count changed and no
count moved between dates.** That is the whole of decision 0025 in one sentence:
the ledger counts fact-checks, and this pass checked no facts.

**Only three of the 26 edited entries needed anything recorded at all.**
`canasta`, `hearts` and `truco` carry `checked.reworded` because their
`PROSE_FIELDS` moved. The other 23 changed only in variant descriptions and
captions — **the fingerprint does not cover those, so 23 entries had their
wording amended today and nothing in the data records it.** That is the 31% gap
stated as plainly as this audit can state it: the same edit is a tracked
amendment in one field and an invisible one in the next, and which it is depends
on nothing a reader would guess. [The spec](../specs/2026-08-12-the-thirty-percent-outside-the-check.md)
proposes a second fingerprint; this pass is the strongest argument for it so far,
and did not build it.

## Recorded, not acted on

- **`bezique` has one usable source, not two.** pagat's page carries no rules.
  Its Wikipedia article was read and is intact; the entry's `checked.sources`
  says two were read at fact-check time, and this record does not dispute that —
  pagat may have carried rules then, or the reader may have followed its links.
  For **this** pass, `bezique` was compared against one source.
- **The pagat URL used here may not be the URL the original check used.** For the
  45 entries the map never covered, the page was resolved from the A–Z index
  rather than recovered from a record, and four of those resolutions were wrong
  in ways only a title readback found. A sweep against the wrong page produces
  false negatives, never false positives, so the risk is a missed run rather than
  an invented one — but it is a real limit on "clean", and it is the reason the
  URLs are now written down.
- **The Wikipedia text is the `explaintext` extract, which drops every table.**
  Reuse from a source table into one of our table notes would not be found by
  this pass. `action=parse&prop=wikitext` recovers them and was controlled here,
  but a wikitext file cannot also be `wikipedia.txt`, and a second file per entry
  would double-report every finding. Named as unswept rather than swept.
- **`doppelkopf`'s third source is a German tournament-rules PDF**, and our entry
  is in English. It was fetched, extracted and compared for completeness; a
  verbatim run between the two was never a plausible finding.
- **The two instruments now agree exactly.** After the `minWords` fix the
  exhaustive longest-run sweep reports **20 runs at seven words or more** across
  the corpus, and the checker plus the hand-run over the unread fields report the
  same 20 — eleven and nine. Keeping the exhaustive sweep in the repository would
  make that agreement a test rather than an observation; it lives in a scratch
  directory and has now caught two classes of bug the checker's own tests did
  not.
- **`npm run prevalence` was not run over the rewrites.** These are wording
  changes to already-audited prose rather than new claims, and no fact was added
  — but the handoff's warning is that a sentence written to fix something is
  where an unsupported claim appears, and this pass wrote fifty of them without
  running the instrument that looks for it.

## What this pass does not establish

**It establishes nothing about any entry's facts.** No source was read for what
it says, only for what words it uses. Every disagreement between sources that an
earlier record left open is still open.

The originality tool cannot certify an entry clean, and after two weeks of
finding new ways for it to miss things, the useful version of that sentence is
sharper: **it has now hidden verbatim runs in two distinct ways, both found by an
instrument built to disagree with it rather than by reading its output.** The
first was a ranking that preferred a tidy alignment to a long quotation; the
second was a length filter that made one in seven of our sentences unreportable.
A clean run means no run this instrument can see, in the 69% of our prose it
reads, against the sources that were on disk. Thorough paraphrase scores like
independent writing and none of this touches it.
