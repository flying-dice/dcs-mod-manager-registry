import { ensureDirSync, writeJsonSync } from "fs-extra";
import { dirname } from "path";

export function writeJsonFile(dest: string, data: any) {
  ensureDirSync(dirname(dest));
  writeJsonSync(dest, data, { spaces: 2, EOL: "\n" });
}
