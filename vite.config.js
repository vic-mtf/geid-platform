import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/account/login",
  server: {
    port: 3000,
  },
  define: { global: "window" },
  plugins: [react()],
});
