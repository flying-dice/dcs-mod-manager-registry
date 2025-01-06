import { z } from "zod";

export const releaseDataSchema = z.object({
    releasepage: z.coerce.string().url().describe("The release page of the release"),
    name: z.coerce.string().describe("The name of the release"),
    version: z.coerce.string().describe("The version of the release"),
    date: z.coerce.date().describe("The date of the release"),
    exePath: z.coerce.string().describe("Executable file specifically Tools").optional(),
    assets: z
        .array(
            z.object({
                remoteSource: z.coerce.string().describe("The URL of the file to download"),
                links: z.array(
                    z.object({
                source: z.coerce
                    .string()
                    .describe(
                        "The name of the file # separates download path and internal zip path",
                    ),
                target: z.coerce
                    .string()
                    .describe("The name of the installation location relative to install path")
                    .refine((it) => !it.includes("\\"), {
                        message:
                            "The target path cannot contain backslashes, use unix style paths i.e. '/'",
                    }),
                runonstart: z.coerce
                    .boolean()
                    .optional()
                    .describe(
                        "Run on simulation (mission) start, note that this will execute the script before the mission environment is sanitized",
                    ),
                }),
            ),
            }),
        )
        .describe("The array of files to install"),
});

export type ReleaseData = z.infer<typeof releaseDataSchema>;
