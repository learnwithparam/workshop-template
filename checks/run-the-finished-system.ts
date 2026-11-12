import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Rule } from "../scripts/verify";

const outcomeFile = (folder: string) => join(folder, "outcome.md");
export default [
  {
    says: "outcome.md exists",
    test: (folder) => existsSync(outcomeFile(folder)),
    tryNext: "create outcome.md in the problem folder",
  },
  {
    says: "it has a line that starts with Outcome:",
    test: (folder) => /^Outcome: .+/m.test(readFileSync(outcomeFile(folder), "utf8")),
    tryNext: "add a line like: Outcome: the manager sees every late delivery before 9 am",
  },
] satisfies Rule[];
