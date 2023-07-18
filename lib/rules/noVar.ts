// eslint-disable-next-line node/no-unpublished-import
import { ESLintUtils } from "@typescript-eslint/utils";
// eslint-disable-next-line node/no-unpublished-import
import { RuleListener, RuleModule } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Type: RuleModule<"uppercase", ...>
export const noVarRule: RuleModule<"not-use-var", string[], RuleListener> = createRule({
  name: "noVar",
  meta: {
    type: "problem",
    docs: {
      description: "not allow to use var",
      recommended: "strict",
    },
    fixable: "code",
    schema: [],
    messages: { "not-use-var": "not use var" },
  },

  defaultOptions: ["error"],

  create(context) {
    return {
      VariableDeclaration(node) {
        if (node.kind == "var") {
          context.report({
            node,
            messageId: "not-use-var",
            fix(fixer) {
              const varToken = context.getSourceCode().getFirstToken(node, { filter: (t) => t.value === "var" });
              return varToken ? fixer.replaceText(varToken, "let") : null;
            },
          });
        }
      },
    };
  },
});
