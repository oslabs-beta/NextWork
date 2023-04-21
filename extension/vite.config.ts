import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chromeExtension } from "vite-plugin-chrome-extension";

// https://vitejs.dev/config/
export default defineConfig({
  //   root: "src",
  //   build: {
  //     rollupOptions: {
  //       input: {
  //         main: resolve(__dirname, "src/index.html"),
  //         panel: resolve(__dirname, "src/panel.html"),
  //       },
  //     },
  //     outDir: "../dist",
  //   },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        manifest: "src/manifest.json",
        panel: resolve(__dirname, "src/panel.html"),
      },
    },
  },
  plugins: [react(), chromeExtension()],
});
