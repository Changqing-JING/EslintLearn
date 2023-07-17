import { noVarRule } from "../../../lib/rules/noVar.js";

import { RuleTester } from "eslint";
// eslint-disable-next-line node/no-unpublished-import
import { test, suite } from "mocha";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createRequire } from "module";

const currentFilePath = fileURLToPath(import.meta.url);
const projectRoot = dirname(dirname(dirname(dirname(dirname(currentFilePath)))));
const require = createRequire(import.meta.url);

// Resolve the absolute path of @typescript-eslint/parser
const parserPath = require.resolve("@typescript-eslint/parser");
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
suite("test no var lint", () => {
  test("test no var lint", () => {
    const ruleTester = new RuleTester({
      parser: parserPath,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: projectRoot,
        project: ["./tsconfig.eslint.json"],
      },
    });
    const tempFileName = join(projectRoot, "tests", "temp.ts");
    ruleTester.run("no-var", noVarRule, {
      valid: [
        {
          code: "let a:number = 1;",
          filename: tempFileName,
        },
      ],

      invalid: [
        {
          code: "var a:number = 1;",
          errors: [{ message: "not use var", type: "VariableDeclaration" }],
          output: "let a:number = 1;",
          filename: tempFileName,
        },
      ],
    });
  });
});
