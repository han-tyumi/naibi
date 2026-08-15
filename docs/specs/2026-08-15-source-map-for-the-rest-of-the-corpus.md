# 2026-08-15 — A source map for the other 48 entries

**Kind:** Working aid, for any pass that needs source text for an entry the
2026-08-11 map does not cover. Not a record of a pass; that is
[`docs/audits/2026-08-15-verbatim-resweep.md`](../audits/2026-08-15-verbatim-resweep.md).

## Why this exists

[The 2026-08-11 map](2026-08-11-source-map-for-the-unverified-32.md) covers the
32 entries that were unverified when it was written, and it says why: **source
discovery, not source reading, is what eats a sitting.** The other 48 entries
were audited before that lesson was written down, and none of their URLs went
anywhere. The 2026-08-15 re-sweep had to resolve all of them again, so here they
are.

## What "confirmed" means here, and what it does not

Each URL below was fetched **twice**, had to answer 200, had to read its own
title back, and had to yield more than 1,500 characters of text. Wikipedia rows
went through the API rather than the article, which returns an explicit
`missing` marker for a title that does not exist instead of a page named after
whatever you asked for. The title in the last column is what the page called
itself on the day.

**This does not establish that any page is correct, that it is the page an
earlier audit read, or that the two for an entry agree.** In particular the last
of those: for these 48 entries nobody wrote down which page the original check
used, so a row here is the page *this* map resolved, not necessarily the one an
entry was written beside.

## Six ways a resolution went wrong, all caught by reading the title back

pagat's A–Z index is the obvious instrument and it is not reliable on its own.
Four of its entries resolve to something other than the game's rules:

- **`Rummy`** resolves to the **Indian Rummy** page. The rules are at
  `rummy/rummy.html`.
- **`Whist`** resolves to **Bid Whist**, a different game.
- **`Concentration`** resolves to a page of **domino** rules. The card game is
  `misc/pelmanism.html`.
- **`Five Card Draw`** resolves to an **index of draw poker variants**, not to
  the game — the rules are at `poker/variants/5draw.html`.

And two pagat pages name the game and carry no rules, the failure mode the
earlier map records for Egyptian Ratscrew:

- **`beating/durak.html` is a family index.** Podkidnoy Durak's rules are at
  `beating/podkidnoy_durak.html`: 25,548 characters against the index page's
  2,186.
- **`marriage/bezique.html` carries no rules at all** — history, then a list of
  links to other people's rule sets. The row is kept below because it is what
  pagat has, and it is marked. **An entry resting on it rests on one source.**

A cheap screen catches both kinds: count rule vocabulary — deal, trick, shuffle,
discard, score — per thousand characters across every file fetched, and read the
two or three at the bottom. It flagged both of these and nothing else.

## Three fetch paths worth knowing about

- **`sheepshead.org/rules/` is a contents page.** The rules are at
  `/rules/sheepshead-basic-rules/`.
- **The Deutscher Doppelkopf-Verband publishes its rules as a PDF**, linked from
  an HTML index. The PDF extracts cleanly to 28 pages of text, and it controls
  the way everything else does: an invented URL answers 404 with an HTML body,
  which a PDF reader refuses as an invalid header.
- **bvssolitaire.com answers node's `fetch` with HTTP 503 and `curl` with HTTP
  200**, twice each, same machine, same user agent. It is a transport difference,
  not an outage. Do not record the site as unreachable on a 503 from one client.

## The map

| entry | attributed as | url | the page titles itself |
| --- | --- | --- | --- |
| `belote` | Pagat | <https://www.pagat.com/jass/belote.html> | Belote - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Belote> | Belote |
| `bezique` | Pagat | <https://www.pagat.com/marriage/bezique.html> | Bezique - card game rules — **no rules on the page** |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Bezique> | Bezique |
| `big-two` | Pagat | <https://www.pagat.com/climbing/bigtwo.html> | Big Two - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Big_two> | Big two |
| `blackjack` | Pagat | <https://www.pagat.com/banking/blackjack.html> | Blackjack - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Blackjack> | Blackjack |
|  | Wizard of Odds | <https://wizardofodds.com/games/blackjack/> | Online Blackjack Guide with Basics, Odds, How To Play & Strategy |
| `briscola` | Pagat | <https://www.pagat.com/aceten/briscola.html> | Briscola - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Briscola> | Briscola |
| `bs` | Pagat | <https://www.pagat.com/beating/doubt.html> | I Doubt It - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Cheat_(game)> | Cheat (game) |
| `canasta` | Pagat | <https://www.pagat.com/rummy/canasta.html> | Canasta: rules and variations of the card game |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Canasta> | Canasta |
| `caribbean-stud` | Pagat | <https://www.pagat.com/banking/caribbean.html> | Caribbean Stud Poker: card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Caribbean_stud_poker> | Caribbean stud poker |
| `casino` | Pagat | <https://www.pagat.com/fishing/casino.html> | Casino - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Cassino_(card_game)> | Cassino (card game) |
| `concentration` | Pagat | <https://www.pagat.com/misc/pelmanism.html> | Pelmanism - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Concentration_(card_game)> | Concentration (card game) |
| `contract-bridge` | Pagat | <https://www.pagat.com/auctionwhist/bridge.html> | Bridge: card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Contract_bridge> | Contract bridge |
| `contract-rummy` | Pagat | <https://www.pagat.com/rummy/ctrummy.html> | Contract Rummy - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Contract_rummy> | Contract rummy |
| `crazy-eights` | Pagat | <https://www.pagat.com/eights/crazy8s.html> | Crazy Eights - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Crazy_Eights> | Crazy Eights |
| `cribbage` | Pagat | <https://www.pagat.com/adders/crib6.html> | Six-card cribbage: card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Cribbage> | Cribbage |
| `doppelkopf` | Deutscher Doppelkopf-Verband | <https://doko-verband.de/shared-files/11534/?Turnierspielregeln-Stand-2026-02-21.pdf> | Turnier-Spielregeln (TSR) des DDV, PDF, 28 pages |
|  | Pagat | <https://www.pagat.com/schafkopf/doko.html> | Doppelkopf - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Doppelkopf> | Doppelkopf |
| `durak` | Pagat | <https://www.pagat.com/beating/podkidnoy_durak.html> | Durak - Card Game Rules |
|  | Wikibooks Card Games | <https://en.wikibooks.org/wiki/Card_Games/Durak> | Card Games/Durak - Wikibooks, open books for an open world |
| `euchre` | Pagat | <https://www.pagat.com/euchre/euchre.html> | Euchre - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Euchre> | Euchre |
| `five-card-draw` | Pagat | <https://www.pagat.com/poker/variants/5draw.html> | Five Card Draw Poker - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Five-card_draw> | Five-card draw |
| `gin-rummy` | Pagat | <https://www.pagat.com/rummy/ginrummy.html> | Gin Rummy - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Gin_rummy> | Gin rummy |
| `go-fish` | Pagat | <https://www.pagat.com/quartet/gofish.html> | Go Fish - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Go_Fish> | Go Fish |
| `hearts` | Pagat | <https://www.pagat.com/reverse/hearts.html> | Hearts - card games rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Hearts_(card_game)> | Hearts (card game) |
| `kings-in-the-corner` | Pagat | <https://www.pagat.com/layout/kingscorners.html> | Kings Corners - card gme rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Kings_in_the_Corner> | Kings in the Corner |
| `mus` | Pagat | <https://www.pagat.com/vying/mus.html> | Mus - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Mus_(card_game)> | Mus (card game) |
| `nertz` | Pagat | <https://www.pagat.com/patience/nerts.html> | Nertz - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Nerts> | Nerts |
| `oh-hell` | Pagat | <https://www.pagat.com/exact/ohhell.html> | Oh Hell! - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Oh_hell> | Oh hell |
| `old-maid` | Pagat | <https://www.pagat.com/passing/oldmaid.html> | Old Maid - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Old_maid_(card_game)> | Old maid (card game) |
| `omaha` | Pagat | <https://www.pagat.com/poker/variants/omaha.html> | Omaha Poker - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Omaha_hold_'em> | Omaha hold 'em |
| `palace` | Pagat | <https://www.pagat.com/beating/shithead.html> | Shithead - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Shithead_(card_game)> | Shithead (card game) |
| `pinochle` | Pagat | <https://www.pagat.com/marriage/pinmain.html> | Single Deck Pinochle - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Pinochle> | Pinochle |
| `president` | Pagat | <https://www.pagat.com/climbing/president.html> | President - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/President_(card_game)> | President (card game) |
| `rummy` | Pagat | <https://www.pagat.com/rummy/rummy.html> | Rummy - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Rummy> | Rummy |
| `rummy-500` | Pagat | <https://www.pagat.com/rummy/500rum.html> | 500 Rummy - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/500_rum> | 500 rum |
| `schieber-jass` | Pagat | <https://www.pagat.com/jass/schieber.html> | Schieber Jass - card game rules |
|  | Wikipedia (German) | <https://de.wikipedia.org/wiki/Jass> | Jass |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Jass> | Jass |
| `scopa` | Pagat | <https://www.pagat.com/fishing/scopa.html> | Scopa - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Scopa> | Scopa |
| `seven-card-stud` | Pagat | <https://www.pagat.com/poker/variants/7stud.html> | Seven Card Stud - poker rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Seven-card_stud> | Seven-card stud |
| `sheepshead` | Pagat | <https://www.pagat.com/schafkopf/shep.html> | Sheepshead - card game rules |
|  | Sheepshead.org | <https://www.sheepshead.org/rules/sheepshead-basic-rules/> | Sheepshead Basic Rules – Sheepshead |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Sheepshead_(card_game)> | Sheepshead (card game) |
| `skat` | Pagat | <https://www.pagat.com/schafkopf/skat.html> | Skat - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Skat_(card_game)> | Skat (card game) |
| `slapjack` | Pagat | <https://www.pagat.com/war/slapjack.html> | Rules of Card Games: Slapjack |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Slapjack> | Slapjack |
| `snap` | Pagat | <https://www.pagat.com/war/snap.html> | Snap - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Snap_(card_game)> | Snap (card game) |
| `solo-whist` | Pagat | <https://www.pagat.com/boston/solowhist.html> | Solo Whist - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Solo_whist> | Solo whist |
| `spades` | Bicycle Cards | <https://bicyclecards.com/how-to-play/spades> | Spades |
|  | Pagat | <https://www.pagat.com/auctionwhist/spades.html> | Spades - card game rules |
| `spit` | Pagat | <https://www.pagat.com/patience/spit.html> | Spit - Card Game Rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Spit_(card_game)> | Spit (card game) |
| `spoons` | Pagat | <https://www.pagat.com/passing/pig.html> | Pig, Spoons - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Pig_(card_game)> | Pig (card game) |
| `sueca` | Pagat | <https://www.pagat.com/aceten/sueca.html> | Sueca - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Sueca_(card_game)> | Sueca (card game) |
| `texas-holdem` | Pagat | <https://www.pagat.com/poker/variants/texasholdem.html> | Texas Hold'em Poker - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Texas_hold_'em> | Texas hold 'em |
| `three-card-poker` | Pagat | <https://www.pagat.com/banking/3cardpoker.html> | Three Card Poker - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Three_Card_Poker> | Three Card Poker |
| `truco` | Pagat | <https://www.pagat.com/put/truco.html> | Rules of Card Games: Truco |
|  | Wikipedia | <https://en.wikipedia.org/wiki/Truco> | Truco |
| `war` | Pagat | <https://www.pagat.com/war/war.html> | War - card game rules |
|  | Wikipedia | <https://en.wikipedia.org/wiki/War_(card_game)> | War (card game) |

Sources are listed under the name the entry attributes them by in
`sources_consulted`, because that is what `--stamp` matches a filename against —
and it matches on letters and digits only, so `GameRules.com` needs a file called
`gamerulescom.txt` and `Game Rules` needs `gamerules.txt`. The two are different
sites' worth of trouble for one guard, and `mau-mau` is the entry that has the
second name.

## What is still not written down

**Which page each of these entries was originally written beside.** These are
resolutions, not recoveries. A pass that finds a resolution here wrong should fix
the row rather than assume the entry was read against it.
