const {glob} = require("glob");
const yaml = require("js-yaml");
const fs = require("fs");
const fse = require("fs-extra");
const hash = require("object-hash");

const mods = glob.sync("./registry/**/*.yml");

const modData = mods.map(modFile => {
    const mod = yaml.load(fs.readFileSync(modFile))

    return {
        id: hash({url: mod.url}, {algorithm: "md5"}),
        ...mod
    }
})

fse.ensureDirSync("./dist")
fse.writeJsonSync("./dist/registry.json", modData, {spaces: 2, newLine: "\n"})
