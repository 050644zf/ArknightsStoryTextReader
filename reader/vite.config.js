import { defineConfig, loadEnv } from 'vite'
const { resolve } = require('path')
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {

  const env = loadEnv(mode, process.cwd(), '')
  var base = env.VITE_BASE;
  if(!base){
    base = '/';
  }

  return{
  plugins: [vue()],
  base: base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        main2: resolve(__dirname, 'index2.html'),
      }
    }
  },
  server:{
    host: '0.0.0.0',
    fs:{
      strict:false
    }
  }
}})
