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
    entry: ['src/**/*.ts', 'src/**/*.tsx'],
    bundle: false,
    dts: false,
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
      outExtension() {
        return { js: '.js' }
      },
    },
    {
      ...shared,
      format: 'esm',
      outDir: 'esm',
      outExtension() {
        return { js: '.js' }
      },
    },
  ])
}
