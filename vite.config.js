import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@abstracts': fileURLToPath(new URL('./src/styles/abstracts', import.meta.url)),
      '@mixins': fileURLToPath(new URL('./src/styles/abstracts/mixins', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@abstracts/variables" as v;
          @use "@mixins/buttons" as btn;
        `,
      },
    },
  },
})