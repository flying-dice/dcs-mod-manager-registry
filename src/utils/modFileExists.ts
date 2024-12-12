import { existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "../config";

export function modFileExists(mod: string, file: string): boolean {
    return existsSync(join(config.registryPath, mod, file));
}
