import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: path.resolve(process.cwd(), "src/index.ts"),
          name: "ReactColorPikr",
          fileName: (format) =>
            `react-color-pikr.${format === "es" ? "js" : "umd.js"}`,
          formats: ["es", "umd"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            globals: {
              react: "React",
              "react-dom": "ReactDOM",
            },
          },
        },
      },
    };
  }

  return {
    plugins: [react()],
    base: "/react-color-pikr/", // GitHub Pages base path
    build: {
      outDir: "dist",
      assetsDir: "assets",
    },
  };
});
