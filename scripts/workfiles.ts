// Learners see this repo. Notes written while building it never ship: this fails a PR that still has one.
import { readdirSync } from "node:fs";

const WORK = /PICKS|CANDIDATES|REVIEW|NOTES|PLAN|BRIEF|PACKET|TODO/i;

export function workFiles(root: string): string[] {
  return readdirSync(root).filter((name) => name.endsWith(".md") && WORK.test(name) && !/^README/i.test(name));
}

if (import.meta.main) {
  const found = workFiles(process.argv[2] ?? ".");
  for (const name of found) console.error(`${name}: a build note at the root; delete it before the PR`);
  process.exit(found.length === 0 ? 0 : 1);
}
