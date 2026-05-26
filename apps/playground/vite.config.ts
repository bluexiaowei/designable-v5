import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const repoRoot = path.resolve(__dirname, '../..')

const getWorkspaceAlias = () => {
  const results: Record<string, string> = {}

  for (const scope of ['packages', 'formily']) {
    const scopeDir = path.join(repoRoot, scope)
    if (!fs.existsSync(scopeDir)) continue

    for (const dir of fs.readdirSync(scopeDir)) {
      const pkgPath = path.join(scopeDir, dir, 'package.json')
      if (!fs.existsSync(pkgPath)) continue

      const workspacePkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
      if (workspacePkg.name) {
        results[workspacePkg.name] = path.join(scopeDir, dir, 'src')
      }
    }
  }

  return results
}

export default defineConfig({
  base: process.env.VITE_BASE || '/',
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
    outDir: 'build',
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
