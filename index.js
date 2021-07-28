#!/usr/bin/env node
const { transform } = require("./transform")

let plantumlSrv = "http://www.plantuml.com/plantuml";
let dir = process.cwd();
for (var i = 0; i < process.argv.length; ++i) {
    if (process.argv[i] === "--url") {
        plantumlSrv = process.argv[i + 1];
        continue
    }
    if (process.argv[i] === "--dir") {
        dir = process.argv[i + 1];
        break;
    }
}
console.log(`Use plantuml server: ${plantumlSrv}, Change it with --url <url>`);
console.log(`Transform files in: ${dir}, Change it with --dir <folder>`);
transform(plantumlSrv, dir);
