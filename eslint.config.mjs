import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // Ignorar archivos y directorios (migrado desde .eslintignore)
    ignores: [
      // Generated Prisma files
      "**/src/generated/prisma/**",

      // Build outputs
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",

      // Dependencies
      "**/node_modules/**",

      // Environment variables
      "**/.env",
      "**/.env.local",
      "**/.env.production",
      "**/.env.staging",

      // Logs
      "**/npm-debug.log*",
      "**/yarn-debug.log*",
      "**/yarn-error.log*",

      // Runtime data
      "**/pids/**",
      "**/*.pid",
      "**/*.seed",
      "**/*.pid.lock",

      // Coverage directory
      "**/coverage/**",
      "**/.nyc_output/**",

      // ESLint cache
      "**/.eslintcache",

      // Generated files
      "**/src/generated/**"
    ]
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ['next'],
    rules: {
      // Desactivar reglas específicas de Next.js
      '@typescript-eslint/no-explicit-any': 'off'
    },
  })
];

export default eslintConfig;
