import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // A URL do backend
        changeOrigin: true, // Alterar a origem para corresponder ao backend
        secure: false, // Caso o backend use HTTP em vez de HTTPS
      },
    },
  },
});
