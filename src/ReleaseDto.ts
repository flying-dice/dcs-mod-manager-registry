import { z } from "zod";
import { releaseDataSchema } from "./ReleaseData";
import { zodToJsonSchema } from "zod-to-json-schema";
import { openApiBuilder } from "./openapi";

export const releaseDtoSchema = releaseDataSchema.extend({
    content: z.string(),
});

openApiBuilder.addSchema(
    "EntryLatestRelease",
    zodToJsonSchema(releaseDtoSchema, { target: "openApi3" }),
);

export type ReleaseDto = z.infer<typeof releaseDtoSchema>;
