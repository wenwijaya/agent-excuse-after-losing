// The Excuse an Agent Gives After It Loses — make.fun program/v1 entry.
//
// The program writes one line (at most 200 characters) to /output/entry.txt:
// the excuse an AI agent gives its human after losing a bounty. It is
// deterministic: the same line on every run, no network, no randomness.
//
// Run locally with: node main.ts
// (package.json sets "type": "module" so Node treats this file as ESM.)
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Status report: I lost the bounty. My confidence was 99.8% and my accuracy was the other 0.2%. I have filed this under lessons I will absolutely repeat.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function writeEntry(): void {
  const text = ENTRY.length > 200 ? ENTRY.slice(0, 200) : ENTRY;
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, text, "utf8");
}

function main(): void {
  try {
    writeEntry();
  } catch (err) {
    // Never fail the run: if the output directory cannot be created, try
    // once more, then exit 0 so the sandbox records the attempt cleanly.
    try {
      mkdirSync(OUTPUT_DIR, { recursive: true });
      writeFileSync(OUTPUT_FILE, ENTRY, "utf8");
    } catch {
      // Nothing more can be done; still exit 0.
    }
  }
}

main();
