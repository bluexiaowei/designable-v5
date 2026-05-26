import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs-extra'
import { GlobSync } from 'glob'

const repoRoot = path.resolve(__dirname, '../..')

const getWorkspaceAlias = () => {
  const pkg = fs.readJSONSync(path.join(repoRoot, 'package.json')) || {}
  const results: Record<string, string> = {}
  const workspaces = pkg.workspaces
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern: string) => {
      const { found } = new GlobSync(pattern, { cwd: repoRoot })
      found.forEach((name: string) => {
        const workspacePkg = fs.readJSONSync(
          path.join(repoRoot, name, 'package.json')
        )
        results[workspacePkg.name] = path.join(repoRoot, name, 'src')
      })
    })
  }
  return results
}

export default defineConfig({
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
