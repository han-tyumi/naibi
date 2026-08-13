# Auditing an inherited entry: the shape of a sitting, and what bites

Guidance, not record. The passes themselves are in
[`docs/audits/`](../audits/README.md); this is what those eight sittings taught
that a ninth would otherwise have to learn again.

The companion document for *writing* a new entry is
[the adding-games handoff](2026-08-06-adding-games-handoff.md). Its procedure is
for a blank page. This one is for an entry that already exists, reads well, and
is wrong.

## What an audit is for

Fifty-three entries have been read against their sources looking for false
statements. Forty-seven were faulty. That is not a comment on whoever wrote them:
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
8. **Read the rendered page, not the diff.** This has caught something in five
   consecutive sittings.
9. **Delete `.sources/`.** Commit, open a pull request, and watch CI land.

## What bites

**Your own corrections carry unsupported claims.** Five sittings running now.
The sentence most likely to contain a prevalence marker is the one being written
to delete one: `golf` gained "often played as a contest" from the correction that
was adding the competitive form, and a gloss on *when* an exception applies that
no source times. **Audit your own new prose before you stamp**, with the same
question you asked of the entry: which source says this?

**A clean originality result is also what a broken tool produces.** Plant a
sentence copied off each source file, watch the run report it with the right
attribution, remove it, and only then trust the clean run. This is the difference
between "the tool found nothing" and "there is nothing".

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
result only a deliberate pairing can produce.

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

## What is left

Five entries still carry a `2026-08-03` stamp from a pass that compared wording
and never checked facts. Treat them as unverified: `accordion`, `five-hundred`,
`koi-koi`, `teen-patti`, `tien-len`. The standing count is in
[`CONTRIBUTING.md`](../../CONTRIBUTING.md), which is the number to trust; this
paragraph has been stale before.

**The natural blocks are used up, and so is the last real pairing.** The
solitaires went as a block and the trick-taking set went as a block; `speed` and
`spit` were the last two entries in the corpus that could be read against each
other on anything better than a shared category, and that was spent on
2026-08-13 — see [the record](../audits/2026-08-13-speed-and-fan-tan.md), where
three of one entry's fifteen findings came out of the comparison. Each of the
five left is alone in its family. A sitting that reads them singly should say so
in its record rather than manufacture a pairing out of the category field: the
one time a category pairing was checked for `fan-tan`, the two entries that
shared its keyword turned out to use it for an unrelated rule.

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
- `package-lock.json` still records a workspace version far behind the released
  one.
