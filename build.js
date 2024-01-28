const fs = require("fs");
const fse = require("fs-extra");
const { join, dirname } = require("path");
const { read } = require("gray-matter");
const { z } = require("zod");
const { OpenApiBuilder } = require("openapi3-ts/oas30");
const { generateSchema } = require("@anatine/zod-openapi");
const debug = require("debug")("build");
const baseSchema = require("./schema.json");
const { mapValues, keyBy } = require("lodash");
const _ = require("lodash");


/**
 * Represents a list of mandatory files, these must be present in every mod folder, otherwise the build will fail
 * If a file is an array, then one of the files must be present
 */
const mandatoryFiles = ["index.md", "latest.md", ["index.jpg", "index.png"]];

const githubIntegrationSchema = z.object({
  admins: z
    .array(z.string())
    .describe(
      "Integration admins, these are the users that can generate tokens to trigger the integration",
    ),
  type: z.literal("github").describe("The type of the integration"),
  owner: z.string().describe("The owner of the repository"),
  repo: z.string().describe("The repository name"),
});

/**
 * Schema for the mod index data at the front-matter of the index.md file
 */
const indexDataSchema = z.object({
  name: z.string().describe("The name of the mod"),
  description: z
    .string()
    .describe("A short description of the mod to be displayed in the mod tile"),
  homepage: z.string().url().describe("The homepage of the mod"),
  authors: z
    .array(
      z.union([
        z.string(),
        z.object({
          name: z.string(),
          avatar: z.string(),
          url: z.string(),
        }),
      ]),
    )
    .describe(
      "The authors of the mod either as a string or an object with name, avatar and url",
    ),
  tags: z
    .array(z.string())
    .describe(
      "The tags of the mod, these are used to filter mods in the mod browser",
    ),
  category: z
    .string()
    .describe(
      "The category of the mod, this is used to group mods in the mod browser",
    ),
  license: z.string().describe("The license of the mod"),
  integration: z
    .union([githubIntegrationSchema])
    .optional()
    .describe(
      "The integration of the mod, this is used to automatically update the mod",
    ),
});

/**
 * Represents the schema for release data at the front-matter of the latest.md file
 */
const releaseDataSchema = z.object({
  releasepage: z.string().url().describe("The release page of the release"),
  name: z.string().describe("The name of the release"),
  version: z.string().describe("The version of the release"),
  tag: z.string().describe("The tag of the release"),
  date: z.coerce.date().describe("The date of the release"),
  assets: z.array(z.object({
    source: z.string().describe("The name of the file # seperates download path and internal zip path"),
    target: z.string().describe("The name of the installation location relative to install path")
  })).describe("The array of files to install"),
});

const indexDtoSchema = indexDataSchema.extend({
  id: z.string(),
  imageUrl: z.string(),
  content: z.string(),
  authors: z.array(
    z.object({
      name: z.string(),
      avatar: z.string().optional(),
      url: z.string().optional(),
    }),
  ),
});
const releaseDtoSchema = releaseDataSchema.extend({ content: z.string() });
const registryIndexItemDtoSchema = indexDtoSchema.omit({
  homepage: true,
  license: true,
  content: true,
});

// ------------------------------------------------------------------------------------------ //

// Get all mod folders in the registry folder
const mods = fs
  .readdirSync(join(__dirname, "registry"), { withFileTypes: true })
  .filter((it) => {
    debug("Found", it.name);
    // check if it is a directory
    if (!it.isDirectory()) {
      debug("Skipping %s because it is not a directory", it.name);
      return false;
    }

    debug("Checking mandatory files for %s", it.name);
    // Check if all mandatory files are present
    return mandatoryFiles.every((file) => {
      if (Array.isArray(file)) {
        return file.some((option) =>
          fs.existsSync(join(__dirname, "registry", it.name, option)),
        );
      } else {
        return fs.existsSync(join(__dirname, "registry", it.name, file));
      }
    });
  });

const writeJsonFile = (dest, data) => {
  fse.ensureDirSync(dirname(dest));
  fse.writeJsonSync(dest, data, { spaces: 2, newLine: "\n" });
};

const copyAsset = (src, dest) => {
  fse.ensureDirSync(dirname(dest));
  fse.copySync(src, dest);
};

const indexJson = [];

debug(
  "Building mods %O",
  mods.map((it) => it.name),
);
// Loop through all mods
mods.forEach((modFolder) => {
  debug("Building mod %s", modFolder.name);

  debug("Reading index.md for %s", modFolder.name);
  const index = read(`./registry/${modFolder.name}/index.md`);
  debug("Parsing index.md for %s", modFolder.name);
  const indexData = indexDataSchema.parse(index.data);

  debug("Reading latest.md for %s", modFolder.name);
  const latest = read(`./registry/${modFolder.name}/latest.md`);
  debug("Parsing latest.md for %s", modFolder.name);
  const latestData = releaseDataSchema.parse(latest.data);

  // Copy image file to dist
  const imageFile = ["index.jpg", "index.png"].find((it) =>
    fs.existsSync(join(__dirname, "registry", modFolder.name, it)),
  );
  if (!imageFile) {
    throw new Error(`No image file found for ${modFolder.name}`);
  }

  // Generate index.json file content and parse it with the schema ensuring it is valid and extraneous data is removed
  const indexDto = indexDtoSchema.parse({
    id: modFolder.name,
    ...indexData,
    imageUrl: `${modFolder.name}/${imageFile}`,
    authors: indexData.authors.map((it) =>
      typeof it === "string" ? { name: it } : it,
    ),
    content: Buffer.from(index.content).toString("base64"),
  });

  // Generate latest.json file content and parse it with the schema ensuring it is valid and extraneous data is removed
  const latestDto = releaseDtoSchema.parse({
    ...latestData,
    content: Buffer.from(latest.content).toString("base64"),
  });

  // Add mod to index.json and parse it with the schema ensuring it is valid and extraneous data is removed
  indexJson.push(registryIndexItemDtoSchema.parse(indexDto));

  // Copy image file to dist
  copyAsset(
    join(__dirname, "registry", modFolder.name, imageFile),
    join(__dirname, "dist", modFolder.name, imageFile),
  );

  // Write JSON files to registry for mod
  writeJsonFile(
    join(__dirname, "dist", modFolder.name, "index.json"),
    indexDto,
  );
  writeJsonFile(
    join(__dirname, "dist", modFolder.name, "latest.json"),
    latestDto,
  );
});

writeJsonFile(join(__dirname, "dist", "index.json"), indexJson);
writeJsonFile(
  join(__dirname, "functions", "integrations", "integrations.json"),
  _(indexJson)
    .keyBy("id")
    .mapValues((it) => it.integration)
    .value(),
);

const spec = new OpenApiBuilder(baseSchema);

spec.addSchema(
  "RegistryIndex",
  generateSchema(z.array(registryIndexItemDtoSchema)),
);
spec.addSchema("EntryIndex", generateSchema(indexDtoSchema));
spec.addSchema("EntryLatestRelease", generateSchema(releaseDtoSchema));

writeJsonFile(join(__dirname, "dist", "schema.json"), spec.getSpec());
