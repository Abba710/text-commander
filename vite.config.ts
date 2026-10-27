import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" with { type: "json" };
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        app: resolve(import.meta.dirname, "index.html"),
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    crx({ manifest }),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
});
