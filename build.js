const {glob} = require("glob");
const yaml = require("js-yaml");
const fs = require("fs");
const fse = require("fs-extra");

const mods = glob.sync("./registry/**/*.yml");

const modData = mods.map(mod => yaml.load(fs.readFileSync(mod)))

fse.ensureDirSync("./dist")
fse.writeJsonSync("./dist/registry.json", modData, {spaces: 2, newLine: "\n"})
