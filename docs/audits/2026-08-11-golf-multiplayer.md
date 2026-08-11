# 2026-08-11 — Golf, the card game, and a source that went down mid-sitting

- **Kind:** Historical. Written once, never revised; only its counts are
  corrected when entries move to a later pass.
- **Date:** 2026-08-11

## What was checked

**9 entries, checked 2026-08-11** — the day's total across all six records of
this date, for the reason
[the first of them](2026-08-11-words-not-facts.md) sets out. This sitting read
**one** entry: `golf-multiplayer`.

**One audited, one faulty, eight wrong or unsupported statements** — two of them
base rules that both sources contradict, and one an omission that would make a
table score a card wrong.

**23 entries remain on 2026-08-03.**

Sources: [pagat](https://www.pagat.com/draw/golf.html) and
[Wikipedia](https://en.wikipedia.org/wiki/Golf_(card_game)), with
[Wikipedia's Golf (patience)](https://en.wikipedia.org/wiki/Golf_(patience))
read as well to check the entry's description of the other game of the same
name.

## Why one entry, and what stopped the second

The sitting was planned as `golf` and `golf-multiplayer` together — the same
pairing logic that worked for `canfield` and `klondike`, two different games
sharing one name, where whether the two entries agree cannot be checked from
inside either. **`golf` was not audited.** Its second source, Game Rules, went
down partway through.

That failure is worth writing down because of how it presented. The page
answered, and what it answered with was sixteen bytes: `error code: 522`,
Cloudflare's origin timeout. Every Game Rules page went the same way, including
the two read successfully an hour earlier for `canfield` and `klondike`. The
status line is **HTTP 522**, so the source map's existing bar catches it — but
the thing that actually caught it here was reading the page title back and
getting nothing, before any status was checked.

**Game Rules is the second source for nine of the remaining entries.** Until it
returns, `accordion`, `clock`, `forty-thieves`, `golf`, `pyramid`, `tripeaks` and
`yukon` cannot be audited as the source map plans them. `freecell` and `spider`
pair Wikipedia with Solitaire Laboratory, which is up, and the trick-taking
group pairs pagat with Wikipedia, which are up. A sitting that finds Game Rules
down should go there instead of waiting.

## The cross-name check, which came back clean

`golf-multiplayer` spends a paragraph warning the reader off the solitaire, and
describes it: "seven columns of five", unloaded "one rank up or down". Both are
right against Golf (patience) on Wikipedia.

The one thing that looked wrong was not. The entry calls the pile they go onto a
**waste pile**, where Wikipedia calls it a **foundation** and gives the game the
alternative name One Foundation. Our `golf` entry uses "waste" throughout — and
says why, in its own setup: "Many descriptions call that build pile the
foundation, which is where the alternative name One Foundation comes from." That
is a disclosed choice, made once and applied consistently across both entries,
not a drift. **Left alone.** Changing it would have broken the agreement the
check was run to confirm.

## `golf-multiplayer` — eight

Two base rules first, because both are the same shape and it is the shape this
audit was set up to find: **a variation promoted to the base rule, with the real
rule sitting in the entry's own hedge.**

1. **The hand's ending was inverted.** The entry had the hand ending when a
   player exposes their sixth card, *then* every other player taking one more
   turn, with instant scoring as the thing "some groups" do. pagat: "The play
   ends as soon as the last of a player's six cards is face up. The hand is then
   scored" — and separately, "Many play that after a player's last card is
   exposed, each of the other players plays one more turn." Wikipedia agrees:
   the round ends, and "sometimes the other players are given one final turn".
   The entry had built tactics on the wrong one — that going out first "is not by
   itself a win" — when under both sources' base rule it very nearly is.
2. **The flip was made part of an ordinary turn.** The entry had refusing a
   stock card and turning one of your own face-down cards up as the base move,
   "the ordinary way of opening up your grid". In both sources you simply
   discard the drawn card and your turn ends; turning a card up is a variation,
   and pagat gives a second one the entry did not have — spending a whole turn
   turning a card up and drawing nothing.

Then the numbers and the names:

3. **The table was capped at six players.** pagat runs 2–8, with a second pack
   above four and a third above eight. The ceiling of six was the entry's own.
4. **Polish Polka and Polish Poker were attached to Four-Card Golf.** pagat
   attaches them to Golf in general: "Golf is also sometimes known as Polish
   Polka or Polish Poker; the 4-card game is known by some players as Turtle,
   the 6-card game as Hara Kiri, and the 9-card game as Crazy Nines." Turtle was
   right. `Hara Kiri` was already in the entry's aliases, correctly.
5. **The joker value was ranked.** "Minus five is the most widely used value" —
   pagat lists minus five, minus three, minus two and zero with nothing to
   choose between them.
6. **And the rule that travels with jokers was missing entirely.** pagat says it
   twice: where jokers are used, twos count **plus** two rather than minus two.
   The entry recommended jokers, kept the twos at minus two in its prose, and
   kept them at minus two in the `scoring_table` — so a table adding jokers on
   this entry's advice would have scored every 2 wrong by four points. Both the
   prose and the table say so now. **That is the seventh time a fact has needed
   correcting inside a `scoring_table`**, and the first where the table was
   wrong because of a rule stated nowhere near it.
7. **The knocker's penalty was ranked and slightly wrong.** "The usual sting is
   that a knocker who turns out not to be lowest has their score for the hand
   doubled." pagat gives three, unranked: ten points added; the score doubled
   **with five more on top**; or a score equal to the worst at the table. It also
   gives a reward for a correct knock, which the entry did not have.
8. **"Tables that play this version almost always bolt the knock onto it."**
   pagat says the knock is "used most often" in the four-card game, which is not
   the same claim.

**Recorded, not acted on.** The rule for a spent stock — take the top discard
aside, shuffle the rest, set them down as a new stock — is in neither source.
Neither contradicts it and it is the ordinary convention, so it stays and is
named here. The two sources also differ on Nine-Card Golf's pack count: pagat
says two or more decks always, Wikipedia says one is adequate up to three
players. The entry follows Wikipedia.

## The originality pass, run after the fact fixes

Three REUSE findings, and **all three were judged and kept**. Each is a phrase
this project has already decided cannot be reworded without making the entry
wrong, listed by name in CONTRIBUTING: "the top card of the discard pile" and
"face up on the discard pile", noun phrases with no second form. All three are
in prose this sitting did not touch.

That is worth separating from the run of the last twelve passes, where every
REUSE finding came from that day's own correction. These did not come from a
correction and they are not findings — the tool is working and the answer is no.

One READ finding was acted on, and it is the documented pattern: "The player to
the dealer's left takes the first turn and play runs clockwise" against pagat's
"The player to the dealer's left begins, and the turn to play passes clockwise"
— the same clause order with the words swapped, which is what CONTRIBUTING means
by derived expression. Restructured to lead with the direction and fold in the
rotation of the deal, and the finding cleared.

## What this pass does not establish

Nothing about `golf`, which was planned and blocked. Nothing about the 23
entries still on 2026-08-03. The entry rests on two sources; where they differ —
Nine-Card Golf's pack count — the entry follows one and this record says which.
The originality tool cannot certify the entry clean and no run of it here is
reported as having done so.
