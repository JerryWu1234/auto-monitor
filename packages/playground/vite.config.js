import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { name } = require("./package");
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "esnext",
    lib: {
      name: `${name}-[name]`,
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["umd"],
    },
  },
})
