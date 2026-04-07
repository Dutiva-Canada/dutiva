import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  cacheDir: process.env.TEMP
    ? `${process.env.TEMP}/dutiva-vite-cache`
    : "/tmp/dutiva-vite-cache",
});