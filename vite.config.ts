import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env
  const env = loadEnv(mode, process.cwd(), "");

  const plugins = [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime(),
    createHtmlPlugin({
      inject: {
        data: {
          VITE_APP_LOGO: env.VITE_APP_LOGO || "/logo.png",
          VITE_APP_TITLE: env.VITE_APP_TITLE || "Contatos 2DM Byte",
        },
      },
    }),
  ];

  return {
    base: "/contatos2dm-byte/", 
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client/src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    envDir: path.resolve(__dirname),
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "client/dist"),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false,
      host: true,
      allowedHosts: [
        ".manuspre.computer",
        ".manus.computer",
        ".manus-asia.computer",
        ".manuscomputer.ai",
        ".manusvm.computer",
        "localhost",
        "127.0.0.1",
      ],
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
