# Audits

What has actually been read against a source, when, and what was wrong with it.
One record per pass, kept here rather than in `CONTRIBUTING.md` because a pass
record and a contributor guide age in opposite directions: the guide is edited
whenever it stops being true, and a pass record is a statement about a day that
has already happened.

`docs/decisions/` says why the **code** is shaped the way it is. This says what has
been verified about the **data**. Both are historical; neither is edited to
reflect a change of mind.

A record is written once. The only thing corrected in an old one is its entry
count, and only when an entry it covered has since been re-read and moved to a
later pass — so the counts across every record always add up to the corpus, and
`npm test` checks that they do.

**What is not here.** The standing state of the corpus — how many entries are
stamped, how many sources each check had, which entries should be assumed
unverified — lives in [`CONTRIBUTING.md`](../../CONTRIBUTING.md), because that is
what somebody about to change an entry needs. The lessons these passes taught,
which are guidance rather than record, live in
[the adding-games handoff](../specs/2026-08-06-adding-games-handoff.md). A
record here may say what a pass concluded on the day; that is history, not a
second copy of the rules.

| Date | Pass | Entries |
| --- | --- | --- |
| [2026-08-01](2026-08-01-first-pass.md) | Wording compared against sources; facts not checked | 0 |
| [2026-08-03](2026-08-03-three-groups.md) | Three groups, re-read after the fingerprint changed | 21 |
| [2026-08-05](2026-08-05-background-joins-the-fingerprint.md) | Four entries whose `background` had never been compared | 0 |
| [2026-08-06](2026-08-06-omaha.md) | `omaha`, written for this collection rather than inherited | 1 |
| [2026-08-07](2026-08-07-three-trick-taking-entries.md) | Three trick-taking entries, written and checked in one sitting | 5 |
| [2026-08-08](2026-08-08-fifteen-audited.md) | The pass that separated wording from fact | 15 |
| [2026-08-09](2026-08-09-ten-audited.md) | Rules that point the wrong way | 11 |
| [2026-08-10](2026-08-10-ten-audited.md) | The last of the 2026-08-01 group, four re-reads, and two new entries | 16 |
| [2026-08-11](2026-08-11-alias-sweep.md) | Names and aliases swept against sources; no entry's rules read | 0 |
| [2026-08-11](2026-08-11-canfield-and-klondike.md) | `canfield` and `klondike`, read together for the name they share | 11 |
| [2026-08-11](2026-08-11-freecell-and-spider.md) | `freecell` and `spider`, on Solitaire Laboratory rather than a general-audience page | 11 |
| [2026-08-11](2026-08-11-golf-multiplayer.md) | `golf-multiplayer`; `golf` blocked by a source outage | 11 |
| [2026-08-11](2026-08-11-whist-and-pitch.md) | `whist` and `pitch`, the first of the 2026-08-03 group to be audited | 2 |
| [2026-08-11](2026-08-11-words-not-facts.md) | `conquian`, `dou-dizhu` and `piquet` | 11 |
| [2026-08-11](2026-08-11-zero-on-the-fifth.md) | `mau-mau`, emptying the 2026-08-05 pass; the 11 is the day's total across all seven records | 11 |

## The running tally

Counting only the deliberate audits — the passes that read an inherited entry
against its sources looking for **false statements** rather than for copied
wording:

**Audited 51, faulty 45, clean 6, errors 415.**

The six clean ones are worth more than the number suggests. `skat`, `cribbage`,
`canasta`, `scopa`, `texas-holdem` and `gin-rummy` are six of the seven densest
scoring systems in the collection. The seventh is `contract-bridge`, which is
counted among the faulty on the strength of a single overtrick line — the honest
way to count it, but note where that error was: not in one of its numbers, all
of which are exact, but in a sentence describing a rate, in the entry with the
most arithmetic in the collection to get wrong. Across ten entries audited on
2026-08-09, not one arithmetic error was found at all.

**What survives is the arithmetic — the tables, the ladders, the thresholds,
everything somebody obviously sat down and checked. What fails is the prose
around it: who is allowed to do a thing, what happens on a tie, which of two
conventions is the common one, which direction the play goes, and — the
2026-08-10 batch's contribution — how the game ends.** Three of that batch's
five had the ending wrong, which is the part of a rule set nobody re-reads: you
learn a game from the top and stop paying attention once you can play a turn.
Look there first.
