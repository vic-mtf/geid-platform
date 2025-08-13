import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  base: "/account/login",
  server: {
    port: 3000,
    https: true,
  },
  define: { global: "globalThis" },
  plugins: [react(), mkcert()],
});
