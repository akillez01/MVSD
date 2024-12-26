import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Diretório padrão de saída para o build (pode ser alterado, se necessário)
  },
  server: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: process.env.BACKEND_URL || "http://localhost:5000", // URL do backend para desenvolvimento
=======
        target: "http://localhost:5000", // URL do backend para desenvolvimento
>>>>>>> 923900865a097e933fc97493b3e7a718085d0ccd
        changeOrigin: true, // Altera a origem para corresponder ao backend
        secure: false, // Define como false caso o backend use HTTP
      },
    },
  },
});