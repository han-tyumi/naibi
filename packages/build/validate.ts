/**
 * Validate every game entry in games/ against schema/game.schema.json.
 *
 * Runs the JSON Schema check plus the cross-file and cross-field rules a schema
 * cannot express, which live in checks.ts. Exits non-zero if anything fails, so
 * it works as a CI gate.
 *
 *   npm run validate              # validate everything
 *   npm run validate -- --quiet   # only print problems
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

import { Ajv2020 } from "ajv/dist/2020.js";
import type { ErrorObject, ValidateFunction } from "ajv";

import type { CardGame } from "naibi";
import {
  GAMES_DIR,
  SCHEMA_PATH,
  PROSE_FIELDS,
  gameFiles,
  loadSharedFigures,
  nestedProseFingerprint,
  proseFingerprint,
} from "naibi";
import type { Entry, NamedEntry } from "./checks.ts";
import { checkEntry, crossFileProblems, sharedAliases, unreadProse } from "./checks.ts";
import { sourcesRead } from "./originality.ts";

const SOURCES_DIR = fileURLToPath(new URL("../../.sources", import.meta.url));

/**
 * Source files on disk that no attributed name can be matched to.
 *
 * This is the `--stamp` guard, moved to where it can fire in time. It caught the
 * same mistake in six consecutive sittings and always at the end of one: you
 * fetch the sources, read them for an hour, and only when you go to stamp does
 * the tool tell you the entry never named the source you read. `npm run validate`
 * runs a dozen times in between.
 *
 * Two ways to trip it, both real. An entry simply does not attribute a source
 * that was read. Or the filename does not slug to the attributed name -- both
 * sides are reduced to letters and digits, so `GameRules.com` becomes
 * `gamerulescom` and the obvious `gamerules.txt` becomes `gamerules`, and the two
 * do not match. Note the second is not hypothetical: `mau-mau` attributes the
 * same site as `Game Rules`, which does need `gamerules.txt`.
 *
 * Reported rather than failed, and never a CI concern: `.sources/` is gitignored
 * and absent everywhere but a sitting in progress, so a rule that failed on it
 * would be a rule nobody could see fail.
 */
function straySources(id: string, attributed: readonly string[]): string[] {
  const dir = join(SOURCES_DIR, id);
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((name) => name.endsWith(".txt"));
  return sourcesRead(attributed, files).stray;
}

function describe(error: ErrorObject): string {
  const location = error.instancePath.replace(/^\//, "");
  return `${location || "(root)"}: ${error.message ?? "is invalid"}`;
}

function schemaProblems(data: Entry, validate: ValidateFunction): string[] {
  if (validate(data)) return [];
  return (validate.errors ?? []).map(describe);
}

function main(): number {
  const quiet = process.argv.includes("--quiet");

  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8")) as object;
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const paths = gameFiles();
  if (paths.length === 0) {
    console.error(`No game files found in ${GAMES_DIR}`);
    return 1;
  }

  const shared = new Set(Object.keys(loadSharedFigures()));

  // Entries are collected before anything is reported, because the duplicate
  // and alias rules need every name before they can run.
  const parsed: NamedEntry[] = [];
  const results: { file: string; problems: string[] }[] = [];

  for (const path of paths) {
    const file = basename(path);
    let data: Entry;
    try {
      data = JSON.parse(readFileSync(path, "utf8")) as Entry;
    } catch (error) {
      results.push({ file, problems: [`not valid JSON: ${(error as Error).message}`] });
      continue;
    }

    parsed.push({ file, data });
    // Computed from the entry as it stands now, so a stale `checked` record
    // reports itself rather than sitting there claiming cover it has lost.
    const fingerprint =
      typeof data["setup"] === "string" ? proseFingerprint(data as unknown as CardGame) : null;
    const nested = nestedProseFingerprint(data as unknown as CardGame);
    results.push({
      file,
      problems: [
        ...schemaProblems(data, validate),
        ...checkEntry(file, data, shared, fingerprint, nested),
      ],
    });
  }

  const byFile = new Map(results.map((r) => [r.file, r]));
  crossFileProblems(parsed).forEach((problems, index) => {
    byFile.get(parsed[index]!.file)?.problems.push(...problems);
  });

  let failures = 0;
  for (const { file, problems } of results) {
    if (problems.length > 0) {
      failures += 1;
      console.log(`FAIL ${file}`);
      for (const problem of problems) console.log(`  - ${problem}`);
    } else if (!quiet) {
      console.log(`ok   ${file}`);
    }
  }

  console.log(`\n${paths.length - failures}/${paths.length} entries valid.`);

  // The source-name guard, fired here rather than at stamp time. Says which
  // empty it means: no source text on disk at all is the ordinary state and not
  // a clean result, and the two must not read alike.
  const withSources = parsed.filter(({ data }) => existsSync(join(SOURCES_DIR, String(data["id"]))));
  if (withSources.length === 0) {
    console.log("\nNo source text in .sources/, so no source name was checked against one.");
  } else {
    const mismatched = withSources
      .map(({ data }) => ({
        id: String(data["id"]),
        stray: straySources(
          String(data["id"]),
          Array.isArray(data["sources_consulted"]) ? (data["sources_consulted"] as string[]) : [],
        ),
      }))
      .filter((row) => row.stray.length > 0);
    console.log(
      `\n${withSources.length} entr${withSources.length === 1 ? "y has" : "ies have"} source ` +
        `text in .sources/.`,
    );
    for (const { id, stray } of mismatched) {
      console.log(
        `  ${id}: ${stray.map((name) => `"${name}.txt"`).join(", ")} match nothing in ` +
          "sources_consulted. Rename the file to the attributed name (letters and digits " +
          "only, so \"GameRules.com\" needs gamerulescom.txt), or add the source there. " +
          "--stamp will refuse this later.",
      );
    }
    if (mismatched.length === 0) console.log("  Every source file matches an attributed name.");
  }

  // Never let silence read as coverage. An entry with no `checked` record has
  // not been read against a source in its current form, and saying so here is
  // cheaper than someone assuming otherwise.
  const unchecked = parsed.filter(({ data }) => !data["checked"]).length;
  if (unchecked > 0) {
    console.log(
      `${unchecked} entr${unchecked === 1 ? "y has" : "ies have"} no originality check ` +
        `on record (npm run originality).`,
    );
  }
  // The same rule again, on the thing 0025 added. A `reworded` envelope says the
  // prose has moved since the facts were read and that only the wording changed
  // -- a claim no tool can check, so the number of entries making it is reported
  // on every run rather than being discoverable only by grepping the corpus. It
  // says "none" out loud, because a line that vanishes when the count is zero
  // reads as a corpus nobody has amended and as a check nobody ran alike.
  const amended = parsed.filter(({ data }) => {
    const checked = data["checked"];
    return typeof checked === "object" && checked !== null && "reworded" in checked;
  }).length;
  console.log(
    amended === 0
      ? "No entry's wording has been amended since its check."
      : `${amended} entr${amended === 1 ? "y has" : "ies have"} had wording amended since ` +
        `the facts were read (checked.reworded); the dates are in docs/audits/.`,
  );
  // Optional fields are invisible by default: an entry without one looks
  // exactly like an entry that never needed one. Naming the counts is the same
  // rule as the line above -- silence is not coverage -- but the reading is
  // different, so the wording has to be too. `deal` and `figure_refs` are
  // conditional by schema ("omit it where one number covers every case"), so a
  // low count is those rules working and not a backlog. Reported, never failed.
  // Read off the schema rather than listed here, so a field added to the schema
  // starts being counted without anyone remembering to add it.
  const shape = schema as { properties: Record<string, unknown>; required: string[] };
  const optional = Object.keys(shape.properties).filter((key) => !shape.required.includes(key));

  const carried = (field: string) =>
    parsed.filter(({ data }) => {
      const value = data[field];
      return value !== undefined && value !== null && !(Array.isArray(value) && value.length === 0);
    }).length;

  console.log(
    "\nOptional fields, carried by the entries that call for them — " +
      optional.map((field) => `${field} ${carried(field)}/${parsed.length}`).join(", ") +
      ".",
  );

  // The coverage the second fingerprint made countable. Before 0026 this could
  // only be reported as a quantity of prose nobody read; now an entry can say it
  // was read, so the line says how many have and the character count below is
  // scoped to the ones that have not.
  const nestedChecked = parsed.filter(({ data }) => {
    const checked = data["checked"];
    return typeof checked === "object" && checked !== null && "nested" in checked;
  });
  console.log(
    nestedChecked.length === 0
      ? `\nNo entry has had its variant descriptions, captions and table notes compared ` +
        `against a source (checked.nested).`
      : `\n${nestedChecked.length}/${parsed.length} entries have had their variant ` +
        `descriptions, captions and table notes compared against a source (checked.nested).`,
  );

  // The third reading of "silence is not coverage", and the one that took
  // longest to notice. `PROSE_FIELDS` is what the originality checker reads and
  // what `checked.prose` fingerprints -- deliberately the same list, so a stamp
  // can never cover less than the check read. The cost is that everything
  // outside that list is covered by neither: a variant description can copy a
  // source word for word and pass, and a caption can be edited after a stamp
  // without the stamp noticing. Both were demonstrated on 2026-08-12 -- verbatim
  // source sentences planted in a `variants` description came back clean, and
  // two captions went stale from an audit's own corrections without moving a
  // fingerprint. Reported rather than failed, because closing it means widening
  // PROSE_FIELDS, and that invalidates every stamp in the corpus at once.
  // See docs/specs/2026-08-12-the-thirty-percent-outside-the-check.md.
  const proseChars = parsed.reduce(
    (total, { data }) =>
      total + PROSE_FIELDS.reduce((sum, field) => sum + String(data[field] ?? "").length, 0),
    0,
  );
  const nestedChars = parsed.reduce((total, { data }) => total + unreadProse(data), 0);
  const share = Math.round((nestedChars / (proseChars + nestedChars)) * 100);
  const stillUnread = parsed
    .filter(({ data }) => {
      const checked = data["checked"];
      return !(typeof checked === "object" && checked !== null && "nested" in checked);
    })
    .reduce((total, { data }) => total + unreadProse(data), 0);
  console.log(
    `Prose outside PROSE_FIELDS — ${nestedChars.toLocaleString()} characters in ` +
      `variant descriptions, captions and table notes, ${share}% of the corpus's prose. ` +
      `${stillUnread.toLocaleString()} of it is in entries with no checked.nested record, ` +
      `so it is compared against nothing and covered by no stamp.`,
  );

  // Kept rather than forbidden: two games can honestly answer to one name, and
  // dropping either would mean a reader searching the one they know finds
  // nothing. What must hold instead -- that a search returns every claimant and
  // says why each is there -- is asserted in the web tests. This line exists so
  // the number is visible rather than discovered, and it says so when there are
  // none, because a report that can come back empty has to say which empty it
  // means. See docs/decisions/0022.
  const answeredTwice = sharedAliases(parsed);
  const labels = parsed.reduce(
    (sum, { data }) => sum + 1 + (Array.isArray(data["aliases"]) ? data["aliases"].length : 0),
    0,
  );
  console.log(
    answeredTwice.length === 0
      ? `No alias is shared by more than one entry (${labels} names and aliases).`
      : `Aliases more than one entry answers to, kept so both stay findable — ` +
          answeredTwice.map((row) => `"${row.alias}" (${row.files.join(", ")})`).join(", ") +
          `. ${answeredTwice.length} of ${labels} names and aliases.`,
  );
  // The case a reader cannot resolve on the index: same name, same four facts
  // on the card, so nothing on screen tells the two apart. Said out loud rather
  // than failed, because no wording fixes it and two close relatives sharing a
  // name is a fact about card games. Whoever reads this decides whether the
  // pair is one game filed twice.
  const alike = answeredTwice.filter((row) => row.alike);
  if (alike.length > 0) {
    console.log(
      `Of those, ${alike.length} cannot be told apart on the index — ` +
        alike.map((row) => `"${row.alias}" (${row.files.join(", ")})`).join(", ") +
        `. Same players, time, difficulty and family, so only the name differs.`,
    );
  }

  if (failures > 0) {
    console.log(`${failures} file(s) need attention.`);
    return 1;
  }
  return 0;
}

process.exit(main());
