import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),AutoImport({
      imports:['vue'],
      dts:'src/auto-import.d.ts'
    })
  ],
  resolve:{//路径别名
    alias:{
      '@': resolve(__dirname,'./src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://120.27.200.32:1234',  // 目标接口的域名
        changeOrigin: true,                // 必须设置为true，以便服务器收到的请求头中的host为API服务器的host
        rewrite: path => path.replace(/^\/api/, '')  // 重写请求路径，去掉/api
      }
    }
  }
})
