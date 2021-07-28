# pumlToPng

Small script to convert puml to png in same folder.

All `.puml` files inside the working directory and all sub folders are converted into `.png` files, by requesting a plantuml server.

By default the <http://www.plantuml.com/plantuml> is requested for conversion.

## Usage

Install as global tool with:

```sh
npm install -g puml-to-png
```

Now in any folder with ".puml" files execute:

```sh
puml-to-png
```

Or if you have a custom plantuml server running:

```sh
puml-to-png --url http://mylocalplantumlserver
```

## Integration in Build Tools

You an use something like:

```js
const { transform } = require("puml-to-png/transform");

const server = "http://mylocalplantumlserver";
const directory = "/path/to/plantumlfiles";

transform(server, directory);
```

To integrate the transformation into your build process.

## License

Licensed as [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0)
