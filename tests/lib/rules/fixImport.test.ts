import { fixImportRule } from "../../../lib/rules/fixImport.js";

// eslint-disable-next-line node/no-unpublished-import
import { RuleTester } from "@typescript-eslint/rule-tester";
// eslint-disable-next-line node/no-unpublished-import
import { test, suite } from "mocha";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
// eslint-disable-next-line node/no-unpublished-import
import { AST_NODE_TYPES } from "@typescript-eslint/utils";

const currentFilePath = fileURLToPath(import.meta.url);
const projectRoot = dirname(dirname(dirname(dirname(dirname(currentFilePath)))));

RuleTester.afterAll = () => {};
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
suite("test no var lint", () => {
  test("test no var lint", () => {
    const ruleTester = new RuleTester({
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: projectRoot,
        project: ["./tsconfig.eslint.json"],
      },
    });
    const tempFileName = join(projectRoot, "tests", "temp.ts");
    ruleTester.run("fix import", fixImportRule, {
      valid: [
        {
          code: 'import "a";',
          filename: tempFileName,
        },
      ],

      invalid: [
        {
          code: 'import "sdk/a/b";',
          errors: [{ messageId: "fix import", type: AST_NODE_TYPES.ImportDeclaration }],
          output: 'import "sdk/a.b";',
          filename: tempFileName,
        },
      ],
    });
  });
});
