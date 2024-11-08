const { defineConfig } = require("eslint-define-config")

module.exports = defineConfig({
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": ["warn"],
    "no-var": "error",
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "off",
    "@typescript-eslint/no-non-null-assertion": ["off"],
    indent: ["off"],
    "no-empty-pattern": "off",
    "import/no-named-export": "off",
    "import/no-named-default": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
        fixStyle: "inline-type-imports",
      },
    ],
    "import/no-unresolved": [2, { caseSensitive: false }],
    "import/no-duplicates": ["warn", { "prefer-inline": true }],
    "import/consistent-type-specifier-style": ["warn", "prefer-inline"],
    "import/order": [
      "warn",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
})
