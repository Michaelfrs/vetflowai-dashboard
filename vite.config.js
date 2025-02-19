import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".js", ".jsx"],  // Ensures JSX files are properly resolved
  },
  esbuild: {
    loader: "jsx",  // Forces Vite to process JSX correctly
  },
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
  },
});
