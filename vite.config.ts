// viteReact.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  optimizeDeps: {
    include: ["react-dom", "dot-object", "copy-to-clipboard"],
  },
  define: {
    global: "window",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next": path.resolve(__dirname, "./src/compat/next"),
    },
  },
});
