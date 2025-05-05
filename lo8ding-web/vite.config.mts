import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // point your library import to local src for HMR
      "lo8ding-lib": path.resolve(__dirname, "../packages/lo8ding-lib/src"),
    },
  },
  server: {
    fs: {
      // allow Vite to serve files from the workspace root
      allow: [".."],
    },
  },
});
