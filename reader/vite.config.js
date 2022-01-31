import { defineConfig } from 'vite'
const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/ArknightsStoryTextReader/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        relics: resolve(__dirname, 'relics.html'),
        export: resolve(__dirname, 'export.html'),
        main2: resolve(__dirname, 'index2.html'),
      }
    }
  }
})
