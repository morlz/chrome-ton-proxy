import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import { basename } from 'path'

function generateScopedName(name: string, filename: string) {
  const [file] = basename(filename, '.css').split('.')
  const hash = Buffer.from(filename + name).toString('base64url').slice(-8)

  return `${file}_${name}_${hash}`
}

import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const production = mode === 'production'

  return {
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
    css: {
      modules: { generateScopedName }
    },
    plugins: [
      VueTypeImports(),
      crx({ manifest }),
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        autoImportComponentCase: 'pascal',
      })
    ]
  }
})
