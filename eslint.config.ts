import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import react from "eslint-plugin-react"
import astro from "eslint-plugin-astro"
import prettier from "eslint-config-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import { globalIgnores } from "eslint/config"

export default tseslint.config([
  globalIgnores([
    "node_modules/",
    ".astro/",
    ".github/",
    ".vscode/",
    "dist/",
    "public/r/",
    "package-lock.json",
  ]),
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: [js.configs.recommended],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser } },
  },
  tseslint.configs.strict,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { reactHooks, react },
    extends: [
      reactHooks.configs["recommended-latest"],
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
  },
  ...astro.configs.recommended.filter(c => !c.files),
  ...astro.configs["jsx-a11y-strict"].filter(c => !c.files),
  prettier,
])
