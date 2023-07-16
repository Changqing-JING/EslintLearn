import { noVarRule } from "../../../lib/rules/noVar.js";

import { RuleTester } from "eslint";
// eslint-disable-next-line node/no-unpublished-import
import { test } from "mocha";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const currentFilePath = fileURLToPath(import.meta.url);
const projectRoot = dirname(dirname(dirname(dirname(dirname(currentFilePath)))));
const typeScriptParserPath = join(projectRoot, "node_modules", "@typescript-eslint", "parser", "dist", "parser.js");
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

test("test wrong input path", () => {
  const ruleTester = new RuleTester({
    parser: typeScriptParserPath,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      tsconfigRootDir: projectRoot,
    },
  });
  ruleTester.run("no-var", noVarRule, {
    valid: [
      {
        code: "let a:number = 1;",
      },
    ],

    invalid: [
      {
        code: "var a:number = 1;",
        errors: [{ message: "not use var", type: "VariableDeclaration" }],
        output: "let a:number = 1;",
      },
    ],
  });
});
