import { IndexData, indexDataSchema } from "./IndexData";
import { getAllMods } from "./utils/getAllMods";
import { read } from "gray-matter";
import { join } from "node:path";
import { config } from "./config";
import { releaseDataSchema } from "./ReleaseData";
import { modFileExists } from "./utils/modFileExists";
import { IndexDto, indexDtoSchema } from "./IndexDto";
import { releaseDtoSchema } from "./ReleaseDto";
import {
  RegistryIndexItemDto,
  registryIndexItemDtoSchema,
} from "./RegistryIndexItemDto";
import { copyAsset } from "./utils/copyAsset";
import { writeJsonFile } from "./utils/writeJsonFile";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { openApiBuilder } from "./openapi";

/**
 * Builds the mod data and updates the registry index by reading the index and release files
 * for the mod and creating the index DTO and release DTO for the mod.
 *
 * The index DTO is added to the registry index and the image file is copied to the distribution
 * directory along with the index and release DTOs being written to JSON files in the distribution directory.
 *
 * @param {string} mod - The name of the mod to build.
 * @param {IndexData[]} registryIndex - The registry index array to update.
 * @throws Will throw an error if the mod is missing an index image.
 */
function buildMod(mod: string, registryIndex: RegistryIndexItemDto[]) {
  // Read and parse the index file for the mod
  const index = read(join(config.registryPath, mod, config.indexFileName));
  const indexData = indexDataSchema.parse(index.data);

  // Read and parse the release file for the mod
  const release = read(join(config.registryPath, mod, config.releaseFileName));
  const releaseData = releaseDataSchema.parse(release.data);

  // Find the image file for the mod
  const image = config.releaseImageNames.find((name) =>
    modFileExists(mod, name),
  );

  // Throw an error if the image file is not found
  if (!image) {
    throw new Error(`Mod ${mod} is missing an index image`);
  }

  // Create the index DTO (Data Transfer Object) for the mod
  const indexDto: IndexDto = indexDtoSchema.parse({
    id: mod,
    ...indexData,
    imageUrl: `${mod}/${image}`,
    authors: indexData.authors.map((it) =>
      typeof it === "string" ? { name: it } : it,
    ),
    content: Buffer.from(index.content).toString("base64"),
  });

  // Create the release DTO for the mod
  const releaseDto = releaseDtoSchema.parse({
    ...releaseData,
    content: Buffer.from(release.content).toString("base64"),
  });

  // Add the index DTO to the registry index
  const subsetOfIndexDto: RegistryIndexItemDto =
    registryIndexItemDtoSchema.parse(indexDto);
  registryIndex.push(subsetOfIndexDto);

  // Copy the image file to the distribution directory
  copyAsset(
    join(config.registryPath, mod, image),
    join(config.outDir, mod, image),
  );

  // Write the index DTO and release DTO to JSON files in the distribution directory
  writeJsonFile(join(config.outDir, mod, "index.json"), indexDto);
  writeJsonFile(join(config.outDir, mod, "latest.json"), releaseDto);
}

/**
 * Builds the entire registry by iterating over all mods, building each mod, and writing the registry index,
 * OpenAPI schema, and registry schema to JSON files in the distribution directory.
 */
export function build() {
  console.log("Building registry...");
  const registryIndex: RegistryIndexItemDto[] = [];

  // Iterate over all mods and build each mod
  for (const mod of getAllMods()) {
    console.log(`Building mod: ${mod}`);
    buildMod(mod, registryIndex);
  }

  // Write the registry index to a JSON file in the distribution directory
  writeJsonFile(join(config.outDir, "index.json"), registryIndex);

  // Write the OpenAPI schema to a JSON file in the distribution directory
  writeJsonFile(join(config.outDir, "schema.json"), openApiBuilder.getSpec());

  // Write the registry schema to a JSON file in the distribution directory
  writeJsonFile(
    join(config.outDir, "registry.schema.json"),
    zodToJsonSchema(
      z
        .object({
          index: indexDataSchema.describe(
            "The index data of the mod as represented in the front-matter of the index.md file",
          ),
          release: releaseDataSchema.describe(
            "The release data of the mod as represented in the front-matter of the latest.md file",
          ),
        })
        .describe("A Mod Entry in the registry"),
      {
        definitions: {
          index: indexDataSchema,
          release: releaseDataSchema,
        },
      },
    ),
  );
}

build();
