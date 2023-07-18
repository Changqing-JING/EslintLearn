// eslint-disable-next-line node/no-unpublished-import
import { AST_NODE_TYPES, ESLintUtils, TSESTree } from "@typescript-eslint/utils";
// eslint-disable-next-line node/no-unpublished-import
import { RuleListener, RuleModule } from "@typescript-eslint/utils/ts-eslint";

const createRule = ESLintUtils.RuleCreator((name) => `https://example.com/rule/${name}`);

// Type: RuleModule<"uppercase", ...>
export const subscribeRule: RuleModule<"subscribe", string[], RuleListener> = createRule({
  name: "subscribe",
  meta: {
    type: "problem",
    docs: {
      description: "used subscribe",
      recommended: "strict",
    },
    fixable: undefined,
    schema: [],
    messages: { subscribe: "subscribe missing instance {{missingNames}}" },
  },

  defaultOptions: ["error"],

  create(context) {
    const enumDefs: Map<string, Set<string>> = new Map<string, Set<string>>();
    const enumUsed: Map<string, Map<string, TSESTree.Node>> = new Map<string, Map<string, TSESTree.Node>>();

    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier
        ) {
          const propertyName = node.callee.property.name;
          if (propertyName !== "subscribe") {
            return;
          }
        }

        if (node.arguments.length > 0) {
          const firstArgument = node.arguments[0];
          if (
            firstArgument.type === AST_NODE_TYPES.MemberExpression &&
            firstArgument.object.type === AST_NODE_TYPES.Identifier
          ) {
            const enumName = firstArgument.object.name;
            if (!enumUsed.has(enumName)) {
              enumUsed.set(enumName, new Map<string, TSESTree.Node>());
            }
            const usedSet = enumUsed.get(enumName) as Map<string, TSESTree.Node>;
            if (firstArgument.property.type === AST_NODE_TYPES.Identifier) {
              usedSet.set(firstArgument.property.name, node);
            }
          }
        }
      },
      TSEnumDeclaration(node) {
        const enumName = node.id.name;
        const enumNameSet: Set<string> = new Set<string>();
        enumDefs.set(enumName, enumNameSet);

        for (const member of node.members) {
          if (member.id.type === AST_NODE_TYPES.Identifier) {
            enumNameSet.add(member.id.name);
          }
        }
      },

      "Program:exit": (node) => {
        for (const [key, definedSet] of enumDefs.entries()) {
          const definedSetCopy = new Set<string>();

          for (const enumDefine of definedSet) {
            definedSetCopy.add(enumDefine);
          }

          const usedSet = enumUsed.get(key) as Map<string, TSESTree.Node>;
          let nodeLast: TSESTree.Node | undefined;
          for (const [enumUsed, nodeUsed] of usedSet) {
            nodeLast = nodeUsed;
            definedSetCopy.delete(enumUsed);
          }

          if (definedSetCopy.size > 0) {
            const missingNames: string = Array.from(definedSetCopy).join(",");
            context.report({
              node: nodeLast ?? node,
              messageId: "subscribe",
              data: {
                missingNames: missingNames,
              },
            });
          }
        }
      },
    };
  },
});
