// eslint-disable-next-line node/no-unpublished-import
import { ESLintUtils } from "@typescript-eslint/utils";
// eslint-disable-next-line node/no-unpublished-import
import { RuleListener, RuleModule } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

function replaceSlashWithDot(path: string, sdkIndex: number): string {
  // Extract the part before and including 'sdk/'
  const index = sdkIndex + 4; // 'sdk/' is 4 characters long
  const beforeSdk = path.slice(0, index);

  // Extract the part after 'sdk/'
  const afterSdk = path.slice(index);

  // Replace '/' with '.' in the part after 'sdk/'
  const modifiedAfterSdk = afterSdk.replace("/", ".");

  // Concatenate the two parts and return
  return beforeSdk + modifiedAfterSdk;
}

// Type: RuleModule<"uppercase", ...>
export const fixImportRule: RuleModule<"fix import", string[], RuleListener> = createRule({
  name: "fix import",
  meta: {
    type: "problem",
    docs: {
      description: "fix old import",
      recommended: "strict",
    },
    fixable: "code",
    schema: [],
    messages: { "fix import": "fix import" },
  },

  defaultOptions: ["error"],

  create(context) {
    return {
      ImportDeclaration(node) {
        const sdkIndex = node.source.value.indexOf("sdk/");

        if (sdkIndex >= 0) {
          context.report({
            node,
            messageId: "fix import",
            fix(fixer) {
              const importPath = context
                .getSourceCode()
                .getFirstToken(node, { filter: (t) => t.value.includes("sdk") });
              if (importPath) {
                const originValue = importPath.value;
                const newValue = replaceSlashWithDot(originValue, sdkIndex + 1); //+1 to skip the "
                return importPath ? fixer.replaceText(importPath, newValue) : null;
              } else {
                return null;
              }
            },
          });
        }
      },

      VariableDeclaration(node) {
        if (node.kind == "var") {
          context.report({
            node,
            messageId: "fix import",
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
