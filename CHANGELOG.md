# Changelog

Notable changes to the corpus, the schema and the tools that build from them.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
versions follow [semantic versioning](https://semver.org/), with the contract
being **`packages/data`: its schema and its exports**.

- **major** — a breaking change to the schema or to what the package exports:
  a field removed, a category renamed, a type narrowed. Written `feat!:` or any
  prefix with a `!`.
- **minor** — anything additive: new entries, new optional schema fields, new
  exports. Written `feat:`.
- **patch** — corrections that break nothing: prose fixes, figure fixes,
  tooling, generated output. Written `fix:` or `perf:`.

Releases are cut automatically from those prefixes when Validate goes green on
main; housekeeping types release nothing.

While the version is `0.x`, a **minor** bump may carry a breaking schema change.
That is what `0.x` means, and it is the honest label for a schema that gained a
field the week this was written. Version `1.0.0` is for when the schema stops
moving, not for when the corpus looks big enough.

The version is written in exactly one place — `packages/data/package.json` — and
read from there by everything that needs it, including the booklet's cover. The
release procedure is in
[CONTRIBUTING.md](CONTRIBUTING.md#cutting-a-release).

## [Unreleased]

## [0.11.0] — 2026-08-15

### Added

- a second fingerprint over the prose that hangs off the structured data (#53)

## [0.10.24] — 2026-08-15

### Fixed

- run the source-name guard from validate, and check the sweep's own prose for the claims it warns about (#52)

## [0.10.23] — 2026-08-15

### Fixed

- re-sweep every entry stamped before the ranking fix, and close two more ways a verbatim run stayed hidden (#51)

## [0.10.22] — 2026-08-15

### Fixed

- stop a verbatim run hiding behind a better-aligned sentence, and let variants declare the table they seat (#50)

## [0.10.21] — 2026-08-14

### Fixed

- audit koi-koi, emptying the 2026-08-03 pass (#49)

## [0.10.20] — 2026-08-14

### Fixed

- audit five-hundred and accordion, and a clean run that was hiding a run (#48)

## [0.10.19] — 2026-08-14

### Fixed

- audit teen-patti, and stop the handoff keeping its own stale counts (#47)

## [0.10.18] — 2026-08-13

### Fixed

- audit tien-len, whose base rule came from the neighbour (#46)

## [0.10.17] — 2026-08-13

### Fixed

- audit speed and fan-tan against their sources (#44)

## [0.10.16] — 2026-08-13

### Fixed

- audit pyramid and clock (#43)

## [0.10.15] — 2026-08-13

### Fixed

- close the friction six audit sittings kept hitting (#42)

## [0.10.14] — 2026-08-13

### Fixed

- audit baccarat and red-dog, two banked games and their rates (#41)

## [0.10.13] — 2026-08-13

### Fixed

- audit hand-and-foot and indian-rummy (#40)

## [0.10.12] — 2026-08-12

### Fixed

- audit tarneeb and twenty-nine, the trick-taking pair (#39)

## [0.10.11] — 2026-08-12

### Fixed

- audit beggar-my-neighbour and egyptian-ratscrew (#38)

## [0.10.10] — 2026-08-12

### Fixed

- audit yukon and forty-thieves, the two unaudited packers (#37)

## [0.10.9] — 2026-08-12

### Fixed

- audit golf and tripeaks, the same move in two games (#35)

## [0.10.8] — 2026-08-12

### Fixed

- audit freecell and spider against Solitaire Laboratory (#34)

## [0.10.7] — 2026-08-11

### Fixed

- audit golf-multiplayer, and spec a write-time gate for prevalence markers (#33)

## [0.10.6] — 2026-08-11

### Fixed

- audit canfield and klondike, read together for the name they share (#32)

## [0.10.5] — 2026-08-11

### Fixed

- audit mau-mau, emptying the 2026-08-05 pass (#31)

## [0.10.4] — 2026-08-11

### Fixed

- audit conquian, dou-dizhu and piquet against their sources (#30)

## [0.10.3] — 2026-08-11

### Fixed

- audit whist and pitch, the first two of the 2026-08-03 group (#29)

## [0.10.2] — 2026-08-11

### Fixed

- sweep the aliases, and map sources for the 32 unverified entries (#28)

## [0.10.1] — 2026-08-10

### Fixed

- audit blackjack, spades and durak, and correct the fact-check claim (#27)

## [0.10.0] — 2026-08-10

### Added

- add solo whist, the last conspicuous gap in trick-taking (#26)

## [0.9.1] — 2026-08-10

### Fixed

- war called the three-card war what most people know; the sources say many (#25)

## [0.9.0] — 2026-08-10

### Added

- add bezique, the game pinochle descends from (#24)

## [0.8.9] — 2026-08-10

### Fixed

- reconcile deck thresholds between prose and data, and test the class (#23)

## [0.8.8] — 2026-08-10

### Fixed

- audit the last five inherited entries, four with the wrong base rule (#22)

## [0.8.7] — 2026-08-10

### Fixed

- audit five inherited entries, three with the ending wrong (#21)

## [0.8.6] — 2026-08-09

### Fixed

- audit president, whose card exchange was one configuration of a rule (#20)

## [0.8.5] — 2026-08-09

### Fixed

- audit kings-in-the-corner, which had the turn backwards (#19)

## [0.8.4] — 2026-08-09

### Fixed

- audit four more inherited entries against their sources (#16)

## [0.8.3] — 2026-08-09

### Fixed

- audit six inherited entries against their sources (#15)

## [0.8.2] — 2026-08-09

### Fixed

- audit fourteen inherited entries against their sources (#13)

## [0.8.1] — 2026-08-08

### Fixed

- correct three unsourced claims in Sueca, and de-duplicate its trick rule (#12)

## [0.8.0] — 2026-08-08

### Added

- add Doppelkopf, Sheepshead and Schieber Jass (#11)

## [0.7.0] — 2026-08-07

### Added

- add Omaha, Three Card Poker and Caribbean Stud

### Fixed

- stop the schema understating what a stamp covers, and report the collision it cannot rule on
- correct three claims in the new casino entries that their sources do not carry

## [0.6.0] — 2026-08-06

### Added

- report the names two games answer to, and defend what makes that safe

### Fixed

- install the offline copy in tiers, and stop the sheet laying out what it is not showing

## [0.5.0] — 2026-08-06

### Added

- bring background inside the originality check (#7)

## [0.4.0] — 2026-08-05

### Added

- read the prose-field list from one place instead of four

## [0.3.7] — 2026-08-05

### Changed

- Measure the originality bar from a sample, not from every pair

## [0.3.6] — 2026-08-04

### Changed

- Commit the update-notice check, and hand off what scales badly

## [0.3.5] — 2026-08-04

### Fixed

- stop the site's worker answering for branch previews

### Changed

- Shorten the search placeholder to two examples that fit
- Put the preview link on the pull request, as one comment
- Lead the search placeholder with the verb
- Drop the floor control when one player is chosen
- Say that a floor of one means alone

## [0.3.4] — 2026-08-04

### Changed

- State the standard-52 premise in the preparation heading
- Stop the preview cleanup deploying, which is why it failed

## [0.3.3] — 2026-08-04

### Changed

- Filter players by overlap with a range, not an exact count
- Read the deck requirement at every seat in range, not just the smallest
- Filter on what the reader can do to a deck, by subset
- Let the family chips select more than one family
- Rank by coverage and ideal, and say which games cover the range
- Offer the range floor with the counts it would produce
- Say which filters emptied the list
- Index the pack, and stop underselling the search box
- Invert the preparation axis: exclude obstacles rather than claim capabilities
- Derive every chip row, and add the floor and the preparation checkboxes
- Say the new filters in words on the printed sheet
- Say in the Family heading that it takes more than one
- Serve branch previews at a Pages subpath, from a composed site branch
- Seed the site root from main before a preview can publish an empty one
- Stop a preview promising offline and installability it does not have

## [0.3.2] — 2026-08-03

### Changed

- Re-read the last 24 entries whose source count was unknown, and record it
- Replace the extra-deck boolean with a map of decks by player count
- Fix round 1: replace the id exclusion with a rule, fix a stale example
- Read the deck requirement in one place, at the count being asked
- Stop the picker offering games that want a deck you did not say you had
- Fix round 1: route the no-player-count branch through playableWith too
- Judge the deck chip at the player count the reader gave
- Teach the docs about decks_by_players, and stop the README modelling the bug
- Validate CONTRIBUTING's worked example against the real schema
- Print the deck count decksNeeded gives, not standard_decks
- Refuse a garbled deck query on purpose, not by an accidental array miss
- Test that standard_decks is what decksNeeded gives at players.min
- Reorder decks_by_players to schema order in the migrated entries
- Reorder decks_by_players in bs.json too
- Bring the decks-by-players specs in line with what shipped

## [0.3.1] — 2026-08-03

### Fixed

- re-check accordion against a second and third source
- rewrite Beggar-My-Neighbour's card classes, found against pagat
- re-check Forty Thieves against Solitaired and Semicolon Software
- rewrite two FreeCell passages found against Solitaired and the FAQ
- re-check Six-Card Golf against Wikipedia and Bicycle
- re-check Klondike against Bicycle and gamerules
- re-check Koi-Koi against Fuda Wiki and Sloperama
- re-check Mau-Mau against gamerules and pagat's Crazy Eights page
- re-check Pyramid against Solitaired and Wikibooks
- re-check Speed, and drop a restated hand limit
- re-check Spider against Semicolon Software and Solitaired
- reorganise TriPeaks' setup, and close out the 2026-08-03 ledger

### Changed

- Record which sources each check actually had, and test it
- State what the 2026-08-01 pass actually had per entry, and test it
- Hold every stated Node version to the one packages/data promises
- Re-read the ten entries whose source count was unknown, and record it
- Test the two rules that decide what a stamp may record

## [0.3.0] — 2026-08-03

### Added

- print a filtered selection of games from the site

### Fixed

- order versions by first difference, not by "bigger somewhere"

## [0.2.1] — 2026-08-03

### Fixed

- deploy the site from Actions, so a red commit ships nothing

## [0.2.0] — 2026-08-02

### Added

- **Automatic releases.** A push to main that earns one gets one, decided from
  the conventional prefix on each commit subject: `feat` a minor, `fix` a patch,
  a `!` a major, housekeeping nothing at all. The release job runs on Validate
  succeeding, so nothing is ever built from a commit that failed its own gate.
  Anything written by hand in `Unreleased` still beats the generated list.

## [0.1.0] — 2026-08-02

First tagged release, and the first booklet published as a release asset rather
than served out of the default branch.

### Added

- **72 game entries** across nine families, each validated against the schema,
  each rendered to Markdown, to the website, and to the printable booklet.
- **`background`**, an optional schema field for where a game comes from,
  rendered after the rules rather than before them — a reader with a deck in
  hand wants the deal, not the eighteenth century.
- **Browsing by family** on the website, with every filter carried in the URL so
  a filtered view can be linked to and printed.
- **Print styles** for the website, so a page or a filtered index prints
  legibly. A filtered sheet says how many of the corpus it is showing.
- **Type checking for the browser assets**, which nothing had ever looked at.

### Fixed

- The booklet's cover carried the date the build ran, which put the wall clock
  inside bytes that `npm run pdf -- --check` gates: the same corpus produced a
  different file the next day, and the check would have gone red on a
  repository nobody had touched. The cover now carries the version.
- The offline search fallback built an index object missing two fields the
  scorer reads.
- A difficulty the filter could not rank passed every difficulty filter, because
  `undefined > undefined` is false whichever way round it is written.

[Unreleased]: https://github.com/han-tyumi/naibi/compare/v0.11.0...HEAD
[0.11.0]: https://github.com/han-tyumi/naibi/compare/v0.10.24...v0.11.0
[0.10.24]: https://github.com/han-tyumi/naibi/compare/v0.10.23...v0.10.24
[0.10.23]: https://github.com/han-tyumi/naibi/compare/v0.10.22...v0.10.23
[0.10.22]: https://github.com/han-tyumi/naibi/compare/v0.10.21...v0.10.22
[0.10.21]: https://github.com/han-tyumi/naibi/compare/v0.10.20...v0.10.21
[0.10.20]: https://github.com/han-tyumi/naibi/compare/v0.10.19...v0.10.20
[0.10.19]: https://github.com/han-tyumi/naibi/compare/v0.10.18...v0.10.19
[0.10.18]: https://github.com/han-tyumi/naibi/compare/v0.10.17...v0.10.18
[0.10.17]: https://github.com/han-tyumi/naibi/compare/v0.10.16...v0.10.17
[0.10.16]: https://github.com/han-tyumi/naibi/compare/v0.10.15...v0.10.16
[0.10.15]: https://github.com/han-tyumi/naibi/compare/v0.10.14...v0.10.15
[0.10.14]: https://github.com/han-tyumi/naibi/compare/v0.10.13...v0.10.14
[0.10.13]: https://github.com/han-tyumi/naibi/compare/v0.10.12...v0.10.13
[0.10.12]: https://github.com/han-tyumi/naibi/compare/v0.10.11...v0.10.12
[0.10.11]: https://github.com/han-tyumi/naibi/compare/v0.10.10...v0.10.11
[0.10.10]: https://github.com/han-tyumi/naibi/compare/v0.10.9...v0.10.10
[0.10.9]: https://github.com/han-tyumi/naibi/compare/v0.10.8...v0.10.9
[0.10.8]: https://github.com/han-tyumi/naibi/compare/v0.10.7...v0.10.8
[0.10.7]: https://github.com/han-tyumi/naibi/compare/v0.10.6...v0.10.7
[0.10.6]: https://github.com/han-tyumi/naibi/compare/v0.10.5...v0.10.6
[0.10.5]: https://github.com/han-tyumi/naibi/compare/v0.10.4...v0.10.5
[0.10.4]: https://github.com/han-tyumi/naibi/compare/v0.10.3...v0.10.4
[0.10.3]: https://github.com/han-tyumi/naibi/compare/v0.10.2...v0.10.3
[0.10.2]: https://github.com/han-tyumi/naibi/compare/v0.10.1...v0.10.2
[0.10.1]: https://github.com/han-tyumi/naibi/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/han-tyumi/naibi/compare/v0.9.1...v0.10.0
[0.9.1]: https://github.com/han-tyumi/naibi/compare/v0.9.0...v0.9.1
[0.9.0]: https://github.com/han-tyumi/naibi/compare/v0.8.9...v0.9.0
[0.8.9]: https://github.com/han-tyumi/naibi/compare/v0.8.8...v0.8.9
[0.8.8]: https://github.com/han-tyumi/naibi/compare/v0.8.7...v0.8.8
[0.8.7]: https://github.com/han-tyumi/naibi/compare/v0.8.6...v0.8.7
[0.8.6]: https://github.com/han-tyumi/naibi/compare/v0.8.5...v0.8.6
[0.8.5]: https://github.com/han-tyumi/naibi/compare/v0.8.4...v0.8.5
[0.8.4]: https://github.com/han-tyumi/naibi/compare/v0.8.3...v0.8.4
[0.8.3]: https://github.com/han-tyumi/naibi/compare/v0.8.2...v0.8.3
[0.8.2]: https://github.com/han-tyumi/naibi/compare/v0.8.1...v0.8.2
[0.8.1]: https://github.com/han-tyumi/naibi/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/han-tyumi/naibi/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/han-tyumi/naibi/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/han-tyumi/naibi/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/han-tyumi/naibi/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/han-tyumi/naibi/compare/v0.3.7...v0.4.0
[0.3.7]: https://github.com/han-tyumi/naibi/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/han-tyumi/naibi/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/han-tyumi/naibi/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/han-tyumi/naibi/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/han-tyumi/naibi/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/han-tyumi/naibi/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/han-tyumi/naibi/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/han-tyumi/naibi/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/han-tyumi/naibi/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/han-tyumi/naibi/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/han-tyumi/naibi/releases/tag/v0.1.0
