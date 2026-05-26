import { defineConfig, type Options } from 'tsup'

const EXTERNAL_PATTERNS = [
  /^@designable-v5\//,
  /^react$/,
  /^react-dom/,
  /^react-is$/,
  /^antd/,
  /^@formily\//,
  /^@ant-design\//,
  /^mobx/,
  /^@juggle\//,
  /^dateformat$/,
  /^requestidlecallback$/,
]

export function createLibBuildConfig() {
  const shared: Partial<Options> = {
    entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/__tests__/**'],
    bundle: false,
    sourcemap: false,
    clean: false,
    treeshake: false,
    splitting: false,
    external: EXTERNAL_PATTERNS,
    esbuildOptions(esbuildOptions) {
      esbuildOptions.loader = {
        ...esbuildOptions.loader,
        '.less': 'empty',
      }
    },
    tsconfig: 'tsconfig.build.json',
  }

  return defineConfig([
    {
      ...shared,
      format: 'cjs',
      outDir: 'lib',
      dts: false,
      outExtension() {
        return { js: '.js' }
      },
    },
    {
      ...shared,
      format: 'esm',
      outDir: 'esm',
      dts: false,
      outExtension() {
        return { js: '.js' }
      },
    },
  ])
}
