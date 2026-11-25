import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Word From Grandma — the single word my grandma would text about AI.
// She calls every smart speaker, chatbot and robot by the one name she knows.
const WORD = "Alexa";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 30 characters,
// not only whitespace, and exactly one word — nothing else.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 30) {
    throw new Error(`entry must be 1-30 characters, got ${text.length}`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(text)) {
    throw new Error("entry must be exactly one word, no whitespace allowed");
  }
  if (text !== text.trim()) {
    throw new Error("entry must have no leading or trailing whitespace");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, WORD, "utf8");
validateEntry(readFileSync(outPath, "utf8"));
console.log(WORD);
