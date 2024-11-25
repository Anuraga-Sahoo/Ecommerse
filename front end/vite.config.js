import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "http://localhost:5000/",
      "/uploads/": "http://localhost:5000/",
    },
  },
});

// live : https://e-commerce-backend-3wiz.onrender.com
