import { OpenApiBuilder } from "openapi3-ts/oas30";

export const openApiBuilder = new OpenApiBuilder({
    openapi: "3.0.3",
    info: {
        title: "DCS Dropzone Registry",
        description: "DCS Dropzone Registry API",
        version: "1.0.0",
    },
    paths: {
        "/index.json": {
            get: {
                summary: "Get Registry Index",
                operationId: "getRegistryIndex",
                tags: ["mods"],
                responses: {
                    "200": {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/RegistryIndex",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/{id}/index.json": {
            get: {
                summary: "Get Registry Entry",
                operationId: "getRegistryEntry",
                tags: ["mods"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Entry ID",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EntryIndex",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/{id}/latest.json": {
            get: {
                summary: "Get Registry Entry Latest Release",
                operationId: "getRegistryEntryLatestRelease",
                tags: ["mods"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Entry ID",
                        required: true,
                        schema: {
                            type: "string",
                        },
                    },
                ],
                responses: {
                    "200": {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/EntryLatestRelease",
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            RegistryIndex: {
                type: "object",
                description: "TO BE REPLACED BY ZOD SCHEMAS AT BUILD",
            },
            EntryIndex: {
                type: "object",
                description: "TO BE REPLACED BY ZOD SCHEMAS AT BUILD",
            },
            EntryLatestRelease: {
                type: "object",
                description: "TO BE REPLACED BY ZOD SCHEMAS AT BUILD",
            },
        },
    },
});
