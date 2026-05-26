import { OutputOptions, rollup, RollupOptions } from 'rollup'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import resolve from 'rollup-plugin-node-resolve'

export const getRollupBasePlugin = () => [
  resolve(),
  postcss({
    extract: true,
    minimize: true,
    sourceMap: true,
    // extensions: ['.css', '.less', '.sass'],
    use: {
      less: {
        plugins: [new NpmImport({ prefix: '~' })],
        lessOptions: {
          javascriptEnabled: true,
          paths: [path.resolve(__dirname, '../..')],
        },
      },
      sass: {},
      stylus: {},
    },
  }),
]

export const build = async (
  rollupConfig: Omit<RollupOptions, 'output'> & { output: OutputOptions }
) => {
  const { output, ...input } = rollupConfig
  const bundle = await rollup(input)

  return bundle.write(output as OutputOptions)
}
