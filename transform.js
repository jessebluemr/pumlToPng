const plantumlEncoder = require("plantuml-encoder")
const fglob = require("fast-glob");
const fs = require("fs/promises");
const http = require("http");
const https = require("https");

async function transformAllPumlFilesToPng(server = "http://www.plantuml.com/plantuml", dir = process.cwd()) {
    const stream = fglob.stream(["**/*.puml"], { dot: true, onlyFiles: true, cwd: dir, absolute: true });
    let count = 0;
    for await (const entry of stream) {
        const outFile = entry.replace(/\.puml$/, ".png");
        // dummy one after the other
        try {
            const { mtime } = await fs.stat(entry);
            const { mtime: outModified } = await fs.stat(outFile);
            if (mtime <= outModified) {
                // skip unmodified files
                continue;
            }
        } catch (e) {
            // outfile does not exist
            // ignore and build
        }
        ++count;
        console.log(`Create png for ${entry}`);
        try {
            const diagramText = await fs.readFile(entry, { encoding: "UTF-8" });
            const imgSrc = createImageSrc(server, diagramText, "png");
            const imgBytes = await fetch(imgSrc);
            await fs.writeFile(outFile, imgBytes);
        } catch (e) {
            console.error(`Error creating png for ${entry}`, e);
        }
    }
    if (count === 0) {
        console.log(`All files up to date.`);
    }
}

function createImageSrc(serverUrl, text, format) {
    return `${serverUrl}/${format}/${plantumlEncoder.encode(text)}`;
}


function fetch(urlstr) {
    const url = new URL(urlstr);
    return new Promise((resolve, reject) => {
        let client = url.protocol === "https:" ? https: http;
        client.get(url, function (res) {
            var data = [];
            res.on('data', function (chunk) {
                data.push(chunk);
            }).on('end', function () {
                var buffer = Buffer.concat(data);
                resolve(buffer);
            });
        }).on("error", (err) => {
            reject(err);
        });
    });

}

module.exports = {
    transform: transformAllPumlFilesToPng
};
