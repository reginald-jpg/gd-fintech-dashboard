/** Root ESLint — backend TypeScript only (frontend has its own config). */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [
    "dist/",
    ".next/",
    "frontend/**",
    "node_modules/",
    "sdk/",
    "docs/",
    "scripts/",
    "prisma/"
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/no-explicit-any": "off"
  }
};
