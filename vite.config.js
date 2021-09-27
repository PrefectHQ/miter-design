import { defineConfig } from 'vite'
import typescript from 'rollup-plugin-typescript2'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/entry.ts'),
      name: 'Miter'
    },
    rollupOptions: {
      // ensures vue isn't added to the bundle
      external: ['vue'],
      output: {
        // Provide vue as a global variable to use in the UMD build
        globals: {
          vue: 'Vue'
        }
      },
      plugins: []
    }
  },
  plugins: [
    vue(),
    typescript({
      check: false,
      tsconfig: resolve(__dirname, 'tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true
        },
        exclude: ['**/demo']
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env': process.env
  }
})
