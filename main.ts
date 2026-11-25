// One Line, No Deadline Met — make.fun entry.
// Writes a single-line joke excusing a missed deadline to /output/entry.txt
// (or to the path given as argv[2], file or directory).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I didn't miss the deadline — the deadline missed me, it was hiding in my spam folder.";

function resolveTarget(argv2: string | undefined): string {
  if (!argv2) return "/output/entry.txt";
  if (argv2.endsWith(".txt")) return argv2;
  // A directory path (with or without a trailing slash) gets entry.txt inside.
  const clean = argv2.endsWith("/") ? argv2.slice(0, -1) : argv2;
  return join(clean, "entry.txt");
}

// The gate wants 1-200 characters of UTF-8 text, a single line, not only
// whitespace — refuse to write anything that would fail it.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  const target = resolveTarget(process.argv[2]);
  const dir = target.slice(0, target.lastIndexOf("/")) || ".";
  mkdirSync(dir, { recursive: true });
  writeFileSync(target, ENTRY, "utf8");
  console.log(`wrote ${target} (${ENTRY.length} characters)`);
}

main();
