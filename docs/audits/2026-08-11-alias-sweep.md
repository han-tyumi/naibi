# 2026-08-11 — The alias sweep: names that turned out to be relatives

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-11

## What was checked

**0 entries, checked 2026-08-11** — and the zero is correct and is the point of
this record: this pass moved no `checked` stamp, because it read no entry's rules
against a source. It read the **names**. Aliases are not in the prose
fingerprint — [`PROSE_FIELDS`](../../packages/data/src/index.ts) is `setup`,
`play`, `goal_and_scoring`, `background` and nothing else — so an alias can be
wrong for as long as it likes without any check going stale, and nothing in the
toolchain has ever looked at one.

Three sittings running had turned up the same defect as a side-effect of
auditing something else: an alias that names a **relative** rather than the
game. `president` carried `Daifugō`, `blackjack` carried `Vingt-et-Un`, `durak`
carried `Perevodnoy Durak`. Each sends somebody searching for the relative to
the wrong entry, and an alias list is the one part of an entry nobody
proof-reads. This pass went looking for the rest of them on purpose.

**308 names and aliases across 80 entries** went through two independent
machine screens; the entries the screens flagged were then read against source
text. **Three aliases were wrong and are gone**, leaving 305.

## The three

**`clock` — "Four of a Kind" removed.** A different game, and the entry's own
recorded source is the one that says so. Wikipedia's Clock article lists Four of
a Kind under *Related games*, and its Names section is explicit: some sources
give it as an alternative name, "**However, Four of a Kind has a different
layout and mechanism**". Pagat's Four of a Kind is not a patience at all — it is
a vying game for four or more players with an ante and a pot, filed under
Poker > Variations > Non-Poker. `clock` is a one-player solitaire. Two sources,
both against it.

**`clock` — "Hunt" removed.** No source found for it. It is absent from pagat's
A–Z index entirely, and absent from the Wikipedia article that supplies every
other name on the list — that article gives the alternatives as Hidden Cards,
Four of a Kind and Travellers, and the named variant as Watch. This is the
weaker of the two findings and is recorded as what it is: removed for want of
any source rather than on a source that contradicts it. Wikipedia's related-game
listing does carry a *Hide & Seek*, which may be where it came from.

**`crazy-eights` — "Craits" removed.** Wikipedia: "Craits (sometimes spelled
Crates, Kreights or Creights) is a shedding card game for two to five players
**derived from** Crazy Eights, which forms the origin of its name," and it is
described as close to Uno, with a stacking "count" on the twos. Pagat gives it
its own page too — "Crates is a form of Crazy Eights, **with enough extra
rules** to be [its own game]" — and the version documented there is *normally
played by four players in two partnerships*, which our entry is not.

**The tension in that third one is worth writing down, because it nearly went
the other way.** Pagat's *Crazy Eights* page opens by listing alternative names
and "Crates" is among them: "It is sometimes called Crates, Switch, Swedish
Rummy, Last One or Rockaway." That sentence is real and it argues for keeping
it. What decided it was that the entry's string is *Craits*, not *Crates*, and
Craits has exactly one documented referent — the derived game — so the alias
does the harm the sweep exists to prevent. The same sentence is why **"Last
One" and "Rockaway" were kept**: pagat's Last One page calls it "this variation
of Crazy Eights" and has a full separate rule set, which looks like a removal
until you read the base page's own naming sentence.

## What the sweep cleared, and what it did not

Cleared against source text, which is worth recording because a sweep that only
reports removals reads as though everything else was checked:

- `accordion` — all four. Wikipedia's infobox: "Alternative names | The Idle
  Year, Tower of Babel, Methuselah, Leapfrog".
- `forty-thieves` — all four. "Alternative names include Le Cadran ('The Dial')
  and, in the US, Forty Thieves, Big Forty and Roosevelt at San Juan."
- `tarneeb` — all three, from one sentence: "also spelled tarnibe and tarnib,
  and called hakam ... in the Arabian Peninsula".
- `conquian` — "Colonel" names *the two-handed version*, and the entry is
  `min: 2, max: 2`. It matches.
- `piquet` — "Rubicon Piquet" is a form of piquet rather than a synonym, which
  is normally the trap; here the entry says outright that it describes the
  Cavendish 1882 rubicon game and puts the older hundred-point game in its
  variants. The alias names what the entry actually describes.
- `bs` — all four, from pagat's page title and opening line. Note that pagat has
  a *second* page, `beating/doubt.html`, for a different game also called I
  Doubt It, in which everyone plays the same rank; our entry describes the
  ascending-rank game, which is the one that carries all four names.
- `durak` — "Podkidnoy Durak" kept, and this is the counterexample to the
  pattern that started the sweep. Pagat gives it its own page, which looks
  exactly like the `Perevodnoy Durak` finding, but the Durak page says "when
  Russian players refer to Durak, they usually mean this game".
- `canfield` — "Demon" is the UK name. Also flagged for whoever audits it:
  Wikipedia's hatnote reads "This article is about the British game, Demon,
  called Canfield in the US. **For the US game known as Canfield in Britain, see
  Klondike**." Two of our entries sit on either side of that collision.
- `oh-hell` — "Nomination Whist" kept. The name covers at least three games in
  Britain and pagat's page for it says the first of them is described on the Oh
  Hell page.
- `golf` — "One Foundation", from the article's first sentence.
- `fan-tan` — "Sevens" and "Parliament", from pagat's first sentence.
- `red-dog` — "Yablon"; `indian-rummy` — "Paplu", on the Wikipedia article's own
  lead sentence, though the same article also uses Paplu for the wild card
  itself, and Wikipedia's *Paplu* redirect points somewhere else entirely.

**Not checked.** 197 of the 308 appear in neither index. They were screened and
came back unlisted, and unlisted is not evidence — pagat does not index
solitaires (it has no Klondike, no Clock, no Mau-Mau, no Koi-Koi and no Red Dog
page at all), and a bare word like "Fool", "Slam" or "Pig" collides with an
unrelated Wikipedia article whether or not it is also a real alias. Those 197
have not been confirmed by anybody. Three specific ones are open questions
rather than clean: `fan-tan`'s "Play or Pay", which may well be a distinct game
in the same family, and its "Card Dominoes" and "Sjuan", which pagat's page does
not use.

## Two tools that lied, and the controls that caught them

Both were caught by feeding the tool a case whose answer was already known and
checking it answered differently for a case known to differ. Both had already
produced output that looked fine.

**Wikipedia answers 404 for a missing article while echoing the requested title
into `<title>`.** A check that reads the title back gets "Twenty-Nine (card
game) - Wikipedia" from a page that does not exist, and reports every missing
article as present. Only the status code distinguishes them.

**`politaire.com/help/<game>` serves one 2.3 KB client-rendered shell for every
game**, all with the identical title "Politaire: Polymorphic Solitaire" and no
rules in the HTML at all. Nine of them had already been recorded as confirmed
sources on a status-and-title check. Confirming a source now requires the page
to name the game in its body text and to carry more than 1,500 characters, and
that rule is controlled in both directions — a real article about the right game
passes, the same article probed for the wrong game fails.

The third, already known and still true: `pagat.com/alpha.html` answers 301, and
the suit images (`<img alt="spade">`) have to be kept or a plain-text extractor
deletes every suit while erroring on nothing.

## What this pass does not establish

It does not establish that the remaining 305 names are right — 197 of them rest
on nothing but two indexes not listing them. It says nothing whatever about
whether any entry's **rules** are true; the 32 entries carrying a
`2026-08-03` or `2026-08-05` stamp are exactly as unverified as they were this
morning, and the running tally in [`README.md`](README.md) is unchanged
because no entry was audited. Three alias errors were found and are deliberately
not added to that tally's error count, which counts statements found wrong while
reading an entry's rules; mixing the two units would make the number mean two
things at once.
