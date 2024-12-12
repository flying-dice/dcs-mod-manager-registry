import { indexDtoSchema } from "./IndexDto";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { openApiBuilder } from "./openapi";

export const registryIndexItemDtoSchema = indexDtoSchema.omit({
    homepage: true,
    license: true,
    content: true,
    versions: true,
});

openApiBuilder.addSchema(
    "RegistryIndex",
    zodToJsonSchema(z.array(registryIndexItemDtoSchema), { target: "openApi3" }),
);

export type RegistryIndexItemDto = z.infer<typeof registryIndexItemDtoSchema>;
