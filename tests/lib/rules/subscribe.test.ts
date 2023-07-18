import { subscribeRule } from "../../../lib/rules/subscribe.js";

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
suite("test subscribe", () => {
  test("test subscribe", () => {
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

    const baseTestCase = `
    declare function nativeFunction(instance:number);

    enum EM{
        INSTANCE1 = 1,
        INSTANCE2 = 2
    }

    class C1{
        public subscribe(em: EM){
            nativeFunction(em);
        }
        public foo(){}
    }


    const c1 = new C1();
    c1.foo();
    c1.subscribe(EM.INSTANCE1);

    `;

    const validTestCase = `${baseTestCase}
    c1.subscribe(EM.INSTANCE2);
    `;

    const invalidTestCase = baseTestCase;

    ruleTester.run("subscribe", subscribeRule, {
      valid: [
        {
          code: validTestCase,
          filename: tempFileName,
        },
      ],

      invalid: [
        {
          code: invalidTestCase,
          errors: [{ messageId: "subscribe", type: AST_NODE_TYPES.CallExpression }],
          filename: tempFileName,
        },
      ],
    });
  });
});
