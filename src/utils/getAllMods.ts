import { readdirSync } from "node:fs";
import { config } from "../config";
import { modFileExists } from "./modFileExists";

export function getAllMods(): string[] {
  const mods: string[] = [];

  for (const folder of readdirSync(config.registryPath, {
    withFileTypes: true,
  })) {
    if (folder.isDirectory()) {
      if (!modFileExists(folder.name, config.indexFileName)) {
        throw new Error(
          `Mod ${folder.name} is index file at ${config.indexFileName}`,
        );
      }

      if (!modFileExists(folder.name, config.releaseFileName)) {
        throw new Error(
          `Mod ${folder.name} is missing release file at ${config.releaseFileName}`,
        );
      }

      if (
        !config.releaseImageNames.some((name) =>
          modFileExists(folder.name, name),
        )
      ) {
        throw new Error(`Mod ${folder.name} is missing an index image`);
      }

      if (
        config.releaseImageNames.filter((name) =>
          modFileExists(folder.name, name),
        ).length > 1
      ) {
        throw new Error(
          `Mod ${folder.name} has more than one index image, only one is allowed`,
        );
      }

      mods.push(folder.name);
    }
  }

  return mods;
}
