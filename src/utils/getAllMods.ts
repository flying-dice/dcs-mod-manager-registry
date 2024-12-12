import { readdirSync } from "node:fs";
import { config } from "../config";
import { modFileExists } from "./modFileExists";

export function getAllMods(): string[] {
    const mods: string[] = [];

    for (const folder of readdirSync(config.registryPath, {
        withFileTypes: true,
    })) {
        if (folder.isDirectory()) {
            if (!modFileExists(folder.name, config.configName)) {
                throw new Error(`Mod ${folder.name} is missing index file at ${config.configName}`);
            }

            if (!modFileExists(folder.name, config.contentName)) {
                throw new Error(
                    `Mod ${folder.name} is missing content file at ${config.contentName}`,
                );
            }

            if (!config.imageNames.some((name) => modFileExists(folder.name, name))) {
                throw new Error(`Mod ${folder.name} is missing an index image`);
            }

            if (config.imageNames.filter((name) => modFileExists(folder.name, name)).length > 1) {
                throw new Error(
                    `Mod ${folder.name} has more than one index image, only one is allowed`,
                );
            }

            mods.push(folder.name);
        }
    }

    return mods;
}
