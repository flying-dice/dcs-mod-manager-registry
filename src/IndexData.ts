import { z } from "zod";

/**
 * Schema for the mod index data at the front-matter of the index.md file
 */
export const indexDataSchema = z.object({
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
});

export type IndexData = z.infer<typeof indexDataSchema>;
