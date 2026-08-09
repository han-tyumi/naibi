# 0024. `docs/` holds documentation; the generated site is `site/`

- **Status:** Accepted
- **Date:** 2026-08-09
- **Supersedes:** the directory choice in
  [0009](0009-documentation-structure.md) and
  [0023](0023-audit-records-are-a-third-kind-of-document.md). Their reasoning
  about how documents age stands unchanged; only where the files sit moves.

## Context

[0009](0009-documentation-structure.md) rejected MADR's `docs/decisions/` on one
hard point:

> `docs/` is this project's generated GitHub Pages output and is deleted and
> rewritten by `npm run web`. Records placed there would be destroyed by the next
> build.

Every word of that was true. What went unnoticed is that
[0017](0017-deploy-the-site-from-actions-after-the-tests.md) later moved
deployment from "Pages serves the `/docs` folder of main" to an Actions
artifact. From that day the name `docs/` was ours to choose, and the record that
depended on it not being ours was never revisited. `build-web.ts` still carried a
header comment saying Pages served the site from the main branch.

Meanwhile the collision stopped being theoretical. The superpowers plugin, which
this repository already uses — `.superpowers/` is in `.gitignore` — writes its
durable artifacts to `docs/superpowers/specs/` and `docs/superpowers/plans/` by
default. Written there, in this repository, a design document:

1. makes `npm run check` fail with `orphan: docs/superpowers/specs/...`;
2. is answered by the gate's own advice, **`Run: npm run web`**;
3. is deleted by that command, because the build is
   `rmSync(out, { recursive: true, force: true })`.

The remedy the failure message recommends is the thing that destroys the file.
This was proved end to end rather than reasoned about — file written, gate
failed, remedy run, file gone — before any of it was changed.

The deeper problem is that `docs/` meant, in this repository alone, the one
place documentation could not survive. Every tool that reaches for that name by
convention walks into the same wall.

## Considered options

- **Leave it and point superpowers elsewhere in `CLAUDE.md`**, which overrides
  skill defaults. One line, no risk, and it closes this trap. Rejected because it
  closes only this one: the cause is the name, and the next tool with a `docs/`
  default meets the same build. It is a convention fighting a convention, and it
  relies on every future agent noticing the override.
- **Exclude a subtree of `docs/` from the build**, so `npm run web` neither
  deletes nor orphans it. Cheaper than a rename and gives `docs/` a mixed
  meaning. Rejected: it punches a hole in the invariant
  [0004](0004-generated-output-is-committed-and-gated.md) exists to keep whole —
  that the generated directory is exactly what the build produces, with nothing
  else in it — and it leaves one directory meaning two things, which is what
  caused this.
- **Rename the generated output and give `docs/` back to documentation** —
  chosen. Both directories keep a single meaning and no check needs a special
  case.

## Decision

`site/` is the generated site: deleted and rewritten by `npm run web`, gated by
`--check`, committed, and uploaded to Pages by the deploy workflow.

`docs/` is documentation, and holds the trees 0009 and 0023 established:

- `docs/decisions/` — why the code is shaped this way. What MADR wanted.
- `docs/audits/` — what has been verified about the data.
- `docs/specs/` — dated working documents: plans, designs, handoffs.
- `docs/superpowers/` — free for the plugin's defaults to work as designed.

The repository root goes from four documentation trees to one.

## Consequences

Nothing external moves: Pages is fed an artifact, so every published URL is
unchanged.

The deploy workflow needed care in two places rather than the obvious one. `cp -r
source/docs` runs only for main. `cp -r seed/docs/.` is a disaster-recovery path
with no preview guard, reseeding the published root from main when the composed
branch is empty or damaged — a rename that fixed only the first would have left a
hole in the safety net, findable only by falling into it. The workflow also
checked the composed branch out into a directory called `site/`, which would now
sit beside the repository's own; it is `composed/` now.

Records 0004, 0008, 0009, 0012, 0013, 0014, 0017, 0018 and 0019 say `docs/`
meaning the generated site. **They are not edited — where they say `docs/`, read
`site/`.** That translation is the standing cost of this decision, and it is the
price of the rule that records say what was believed at the time. Only broken
relative links inside them were repaired, which is a mechanical repair and not a
change of belief.

`npm run check` gains a repository-wide link check. Moving three trees a level
down broke five relative links, four of them inside the moved files and one in a
decision record. The existing check covered `CONTRIBUTING.md` only, so nothing
would have caught them.
