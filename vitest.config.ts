import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [], // Add setup file if needed later
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
})
