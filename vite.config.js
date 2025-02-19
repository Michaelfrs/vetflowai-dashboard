import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],  // Enables JSX support
  server: {
    port: 5173,
    strictPort: true,
    host: "0.0.0.0",
  }
});
