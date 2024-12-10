import { z } from "zod";
import { indexDataSchema } from "./IndexData";
import { zodToJsonSchema } from "zod-to-json-schema";
import { openApiBuilder } from "./openapi";

export const indexDtoSchema = indexDataSchema.extend({
  id: z
    .string()
    .regex(
      /^[a-z0-9-]+$/,
      "The Mod id must be a url safe path specifically kebab case formatted",
    ),
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

openApiBuilder.addSchema(
  "EntryIndex",
  zodToJsonSchema(indexDtoSchema, { target: "openApi3" }),
);

export type IndexDto = z.infer<typeof indexDtoSchema>;
