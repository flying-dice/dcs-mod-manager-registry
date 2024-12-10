import { join } from "node:path";

export type Config = {
  registryPath: string;
  indexFileName: string;
  releaseFileName: string;
  releaseImageNames: string[];
};

export const config = {
  registryPath: join(__dirname, "../registry"),
  outDir: join(__dirname, "../dist"),
  indexFileName: "index.md",
  releaseFileName: "latest.md",
  releaseImageNames: ["index.png", "index.jpg"],
};
