module.exports = {
  "root": true,
  "plugins": [
    "@typescript-eslint",
    "import",
    "jsdoc",
    "node",
    "promise",
    "sonarjs",
    "prettier",
    "unicorn",
    "unused-imports"
  ],
  "extends": [
    "prettier",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:node/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  "rules": {
    "@typescript-eslint/no-namespace": "off",
    "import/no-unresolved": [
      2,
      {
        "ignore": ["wasi"]
      }
    ],
    "prettier/prettier": "error",
    "prefer-spread": "error",
    // "node/no-unsupported-features/es-syntax": "off",
    "node/no-missing-import": "off",
    "unicorn/text-encoding-identifier-case": "off",
    "unicorn/no-new-array": "off",
    "unicorn/filename-case": [
      "error",
      {
        "case": "camelCase"
      }
    ],
    "unicorn/no-null": "off",
    "unicorn/prefer-string-replace-all": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/import-style": "off",
    "unicorn/numeric-separators-style": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/no-array-callback-reference": "off"
  },
  "ignorePatterns": [
    "src/core/instrument.ts",
    "src/utils/import.js",
    "src/generator/html-generator/resource/*"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "tsconfigRootDir": __dirname,
    "sourceType": "module",
    "ecmaVersion": "2020",
    "project": ["./tsconfig.json"],
  },
  "settings": {
    "node": {
      "tryExtensions": [".js", ".ts", ".mts", ".mjs"]
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": "typescript"
  },
  "env": {
    "node": true
  }
};