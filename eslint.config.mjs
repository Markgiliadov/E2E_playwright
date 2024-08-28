import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // Apply this configuration to all JavaScript, TypeScript, and module files
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for both .ts and .js files
      sourceType: "module", // Default to ES Modules
      globals: {
        ...globals.browser, // Include browser globals like window, document, etc.
        ...globals.node, // Include Node.js globals like process, __dirname, etc.
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      // Additional custom rules can be added here
      "@typescript-eslint/no-unused-vars": "error", // Example custom rule
      "no-undef": "off", // Turn off no-undef rule since TypeScript handles it
    },
  },

  // Specific configuration for CommonJS files
  {
    files: ["**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs", // Treat these files as CommonJS
      globals: {
        ...globals.node, // Include Node.js globals for CommonJS files
      },
    },
  },
];
