import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { keycloakify } from "keycloakify/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    keycloakify({
      themeName: "orthomovi",
      themeVersion: "1.0.0",
      accountThemeImplementation: "none",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
