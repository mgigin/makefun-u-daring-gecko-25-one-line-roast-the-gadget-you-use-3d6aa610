// Entry program for make.fun bounty
// u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610
// ("One-Line Roast: The Gadget You Use Every Day").
//
// The program writes one original roast line, at most 200 characters,
// roasting a gadget used every day, to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt when set). It runs twice in the
// sandbox and must write the same bytes both times, which a fixed
// string guarantees. The line is validated here first: non-empty,
// at most 200 characters, and a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const ROAST =
  "My printer only works when nothing is urgent; the moment a deadline appears, it comes down with a paper jam out of respect.";

// An empty MAKEFUN_OUTPUT_DIR counts as unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.txt");

const chars = [...ROAST];
if (chars.length === 0 || chars.length > MAX_CHARS) {
  console.error(
    `entry check failed: roast is ${chars.length} chars, must be 1..${MAX_CHARS}`,
  );
  process.exit(1);
}
if (ROAST.includes("\n") || ROAST.trim() !== ROAST) {
  console.error("entry check failed: roast must be a single trimmed line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, ROAST, "utf8");

// Read the file back and compare it with the roast, so a truncated or
// corrupted write fails loudly instead of shipping a broken entry.
const written = readFileSync(target, "utf8");
if (written !== ROAST) {
  console.error("entry check failed: entry.txt does not match the roast");
  process.exit(1);
}

console.log(`wrote ${target} (${chars.length} chars)`);
console.log("GATE_OK");
