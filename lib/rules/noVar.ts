import { Rule } from "eslint";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export const noVarRule: Rule.RuleModule = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "not allow to use var",
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    context.sourceCode;
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      VariableDeclaration(node) {
        if (node.kind == "var") {
          context.report({
            node,
            message: "not use var",
            fix(fixer) {
              const varToken = context.sourceCode.getFirstToken(node, { filter: (t) => t.value === "var" });
              return varToken ? fixer.replaceText(varToken, "let") : null;
            },
          });
        }
      },
    };
  },
};
