import assert from "node:assert";
import { processor } from "../../../lib/processor/asErase.js";
// eslint-disable-next-line node/no-unpublished-import
import { test, suite } from "mocha";
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
suite("asErase", () => {
  test("asErase", () => {
    const code = `@noinline`;
    const fileName = "a.ts";
    const block = processor[".ts"].preprocess(code, fileName);

    assert.strictEqual(fileName, block[0].filename);
    assert.strictEqual(false, block[0].text.includes("@"));
  });
});
