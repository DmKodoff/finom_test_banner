import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    // @ts-expect-error - Vitest uses its own Vite version, causing type conflicts
    react(),
    // @ts-expect-error - Vitest uses its own Vite version, causing type conflicts
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          fill: 'currentColor',
        },
        replaceAttrValues: {
          '#000': 'currentColor',
          '#000000': 'currentColor',
          black: 'currentColor',
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    typecheck: {
      tsconfig: './tsconfig.json',
    },
    // Suppress console errors for ErrorBoundary tests
    onConsoleLog: (log, type) => {
      if (
        type === 'stderr' &&
        typeof log === 'string' &&
        (log.includes('Error:') ||
          log.includes('Uncaught') ||
          log.includes('The above error occurred') ||
          log.includes('at ThrowError'))
      ) {
        return false // Suppress these logs
      }
    },
    // Suppress stderr output from React error logs in ErrorBoundary tests
    silent: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
