# 2026-08-11 — A source map for the 32 unverified entries

**Kind:** Working aid, for the sittings that audit these entries. Not a record
of a pass; the pass record is
[`docs/audits/2026-08-11-alias-sweep.md`](../audits/2026-08-11-alias-sweep.md).

## Why this exists

Source **discovery** — not source reading — is what has been eating the sittings.
Two of five entries in one sitting and three of five in another were lost to it.
The reading is the work; hunting for a URL that turns out to 404, or to be the
wrong game, or to be a stub with no rules on it, is not.

So: two confirmed sources for each of the 32 entries that still carry a
`2026-08-03` or `2026-08-05` stamp, found once, here.

## What "confirmed" means here, and what it does not

Each URL below was fetched and had to clear three bars: it answers **200**, its
body text **names the game**, and it carries more than **1,500 characters** of
text. All three are needed, and each was added because something got through
without it:

- Status alone is not enough — but it is essential. **Wikipedia answers 404 for
  a missing article while echoing the requested title into `<title>`**, so a
  title-based check reports every missing article as present. `Twenty-Nine (card
  game)`, `29 (card game)` and `Fan-Tan (card game)` all return a page titled
  exactly what you asked for. None of them exists.
- **`politaire.com/help/<game>` serves one 2.3 KB client-rendered shell for
  every game**, all titled "Politaire: Polymorphic Solitaire", with no rules in
  the HTML. Nine solitaires here had already been recorded against it.
- Naming the game is not enough either. `gamerules.com/rules/spider/` redirects
  to **Spider Web**, a different solitaire, and passed a contains-"Spider" check
  cleanly. It was caught by reading the title back, and replaced.

**This does not establish that any of these pages is correct, or that the two
for an entry agree with each other.** It establishes that the page exists, is
about that game, and has enough text to read. That is all a map is for.

## Four ways a mapped source has since failed anyway

Added 2026-08-12, after twelve entries were audited off this map in six sittings.
Each of these cleared every bar above, **including the title readback**, and each
was found only by reading the page. The bars are worth keeping; they are just
weaker than they read.

- **A different game with the same name.** `gamerules.com/rules/forty-thieves/`
  is a modern 2-to-4-player connecting board game on a 6-by-6 grid, credited to
  Charles Magri. It answers 200, says "Forty Thieves" throughout, runs to 8 KB and
  titles itself `FORTY THIEVES Game Rules - How To Play FORTY THIEVES`. A title
  check catches a page that *redirects* to another game, which is what the Spider
  Web incident was. It cannot catch a page that is honestly about a different game
  of the same name. **Nothing short of reading the rules finds this**, and the map
  is wrong about that row — see
  [the record](../audits/2026-08-12-yukon-and-forty-thieves.md).
- **A redirect into the parent game's article.** `Twenty-nine (card game)` lands
  on *Twenty-eight*, and `Hand and Foot` lands on *Canasta* at the fragment
  `#Hand and Foot Canasta`. Both are usable, but **only in the passage that names
  the game**; the rest of the page belongs to a relative. Twenty-eight is played
  anti-clockwise where 29 is clockwise, and its article carries a scoring ladder
  headed "20 to 29" that belongs to a six-player variant called Forty. Two of
  `hand-and-foot`'s REUSE findings turned out to be against Canasta's general
  rules rather than its own section. The fetch logs the redirect, so this one is
  visible in advance if you look for it.
- **A page that names the game and carries no rules.** Already recorded below for
  pagat's Egyptian Ratscrew, and it held: the page is naming and derivation only.
  Usable for aliases and ancestry, never for a rule.
- **A source whose numbers are in tables the extract drops.** Wikipedia's
  `explaintext=1` output keeps prose and discards tables. The red dog article's
  spread, house-edge and probability tables all arrived as bare headings with
  nothing under them, so the payout ladder the entry rests on could not be checked
  against it at all — it was checked against pagat instead. **A source that
  answers 200 and reads back its own title can still be missing exactly the part
  you came for**, and the byte count will not tell you, because the prose around
  the tables is bulky.

Two rows are also stale. `forty-thieves`' second source is the wrong game and was
replaced by Denexa Games and BVS Solitaire; `solitairecentral.com`, listed in
several entries' `sources_consulted`, no longer answers at all.

## Traps in this batch, found while building it

- **`klondike` is not on pagat at all** — no page, and nothing in the A–Z index.
  Neither are `clock`, `mau-mau`, `koi-koi` or `red-dog`. Do not read pagat's
  silence as the game being obscure.
- **`forty-thieves`' Wikipedia article is titled *Napoleon at St Helena***, and
  **`hand-and-foot`'s URL redirects into *Canasta***: Wikipedia has no
  standalone Hand and Foot article, only a section.
- **`twenty-nine` has no Wikipedia article of its own.** `Twenty-nine (card
  game)` redirects to **`Twenty-eight (card game)`**, which is where the
  coverage lives.
- **`speed` is a *section* of pagat's Spit page** (`patience/spit.html#speed`),
  not a page. Our `speed` and `spit` entries already share the alias "Slam" —
  read the section, not the page.
- **`fan-tan` on Wikipedia is titled *Domino (card game)*.** `Sevens (card
  game)` redirects to the same article; `Fan-Tan (card game)` is a 404.
- **`tien-len` is `climbing/thirteen.html` on pagat** — filed under Thirteen,
  though the page itself is titled Tien Len.
- **`pitch` is `Setback / Pitch`** and **`fan-tan` is `Fan Tan / Sevens`**:
  pagat pages that cover two names at once, so the base rules may be presented
  under the name we do not use.
- **pagat's `war/egyptrat.html` carries no rules.** It names the game and its
  aliases, then says "For the rules, please refer to Oxymoron's Egyptian
  Ratscrew Page". It is usable for naming and derivation and nothing else, which
  is why the second source below is Bicycle's page instead.
- **`klondike`'s second source is gamerules' generic *Solitaire* page.** It does
  name Klondike, but it is a page about "Solitaire" — and note Wikipedia's
  Canfield hatnote, that the US game called Canfield in Britain *is* Klondike.
  `canfield` and `klondike` sit on either side of a live name collision.
- **`pagat.com/alpha.html` answers 301.** Without `-L` you get a 276-byte
  redirect stub, which reads exactly like "pagat does not list this game".

## The map

| entry | confirmed source | the page titles itself |
| --- | --- | --- |
| `accordion` | <https://en.wikipedia.org/wiki/Accordion_(solitaire)> | Accordion (card game) — Wikipedia |
|  | <https://gamerules.com/rules/accordion-solitaire/> | ACCORDION SOLITAIRE Game Rules - How To Play ACCORDION SOLITAIRE |
| `baccarat` | <https://en.wikipedia.org/wiki/Baccarat> | Baccarat — Wikipedia |
|  | <https://www.pagat.com/banking/baccarat.html> | Baccarat - card game rules |
| `beggar-my-neighbour` | <https://en.wikipedia.org/wiki/Beggar-my-neighbour> | Beggar-my-neighbour — Wikipedia |
|  | <https://www.pagat.com/war/beggar_my_neighbour.html> | Beggar My Neighbour - card game rules |
| `canfield` | <https://en.wikipedia.org/wiki/Canfield_(solitaire)> | Canfield (solitaire) — Wikipedia |
|  | <https://gamerules.com/rules/canfield-solitaire/> | Canfield Solitaire - Learn How To Play With Game Rules |
| `clock` | <https://en.wikipedia.org/wiki/Clock_(card_game)> | Clock (card game) — Wikipedia |
|  | <https://gamerules.com/rules/clock-patience/> | Clock Patience - Learn How To Play With GameRules.com |
| `conquian` | <https://en.wikipedia.org/wiki/Conquian> | Conquian — Wikipedia |
|  | <https://www.pagat.com/rummy/conquian.html> | Conquian - card game rules |
| `dou-dizhu` | <https://en.wikipedia.org/wiki/Dou_dizhu> | Dou dizhu — Wikipedia |
|  | <https://www.pagat.com/climbing/doudizhu.html> | Dou Dizhu - card game rules |
| `egyptian-ratscrew` | <https://en.wikipedia.org/wiki/Egyptian_Ratscrew> | Egyptian Ratscrew — Wikipedia |
|  | <https://bicyclecards.com/how-to-play/egyptian-rat-screw> | Egyptian Rat Screw |
| `fan-tan` | <https://www.pagat.com/layout/sevens.html> | Fan Tan / Sevens - card game rules |
|  | <https://en.wikipedia.org/wiki/Domino_(card_game)> | Domino (card game) — Wikipedia |
| `five-hundred` | <https://www.pagat.com/euchre/500.html> | Five Hundred - Card Game Rules |
|  | <https://en.wikipedia.org/wiki/500_(card_game)> | 500 (card game) — Wikipedia |
| `forty-thieves` | <https://en.wikipedia.org/wiki/Forty_Thieves_(card_game)> | Napoleon at St Helena — Wikipedia |
|  | <https://gamerules.com/rules/forty-thieves/> | FORTY THIEVES Game Rules - How To Play FORTY THIEVES |
| `freecell` | <https://en.wikipedia.org/wiki/FreeCell> | FreeCell — Wikipedia |
|  | <https://www.solitairelaboratory.com/fcfaq.html> | FreeCell FAQ and links |
| `golf` | <https://en.wikipedia.org/wiki/Golf_(patience)> | Golf (patience) — Wikipedia |
|  | <https://gamerules.com/rules/golf-solitaire/> | GOLF SOLITAIRE - Learn How To Play With Gamerules.com |
| `golf-multiplayer` | <https://www.pagat.com/draw/golf.html> | Golf - Card Game Rules |
|  | <https://en.wikipedia.org/wiki/Golf_(card_game)> | Golf (card game) — Wikipedia |
| `hand-and-foot` | <https://www.pagat.com/rummy/handfoot.html> | Hand and Foot - Card Game Rules |
|  | <https://en.wikipedia.org/wiki/Hand_and_Foot> | Canasta — Wikipedia |
| `indian-rummy` | <https://en.wikipedia.org/wiki/Indian_Rummy> | Indian Rummy — Wikipedia |
|  | <https://www.pagat.com/rummy/indian.html> | Rules of Card Games: Indian Rummy |
| `klondike` | <https://en.wikipedia.org/wiki/Klondike_(solitaire)> | Klondike (solitaire) — Wikipedia |
|  | <https://gamerules.com/rules/solitaire-card-game/> | Solitaire Card Game Rules - How to Play Solitaire the Card Game |
| `koi-koi` | <https://en.wikipedia.org/wiki/Koi-Koi> | Koi-Koi — Wikipedia |
|  | <https://fudawiki.org/en/hanafuda/games/koi-koi> | Koi-Koi \| Fuda Wiki |
| `mau-mau` | <https://en.wikipedia.org/wiki/Mau_Mau_(game)> | Mau-Mau (card game) — Wikipedia |
|  | <https://de.wikipedia.org/wiki/Mau-Mau_(Kartenspiel)> | Mau-Mau (Kartenspiel) — Wikipedia |
| `piquet` | <https://www.pagat.com/notrump/piquet.html> | Piquet - card game rules |
|  | <https://en.wikipedia.org/wiki/Piquet> | Piquet — Wikipedia |
| `pitch` | <https://www.pagat.com/allfours/pitch.html> | Setback / Pitch - card game rules |
|  | <https://en.wikipedia.org/wiki/Pitch_(card_game)> | Pitch (card game) — Wikipedia |
| `pyramid` | <https://en.wikipedia.org/wiki/Pyramid_(solitaire)> | Pyramid (solitaire) — Wikipedia |
|  | <https://gamerules.com/rules/pyramid-solitaire/> | Pyramid Solitaire Card Game - Learn To Play With Game Rules |
| `red-dog` | <https://en.wikipedia.org/wiki/Red_dog_(card_game)> | Red dog (card game) — Wikipedia |
|  | <https://www.pagat.com/banking/in-between.html> | In Between - card game rules |
| `speed` | <https://en.wikipedia.org/wiki/Speed_(card_game)> | Speed (card game) — Wikipedia |
|  | <https://www.pagat.com/patience/spit.html> | Spit - Card Game Rules |
| `spider` | <https://en.wikipedia.org/wiki/Spider_(solitaire)> | Spider (solitaire) — Wikipedia |
|  | <https://www.solitairelaboratory.com/spider.html> | Questions about Spider and its strategy |
| `tarneeb` | <https://www.pagat.com/auctionwhist/tarneeb.html> | Tarneeb - card game rules |
|  | <https://en.wikipedia.org/wiki/Tarneeb> | Tarneeb — Wikipedia |
| `teen-patti` | <https://en.wikipedia.org/wiki/Teen_patti> | Teen patti — Wikipedia |
|  | <https://www.pagat.com/vying/teen_patti.html> | Teen Patti - card game rules |
| `tien-len` | <https://en.wikipedia.org/wiki/Ti%E1%BA%BFn_l%C3%AAn> | Tiến lên — Wikipedia |
|  | <https://www.pagat.com/climbing/thirteen.html> | Tien Len - card game rules |
| `tripeaks` | <https://en.wikipedia.org/wiki/Tri_Peaks_(game)> | Tri Peaks (game) — Wikipedia |
|  | <https://gamerules.com/rules/tri-peaks-solitaire/> | Tri-Peaks Solitaire - Learn How To Play With Game Rules |
| `twenty-nine` | <https://www.pagat.com/jass/29.html> | Twenty-Nine - card game rules |
|  | <https://en.wikipedia.org/wiki/Twenty-eight_(card_game)> | Twenty-eight (card game) — Wikipedia |
| `whist` | <https://www.pagat.com/whist/whist.html> | Whist - card game rules |
|  | <https://en.wikipedia.org/wiki/Whist> | Whist — Wikipedia |
| `yukon` | <https://en.wikipedia.org/wiki/Yukon_(solitaire)> | Yukon (solitaire) — Wikipedia |
|  | <https://gamerules.com/rules/yukon-solitaire/> | YUKON SOLITAIRE Game Rules - How To Play YUKON SOLITAIRE |

## 2026-08-11: gamerules.com was down

Added to the map rather than to a pass record, because it is operational and the
next sitting needs it. Partway through 2026-08-11 every `gamerules.com` page
began answering **HTTP 522** — Cloudflare's origin timeout — with a sixteen-byte
body reading `error code: 522`. Pages read successfully an hour earlier went the
same way, so it is the site and not a block on any one reader.

The status bar above catches it, since 522 is not 200. What caught it on the day
was reading the page title back and getting nothing, before any status was
checked — which is the cheaper test and the one to run first.

**It blocks nine of the remaining entries**, being the second source for
`accordion`, `clock`, `forty-thieves`, `golf`, `pyramid`, `tripeaks` and `yukon`,
and it was the second source used for `canfield` and `klondike` before they were
audited. A sitting that finds it still down should go to `freecell` and `spider`,
which pair Wikipedia with Solitaire Laboratory, or to the trick-taking group,
which pairs pagat with Wikipedia. All of those were reachable when this was
written.

One correction to the map while here: it pairs `klondike` with gamerules' generic
*Solitaire* page. The site also has a dedicated Klondike page at
`/rules/klondike/`, which redirects to `/rules/klondike-solitaire/` and reads
back with the right title. That is a canonical redirect and not the Spider Web
trap; the two are told apart by reading the title, not by following the status.

## Still to find

Nothing: all 32 have two confirmed sources. What none of them has is a **third**,
which matters where the two disagree — and where one of the two is a
general-audience page (`gamerules.com`, Bicycle) rather than a rules archive,
the disagreement is more likely. Nine of the solitaires rest on Wikipedia plus
`gamerules.com`; the two hardest, `freecell` and `spider`, rest on Wikipedia
plus Solitaire Laboratory, which is the better pairing. Note also that Solitaire
Laboratory's FreeCell FAQ is served hard-wrapped at about 70 columns, which has
broken the originality checker's sentence splitting before — unwrap it first.
