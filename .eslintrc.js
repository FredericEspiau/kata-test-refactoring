module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier", "jest", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:node/recommended",
    "plugin:jest/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": 0,
    "node/no-missing-import": 0,
    "node/no-unpublished-import": 0,
  }
};
