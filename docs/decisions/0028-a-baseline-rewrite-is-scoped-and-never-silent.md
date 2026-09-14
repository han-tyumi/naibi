# 0028. A baseline rewrite is scoped and never silent

- **Status:** Accepted
- **Date:** 2026-09-14

## Context

[0027](0027-the-prevalence-gate-fires-on-frozen-claim-hashes.md) froze every
prevalence claim in the corpus as a hash and made `npm run validate` fail on a
flagged sentence that is not in that file. It also settled that
`npm run prevalence -- --baseline` regenerates the file "always over the whole
corpus and always in v2", and the reason was sound: a baseline *scanned* from a
subset leaves every entry it omitted with no record at all, which the gate's
third failure mode exists to catch.

What that missed is who has to run it, and when. An entry arriving in the corpus
has no baseline record, so the gate refuses it — correctly — with
`run \`npm run prevalence -- --baseline\``. Adding a game therefore *requires* a
whole-corpus rewrite, and a whole-corpus rewrite blesses every unbaselined claim
anywhere in the corpus as a side effect.

Measured on 2026-09-14, on a working copy with one new entry and one claim
planted in `war.json`:

- before the rewrite, the gate quoted the planted claim in full and failed;
- after the rewrite the new entry forced, `war.json` was clean and the run had
  printed one line — `Baseline written: 335 flagged sentences across 81 entries`
  — naming nothing it had added;
- the next `npm run validate` reported `none added and none gone`, which was
  true of the file it had just been handed and false of the corpus.

So the ratchet 0027 built could be loosened by an unrelated, mandatory, routine
action, and nothing in the output said so. The claim count had gone 330 → 335
and the only number printed was the total.

## Considered options

- **Leave it, and rely on the diff** — rejected. The baseline is 9.6 KB of
  16-hex hashes; a reviewer reading `+ "3f2a1b..."` in it has no way to tell a
  new entry's claims from somebody else's, which is the whole question. The one
  moment the sentence is available in plain text is the moment the tool writes
  the hash, and that is where it has to be said.
- **Refuse to add claims unless a flag says so** — rejected as the primary
  mechanism, though close. Adding a game legitimately adds claims, so the flag
  would be passed every time it is a nuisance and therefore every time it
  matters; a confirmation everybody types is not a control.
- **Scan only the named entry** — rejected, for 0027's original reason: the file
  would then name one entry, every other entry would have no record, and the
  gate's third failure mode would fire for all eighty of them. `--game` must not
  narrow what is *read*.
- **Scope which records are rewritten, and quote every claim added** — taken.

## Decision

`npm run prevalence -- --baseline` still scans the whole corpus in v2, and now
reports what it changed: every added hash is printed with the sentence it stands
for, every dropped hash with the entry it left. A run that changes nothing says
so. The unscoped form additionally names its own blast radius and points at the
scoped one.

`npm run prevalence -- --baseline --game <id>` rewrites that entry's records and
carries every other entry's forward untouched. `--game` scopes the *write*, not
the scan, so no entry is ever left without a record. Scoping does not cost the
ratchet on the entry named: its records are taken whole from the fresh scan, so
a hash that has left that entry still goes.

The merge, the diff, the report and the argument scoping are pure functions —
`mergeBaseline`, `baselineChange`, `changeReport`, `scopeFrom` — so each is
tested directly. `mergeBaseline` is exercised against a planted claim in the
real corpus; the other three are tested on fabricated records, which is what
they take.

Three things the first cut of this got wrong, found by review before it merged
and fixed here:

- `baselineChange` diffed hash **sets** while the gate counts a **multiset**, so
  a sentence repeated into a second field — which `claimHash` deliberately makes
  hash alike — was blessed under the line `No change`. It now diffs multisets.
- A baseline that would not **parse** was treated as a baseline that was
  **absent**, so a conflict marker in the file — the ordinary case, now that two
  branches can both touch it — would have made a scoped rewrite discard every
  other entry's records while printing `leaving the rest frozen`. `parseBaseline`
  now refuses rather than falling back.
- `--game` with its value missing resolved to `undefined`, which is exactly what
  "rewrite every entry" looks like, so a typo asked for the scoped form and got
  the blast radius. `scopeFrom` refuses it.

## Consequences

**Adding a game no longer touches anyone else's claims.** The routine path is
`--baseline --game <id>`, and it is the one CONTRIBUTING now gives — and the one
the gate's own failure text names, quoting the entry it is complaining about.
That text used to name the unscoped form, which meant the single message a
contributor actually reads sent them to the command this record exists to keep
them away from.

**The whole-corpus form stays, and stays useful** — after a sweep that reflows
many entries, rewriting one at a time would be worse. It is no longer quiet
about what it does, which is the part that was wrong.

**A wording pass that reflows a marker sentence in ten entries now costs ten
scoped runs or one loud unscoped one.** That is a real cost, and the unscoped
form exists for exactly that case; the output makes the trade visible rather
than removing it.

**The gate's own summary line is still computed against the file on disk**, so
immediately after a rewrite it reads `none added and none gone` whatever
happened. That line answers "does the corpus match its baseline", which is a
different question from "what did the last rewrite bless" — the second is now
answered where the rewrite happens, and this record is the reason not to read
the first as an answer to it.
