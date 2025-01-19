import { z } from "zod";
import { releaseDataSchema } from "./ReleaseData";

/**
 * Schema for the mod index data at the front-matter of the index.md file
 */
export const indexDataSchema = z.object({
    homepage: z.coerce.string().url().describe("The homepage of the mod"),
    name: z.coerce.string().describe("The name of the mod"),
    description: z.coerce
        .string()
        .describe("A short description of the mod to be displayed in the mod tile"),
    authors: z
        .array(
            z.union([
                z.coerce.string(),
                z.object({
                    name: z.coerce.string(),
                    avatar: z.coerce.string(),
                    url: z.coerce.string(),
                }),
            ]),
        )
        .describe(
            "The authors of the mod either as a string or an object with name, avatar and url",
        ),
    tags: z
        .array(z.coerce.string())
        .describe("The tags of the mod, these are used to filter mods in the mod browser"),
    category: z.coerce
        .string()
        .describe("The category of the mod, this is used to group mods in the mod browser"),
    license: z.coerce.string().describe("The license of the mod"),
    latest: z.coerce
        .string()
        .describe("The latest version of the mod to be pushed to the subscribers"),
    dependencies:
        z.array(z.coerce.string().regex(
            /^[a-z0-9-]+$/,
            "The Mod dependency id must be a url safe path specifically kebab case formatted",
        )).optional().describe("The dependencies of the mod"),
    versions: z.array(releaseDataSchema).describe("The versions of the mod"),
});

export type IndexData = z.infer<typeof indexDataSchema>;
