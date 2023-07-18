import {execSync} from "child_process";

import {build} from "esbuild";

import { readFileSync, writeFileSync } from "fs";

const outDir = "dist";

function copyPackagesJson(){
  const fileName = "package.json"
  const fileContent = readFileSync(`./${fileName}`, "utf8");
  const packageJson = JSON.parse(fileContent);
  packageJson.type = "commenjs";
  packageJson.exports = {
    ".": {
      "types": "./index.d.ts",
      "default": "./index.js"
    }
  }
  writeFileSync(`./${outDir}/${fileName}`, JSON.stringify(packageJson));
}

try {
  await build({
    entryPoints: ["./lib/index.ts"],
    bundle: true,
    outfile: `./${outDir}/index.js`,
    platform: "node",
    target: "es6",
    sourcemap: true,
    loader: {".ts": "ts", ".tsx": "tsx"},
    packages: "external",
    format: "cjs",
    plugins: [
      {
        name: "TypeScriptDeclarationsPlugin",
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              execSync("npx tsc -p tsconfig-bundle.json");
              copyPackagesJson();
            }
          });
        }
      }
    ]
  });
} catch (e) {
  console.log(`bundle failed due to ${JSON.stringify(e)}`);
}
