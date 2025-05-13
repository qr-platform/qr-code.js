import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import vitePluginInjectDataLocator from './plugins/vite-plugin-inject-data-locator'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginInjectDataLocator()],
  server: {
    allowedHosts: true
  }
})
