import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Workers are plain JS, not Next.js pages
    "workers/**",
  ]),
  {
    // Project-wide rule overrides for pre-existing patterns
    rules: {
      // setState in useEffect is intentionally used for localStorage sync in this project
      "react-hooks/set-state-in-effect": "warn",
      // `any` types are pre-existing throughout the codebase
      "@typescript-eslint/no-explicit-any": "warn",
      // Unescaped entities in existing content strings
      "react/no-unescaped-entities": "warn",
    },
  },
]);

export default eslintConfig;
