import react from '@vitejs/plugin-react'
import { defineConfig, type ConfigEnv } from 'vite'

import vitePluginInjectDataLocator from './plugins/vite-plugin-inject-data-locator'

// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => {
  const isDevelopment = mode === 'development'

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', {}]]
        }
        // React Fast Refresh is enabled by default in Vite
      }),
      // Only use the custom plugin in production to avoid HMR issues
      isDevelopment ? vitePluginInjectDataLocator() : []
    ].filter(Boolean),
    server: {
      port: 3000,
      // More specific host configuration
      host: true,
      // Explicit HMR configuration
      hmr: {
        // Enable HMR
        overlay: true,
        // Use WebSockets for HMR
        protocol: 'ws',
        // Timeout for HMR connection
        timeout: 30000
      },
      // Allow all hosts
      allowedHosts: ['all']
    },
    // Optimize dependencies to improve HMR performance
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  }
})
