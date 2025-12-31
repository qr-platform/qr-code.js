import * as babel from '@babel/core'
import type { Plugin } from 'vite'

import babelPluginInjectDataLocator from './babel-plugin-inject-data-locator'

export default function vitePluginInjectDataLocator(): Plugin {
  return {
    enforce: 'pre',
    name: 'vite-plugin-inject-data-locator',

    async transform(code, id) {
      if (!/\.(jsx|tsx)$/.test(id)) {
        return null
      }

      const inputSourceMap = this.getCombinedSourcemap()

      try {
        const result = babel.transformSync(code, {
          ast: false,
          babelrc: false,
          configFile: false,
          filename: id,
          inputSourceMap,
          plugins: [
            [
              babelPluginInjectDataLocator,
              {
                inputSourceMap,
                types: babel.types
              }
            ]
          ],
          presets: [
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
          ],
          sourceMaps: true
        })

        if (result?.code) {
          return {
            code: result.code,
            map: result.map
          }
        }
      } catch (error) {
        console.error(`Error transforming ${id}:`, error)
      }

      return null
    }
  }
}
