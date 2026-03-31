/** Root ESLint config (restored). */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 2022, sourceType: "module" },
  ignorePatterns: ["dist/", ".next/", "frontend/.next/", "node_modules/"],
};

