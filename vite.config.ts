import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@store": "/src/store",
      "@hooks": "/src/hooks",
      "@scss": "/src/scssStyle",
      "@": "/src",
    },
  },
});
