# Auditing an inherited entry: the shape of a sitting, and what bites

Guidance, not record. The passes themselves are in
[`docs/audits/`](../audits/README.md); this is what they taught that the next one
would otherwise have to learn again.

**No counts live on this page.** How many entries have been audited, how many were
faulty and how many remain are in
[the audits index](../audits/README.md) and
[`CONTRIBUTING.md`](../../CONTRIBUTING.md), and are not repeated here — because
they were, and by 2026-08-13 this page was opening with figures 16 entries out of
date while the tally beside it was right. A second copy of a number that moves is
a number that will be wrong.

The companion document for *writing* a new entry is
[the adding-games handoff](2026-08-06-adding-games-handoff.md). Its procedure is
for a blank page. This one is for an entry that already exists, reads well, and
is wrong.

## What an audit is for

Nearly every inherited entry read against its sources has turned out to be faulty —
the running tally is in [the audits index](../audits/README.md). That is not a
comment on whoever wrote them:
the entries were written from real sources and they read like careful work. The
errors are almost never arithmetic — **the tables, the ladders and the thresholds
have come through this audit essentially intact**, and several sittings found no
arithmetic error at all. What fails is the prose around the arithmetic, and it
clusters. (The nearest thing to a counter-example is instructive: a
`scoring_table` value that was correct on its own and made wrong by a rule stated
several paragraphs away. The number was right. The reader would still have scored
the hand wrong.)

**The categories, in the order they turn up:**

1. **A variation promoted to the base rule**, with the real rule sitting in the
   entry's own hedge. The purest example: `golf` gave "only a queen plays onto a
   king" as its rule and demoted "nothing may be packed on a king" to "a harsher
   version appears in some rule sets" — where the source states the second as the
   rule and the first as the **first item in its list of ways to make the game
   easier**. Read the entry's hedges first. That is where the rule usually is.
2. **Prevalence claims attached to things no source ranks** — "most tables",
   "the usual", "nearly every computer version", "a common house rule". This is
   the largest single category across the whole audit and it is not close. Two
   sub-cases worth naming separately: a count doing prevalence work on a
   one-of-two ("many descriptions call it the foundation" when one of your two
   sources does), and a rule *demoted* to a house rule when a source gives it
   flatly.
3. **Direction and ending** — who deals next, who leads next, which way play
   goes, and how the game ends. The ending is the part nobody re-reads: you learn
   a game from the top and stop paying attention once you can play a turn.
4. **The variants block**, which has produced as many findings as the main rules
   in several sittings. Audit it as hard as the rules.
5. **A corrected fact still alive in a `scoring_table` or a `figure`.** Reliable
   enough to check for every time. A figure's caption is the usual place.
6. **A negative claim** — "no authoritative study exists", "no authority sets a
   par" — which is the easiest kind of sentence to disprove and the easiest to
   write without checking.

## The shape of a sitting

**Two entries, or three. Not five.** A rushed audit that stamps an entry is worse
than no audit, because the stamp is a claim that somebody read it. Finishing two
properly and saying plainly which were not reached is the expected outcome.

1. **Start from the source map.**
   [The source map](2026-08-11-source-map-for-the-unverified-32.md) already has
   two URLs per remaining entry, with the title each one reads back. Source
   discovery has been paid for; do not pay again.
2. **Control the network in both directions before reading anything.** A real
   page and an invented one, and read the title back out of each. The
   [originality-pass skill](../../.claude/skills/originality-pass/SKILL.md) has
   the three incidents that make this non-negotiable.
3. **Read the entry, then read both sources in full, with the text open.**
   *Read the section. Do not grep the page.* And **never finish a quotation you
   did not see the end of** — the sentence that inverts the meaning is usually
   the second half.
4. **Correct.** Where two sources disagree, say so impersonally — "some
   accounts", "tables vary" — and tell the reader to settle it. **Do not name
   pagat or Wikipedia in entry prose.** Naming a source in an entry makes the
   entry a report about sources instead of a rule set.
5. **Grep the corrected claim across the corpus.** See *Pair the entries* below.
6. **Run the originality pass after the fact fixes**, never before. Then judge
   every finding by eye against its sentence pairs.
7. **Stamp only what you read**, then do the bookkeeping, then
   `npm run build && npm run check`.
8. **Read the rendered page, not the diff.** Every sitting that has done it has
   found something the diff did not show — usually a corrected fact still alive in
   a caption, a figure label or a scoring-table note.
9. **Delete `.sources/`.** Commit, open a pull request, and watch CI land.

## What bites

**Your own corrections carry unsupported claims.** This is the most reliable
finding in the whole audit: **every sitting that has looked for it has found it**,
and each record names its own position in the streak rather than this page keeping
a count. The sentence most likely to contain a prevalence marker is the one being
written to delete one: `golf` gained "often played as a contest" from the correction that
was adding the competitive form, and a gloss on *when* an exception applies that
no source times. **Audit your own new prose before you stamp**, with the same
question you asked of the entry: which source says this?

**A clean originality result is also what a broken tool produces.** Plant a
sentence copied off each source file, watch the run report it with the right
attribution, remove it, and only then trust the clean run. This is the difference
between "the tool found nothing" and "there is nothing".

**A clean originality run used to hide long verbatim runs, and the fix is in the
tool now.** It keeps one match per sentence of ours — rightly, since a passage
matching five pages of a source is one problem — but it used to pick that match on
`order` alone, with `run` only breaking ties. A sentence walking our clause order
with different words in the slots therefore displaced one sharing eleven words
verbatim, and the report named the first. Measured on 2026-08-14: `five-hundred`'s
setup shares eleven words with pagat's deal sentence, the run reported for that
sentence was five, and the entry passed. Reuse now outranks a reading-list match
whatever either scores, and the run is scanned whenever the ceiling leaves room for
it. The bar did not move and 2,354 corpus pairs compare byte-identically, so the
change only ever surfaces what was already there.

**What this does not cover, and still needs a hand-run:** the fields
`PROSE_FIELDS` does not read. Three of the five runs found on 2026-08-14 were in
variant descriptions and a layout caption, which no tool in the repository
compares against anything — see the 31% below. And **every entry stamped before
2026-08-14 was checked by the old ranking**, so a "no REUSE" on any earlier pass is
weaker than it reads. Re-running them means re-fetching sources rather than
re-reading, and it needs no judgement beyond looking at what comes back.

**Rewriting away from one source lands you on the other.** `piquet`'s
cut-for-the-deal sentence went from 43% aligned against one source to **71%**
against the other when it was reworded to escape the first. Both said the same
thing in different shapes. Invert the deduction's order instead of swapping
synonyms.

**Pair related entries, and grep the corrected claim.** A fact corrected in one
entry survives in its neighbour, and no amount of care inside either entry will
show it. `tripeaks` described Golf the way `golf` had described itself before
being audited *the same morning*. Pairing `canfield` with `klondike`, `golf` with
`golf-multiplayer`, and `freecell` with `spider` each bought a check that could
not be run from inside one entry — two of those came back clean, which is a
result only a deliberate pairing can produce. On 2026-08-13 the pairing produced
the worst finding in each of two consecutive sittings.

**Do not build a tool for this. Two shapes were tried on 2026-08-13 and both
fail**, and the second fails in a way worth understanding before anyone tries
again.

*A topic-grep across related entries* — pull every sentence in the target and its
neighbours matching direction, who-deals, sequences and ending, and read the
columns side by side. Prototyped against two leaks whose answers were already
known. It surfaced `tien-len`'s direction error next to its neighbours' and
surfaced `dou-dizhu`'s sequence rule, and it **missed all three of the
`speed`/`spit` findings**: the deal sizes, the per-card score and the invented
card take-back match none of those patterns, and adding patterns until they match
is fitting the instrument to answers you already have. One of two, then none of
three.

*An internal-consistency check* — flag families whose members state contradictory
rules. This one is **inverted, and the measurement is three lines long.** Corrected
`tien-len` says play is clockwise; `dou-dizhu` says anti-clockwise and `big-two`
anticlockwise. The pre-audit `tien-len` said counter-clockwise — so **the wrong
version agreed with both neighbours and the corrected version disagrees with
both.** A consistency check would have passed the error and flagged the fix.

The reason is the thing to keep: **a leaked rule presents as corpus-wide
agreement.** Consistency across related entries is the symptom, not the test.
Only the sources settle it, which is why the instruction is to read the
neighbour's *entry* while reading your own *sources* — and why it stays an
instruction rather than a script.

**Things that are not errors, and must not be "fixed":**

- **Formulaic procedure.** "Deal seven cards to each player, one at a time" has
  no other phrasing. A whole-passage alignment at the bar, made of deal sentences
  in the only order a deal happens, is noise. Read the pairs: the giveaway is our
  sentence aligned against a page heading or an unrelated one.
- **Terms of art.** The poker hand ranks, "right bower (the jack of the trump
  suit)", Skat's multiplier list, "the top card of the discard pile". Rewording
  these makes the entry wrong. Shared *structure* is the problem; shared
  vocabulary is not.
- **A disclosed naming choice applied consistently.** `golf` calls the build pile
  the waste and says in its own setup why, and `golf-multiplayer` and `tripeaks`
  follow. Changing one of them to match a source breaks the agreement.

**Facts you cannot verify are not findings.** Deleting an unsourced-but-plausible
claim leaves the entry no better and the record no honester. Keep it, name it in
the record as resting on nothing read, and leave the hedge in place — removing a
prevalence marker from an unverified fact just states it flatly, which is worse.
`tripeaks`'s scoring table and `mau-mau`'s card values are both carried this way.

## The bookkeeping, which is in six places

Miss one and `npm test` fails, usually with a message about counts not summing to
the corpus.

1. Each entry's `checked` envelope — the stamp does this.
2. A new record in `docs/audits/`, named `YYYY-MM-DD-something.md`.
3. Its row in the `docs/audits/README.md` index table.
4. The running tally under it — audited, faulty, clean, errors.
5. The **entry count in the heading of every older record that lost an entry** to
   this pass, and in `CONTRIBUTING.md`'s standing statement of how many are still
   unverified.
6. `npm run build`, because `rendered/`, `site/` and the booklet all have
   `--check` modes in the gate.

**Two gotchas in the ledger test.** The heading regex wants no punctuation inside
the bold: `**11 entries, checked 2026-08-11**`. And it keys a Map by date across
the records sorted by filename, so **two records sharing one date collide and the
last one wins** — the day's real total has to go in the record that sorts last,
and every other record of that date should state the same number and say it is
the day's rather than the sitting's. A day with several sittings gets messy;
prefer a fresh date if the calendar has rolled.

## Decisions waiting on a person, not on work

These are not tasks. Each has been reached, examined and deliberately left, and a
sitting that picks one up should know it is choosing rather than discovering.

- **The 31% of prose nothing reads.** Variant descriptions, captions, figure
  labels and scoring-table notes are covered by neither the originality checker
  nor the `checked` fingerprint, and `npm run validate` reports the figure on every
  run. [The spec](2026-08-12-the-thirty-percent-outside-the-check.md) lays out
  three options and proposes a second fingerprint; widening `PROSE_FIELDS` instead
  would invalidate all 80 stamps at once. Two things learned since it was written:
  running the existing `compare()` over those fields by hand is a 40-line script
  and has caught real reuse in three sittings, and **correcting an entry grows the
  unread part of it** — the figure rose while entries were being fixed.
- **A facet that disagrees with its own prose, now in two entries.** `speed` and
  `tien-len` both cap `players.max` at 4 while their variant text says more can
  play, because both sources allow it. Raising it drags in `decks_by_players`, a
  `large-group` tag and the picker's behaviour. Both were left visible and recorded
  rather than half-fixed. **A third inheritance would be a pattern**; settle it
  instead.
- **The prevalence gate is measured and unbuilt.** The blocking question was
  answered on 2026-08-13 — see
  [the measurement](2026-08-13-prevalence-vocabulary-precision.md) — and what
  remains is the per-entry budget file and the `validate` hook. Two open design
  questions the numbers inform but do not settle: counts or sentence hashes, and
  where the soft `weak` verdict sits. Note also that the measurement's own reader
  disagreed with itself on the one sentence it judged twice, which is the argument
  for somebody else reading fifty before the gate is built on this number.
- **A stray remote branch**, `claude/audit-friction-fixes` at `b296071`: a
  duplicate commit with no pull request against it. Sessions working through the
  agent proxy have not been able to delete a remote branch, so it needs a person.

## What is left

**Nothing is left of the inherited backlog.** The last entry on a wording-only
stamp, `koi-koi`, was read on 2026-08-14, and every entry in the collection has
now been read against its sources looking for false statements. What that does
and does not mean is in
[`CONTRIBUTING.md`](../../CONTRIBUTING.md), which is the number to trust; this
paragraph has been stale before.

**The natural blocks are used up.** The solitaires went as a block and the
trick-taking set went as a block; `speed` and `spit` were the strongest pairing
the corpus had — same source page, shared alias — and that was spent on
2026-08-13, where three of one entry's fifteen findings came out of it. See
[the record](../audits/2026-08-13-speed-and-fan-tan.md).

**Both of the last two were spent, and they did not pay alike.** `five-hundred`
was read against `euchre` on 2026-08-14 — pagat files 500 at `euchre/500.html`,
and the bowers and the going-alone option are inherited. **That pairing came back
clean**, which broke a run of two sittings in which it had produced the worst
finding, and a clean pairing is a result only a deliberate one can produce. What
it did turn up is subtler than a leaked rule and worth watching for: `euchre`
counts its trump suit correctly because all its suits are the same length, and
`five-hundred` **copied the sentence pattern onto an asymmetric pack without
re-doing the arithmetic**. A leak can be a shape rather than a rule. See
[the record](../audits/2026-08-14-five-hundred-and-accordion.md).

**The other was spent on 2026-08-13 and paid.** `tien-len` read against
`dou-dizhu` found that `tien-len` was carrying `dou-dizhu`'s rule barring twos from
sequences, where both of its own sources give a two capping a run flatly — the
entry had its base rule filed as a regional variant. Its wrong play direction looks
like it came from the same two neighbours, both of which are anticlockwise where
Tien Len is clockwise. See [the record](../audits/2026-08-13-tien-len.md). **That
is the second sitting running in which the pairing produced the worst finding**, and
the argument for spending the last one rather than saving it.

**`koi-koi` was read alone on 2026-08-14**, there being no second hanafuda entry
to pair it with, and its record says so rather than manufacturing a pairing out of
the `category` field. Two things it taught are worth carrying into any re-read.
**Find a third source before the sitting starts**: `accordion`'s worst error was
invisible against its two mapped sources and obvious against a third its own
`sources_consulted` already named, and `koi-koi`'s scoring disagreement could not
be settled at all, because Wikipedia's yaku table does not survive the
`explaintext` extract and the obvious third page put up a bot interstitial
mid-sitting. **And read the entry's attributed sources, not just the map's two.**

A sitting that reads an entry singly should say so in its record rather than
manufacture a pairing out of the category field. That field is the wrong
instrument for it: `fan-tan` shares `shedding` with eleven entries and its keyword
"Sevens" with two, both of which use the word for an unrelated rule about the rank
seven. **The 2026-08-13 sitting wrote "each of the five left is alone in its
family" into this paragraph and it was false** — every one of the five has audited
siblings in its category, and two of them have real family pairings, as above. The
claim was corrected the same day. Check the source map's URLs for a shared
directory before concluding an entry has no partner.

Open work that is not an audit:

- The prevalence-marker lint in
  [its spec](2026-08-11-prevalence-markers-and-the-write-time-gate.md) is
  designed and not built. Its blocking question — whether the vocabulary is
  precise enough to gate on — was answered on 2026-08-13 by reading 75 flagged
  sentences: [the measurement](2026-08-13-prevalence-vocabulary-precision.md).
  **The design holds and the word list did not**; a revised vocabulary reaches
  80% precision on held-out text against the original's 52%, and `npm run
  prevalence` is the instrument, reporting only. What is left is the per-entry
  budget file and the `validate` hook. Note the ceiling the same measurement
  put on it: 5 of one sitting's 26 findings were marker-catchable, so this is a
  fifth of the work, not a replacement for the pass.
- **`npm run prevalence -- --game <slug>` is worth one minute during an audit.**
  It reads variant descriptions, which the originality checker does not, and the
  two entries audited on 2026-08-13 went from 6 flagged sentences to 1 — every
  one of the five removed having been found by reading first. Use it as a second
  pass over your own corrections, which is where this category keeps appearing.
- `whist`'s revoke penalty needs a third source.
- The alias sweep left 64 unconfirmed names and three unresolved `fan-tan`
  aliases.
- `sources_consulted` carries `GameRules.com`, `Gamerules.com` and `Game Rules`
  for one site. The first two slug identically; the third does not, so a stamp
  naming one cannot match a source file named for the other. Nothing is broken
  today.
- **The `--stamp` source-name guard fired in five consecutive sittings** — an
  entry whose `sources_consulted` did not name a source that was actually read,
  caught only at stamp time after the reading was done. It is a write-time check
  wearing a stamp-time coat, and moving it into `npm run validate` would cost one
  rule and save the same twenty minutes every sitting. Note the second way to trip
  it, found on 2026-08-14: the guard slugs both sides to letters and digits, so
  `GameRules.com` becomes `gamerulescom` and the obvious filename `gamerules.txt`
  becomes `gamerules`, and the two do not match. Name the file for the attributed
  name, not for the site.
- `package-lock.json` recorded a workspace version far behind the released one.
  Closed incidentally on 2026-08-14: a plain `npm install` at the start of the
  sitting rewrote it to match, so it was one line and nobody had to do anything.
  Worth knowing that it drifts back every release the lockfile is not regenerated
  in, and that `npm ci` tolerates the mismatch rather than failing on it — which is
  why it sat there.
