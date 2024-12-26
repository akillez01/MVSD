import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import { defineConfig } from "vite";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000", // URL do backend para desenvolvimento
        changeOrigin: true, // Altera a origem para corresponder ao backend
        secure: false, // Define como false caso o backend use HTTP
      },
    },
  },
});