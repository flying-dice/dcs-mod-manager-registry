import { join } from "node:path";

export type Config = {
    registryPath: string;
    contentName: string;
    outDir: string;
    configName: string;
    imageNames: string[];
};

export const config: Config = {
    registryPath: join(__dirname, "../registry"),
    outDir: join(__dirname, "../dist"),
    contentName: "index.md",
    configName: "index.yaml",
    imageNames: ["index.png", "index.jpg"],
};
