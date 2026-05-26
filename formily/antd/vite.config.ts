import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs-extra'
import { globSync } from 'glob'

const repoRoot = path.resolve(__dirname, '../..')

const getWorkspaceAlias = () => {
  const results: Record<string, string> = {}
  const patterns = ['packages/*', 'formily/*']

  for (const pattern of patterns) {
    const found = globSync(pattern, { cwd: repoRoot })
    found.forEach((dir: string) => {
      const pkgPath = path.join(repoRoot, dir, 'package.json')
      if (!fs.existsSync(pkgPath)) return
      const workspacePkg = fs.readJSONSync(pkgPath)
      if (workspacePkg.name) {
        results[workspacePkg.name] = path.join(repoRoot, dir, 'src')
      }
    })
  }

  return results
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  root: path.resolve(__dirname, 'playground'),
  plugins: [react()],
  resolve: {
    alias: getWorkspaceAlias(),
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        paths: [repoRoot],
      },
    },
  },
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'build'),
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: [
      'monaco-editor/esm/vs/editor/editor.api',
      '@monaco-editor/react',
      '@monaco-editor/loader',
    ],
  },
})
