import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // Cloudflare Pages Functions run in the Workers runtime, not the
    // browser — `globals.browser` above doesn't define `fetch`/`Request`/
    // `Response`/etc. here, which would otherwise produce `no-undef` noise
    // across this whole directory. `@cloudflare/workers-types` is
    // intentionally not installed (see functions/api/subscribe.ts), so
    // this uses the closest built-in globals set instead.
    files: ["functions/**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.serviceworker,
    },
  }
);
