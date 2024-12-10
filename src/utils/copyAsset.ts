import { dirname } from "path";
import { copySync, ensureDirSync } from "fs-extra";

export function copyAsset(src: string, dest: string) {
  ensureDirSync(dirname(dest));
  copySync(src, dest);
}
