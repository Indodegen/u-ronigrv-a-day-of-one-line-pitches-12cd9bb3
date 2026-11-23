import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entryPath = join(here, "entry.txt");
const text = readFileSync(entryPath, "utf8");
if (text.trim().length === 0) {
  throw new Error("entry.txt must not be empty or whitespace only");
}
const length = [...text.trim()].length;
if (length < 1 || length > 240) {
  throw new Error(`entry.txt must be 1-240 characters, got ${length}`);
}
if (/\n/.test(text.trim())) {
  throw new Error("entry.txt must be a single line");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(outDir, { recursive: true });
copyFileSync(entryPath, join(outDir, "entry.txt"));
