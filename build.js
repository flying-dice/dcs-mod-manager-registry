const fs = require("fs");
const fse = require("fs-extra");
const {join, dirname} = require("path");
const { read } = require("gray-matter")
const { z } = require("zod")
const debug = require("debug")("build")
/**
 * Represents a list of mandatory files, these must be present in every mod folder, otherwise the build will fail
 * If a file is an array, then one of the files must be present
 */
const mandatoryFiles = ["index.md", "latest.md", ["index.jpg", "index.png"]]

/**
 * Schema for the mod index data at the front-matter of the index.md file
 */
const indexDataSchema = z.object({
    name: z.string().describe("The name of the mod"),
    description: z.string().describe("A short description of the mod to be displayed in the mod tile"),
    homepage: z.string().url().describe("The homepage of the mod"),
    authors: z.array(z.union([z.string(), z.object({
        name: z.string(),
        avatar: z.string(),
        url: z.string()
    })])).describe("The authors of the mod either as a string or an object with name, avatar and url"),
    tags: z.array(z.string()).describe("The tags of the mod, these are used to filter mods in the mod browser"),
    category: z.string().describe("The category of the mod, this is used to group mods in the mod browser"),
    license: z.string().describe("The license of the mod")
})

/**
 * Represents the schema for release data at the front-matter of the latest.md file
 */
const releaseDataSchema = z.object({
    name: z.string().describe("The name of the release"),
    version: z.string().describe("The version of the release"),
    date: z.coerce.date().describe("The date of the release")
})


// ------------------------------------------------------------------------------------------ //

// Get all mod folders in the registry folder
const mods = fs.readdirSync(join(__dirname, "registry"), { withFileTypes: true }).filter(it => {
    debug("Found", it.name)
    // check if it is a directory
    if (!it.isDirectory()) {
        debug("Skipping %s because it is not a directory", it.name)
        return false
    }

    debug("Checking mandatory files for %s", it.name)
    // Check if all mandatory files are present
    return mandatoryFiles.every(file => {
        if (Array.isArray(file)) {
            return file.some(option => fs.existsSync(join(__dirname, "registry", it.name, option)))
        } else {
            return fs.existsSync(join(__dirname, "registry", it.name, file))
        }
    })
})

const writeJsonFile = (dest, data) => {
    fse.ensureDirSync(dirname(dest))
    fse.writeJsonSync(dest, data, { spaces: 2, newLine: "\n" })
}

const copyAsset = (src, dest) => {
    fse.ensureDirSync(dirname(dest))
    fse.copySync(src, dest)
}

const indexJson = []

debug("Building mods %O", mods.map(it => it.name))
// Loop through all mods
mods.forEach(modFolder => {
    debug("Building mod %s", modFolder.name)

    const index = read(`./registry/${modFolder.name}/index.md`)

    debug("Parsing index.md for %s", modFolder.name)
    const indexData = indexDataSchema.parse(index.data)
    const latest = read(`./registry/${modFolder.name}/latest.md`)

    debug("Parsing latest.md for %s", modFolder.name)
    const latestData = releaseDataSchema.parse(latest.data)

    // Add mod to index.json
    indexJson.push({
        id: modFolder.name,
        name: indexData.name,
        description: indexData.description,
        authors: indexData.authors,
        tags: indexData.tags,
        category: indexData.category,
    })

    // Copy image file to dist
    const imageFile = ["index.jpg", "index.png"].find(it => fs.existsSync(join(modFolder.path, modFolder.name, it)))
    if (!imageFile) {
        throw new Error(`No image file found for ${modFolder.name}`)
    }

    copyAsset(join(modFolder.path, modFolder.name, imageFile), join(__dirname, "dist", modFolder.name, imageFile))

    // Write JSON files to registry for mod
    writeJsonFile(join(__dirname, "dist", modFolder.name, "index.json"), {id: modFolder.name, ...indexData, imageUrl: `${modFolder.name}/${imageFile}`, content: Buffer.from(index.content).toString("base64")})
    writeJsonFile(join(__dirname, "dist", modFolder.name, "latest.json"), {...latestData, content: Buffer.from(latest.content).toString("base64")})
})

writeJsonFile("./dist/index.json", indexJson)
