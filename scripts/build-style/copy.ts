import path from 'path'
import { copy, readFile, writeFile, existsSync } from 'fs-extra'
import { globSync } from 'glob'

export type CopyBaseOptions = Record<'esStr' | 'libStr', string>

const toOutputPath = (filename: string, outDir: 'lib' | 'esm') => {
  const relativePath = path.relative('src', filename)
  return path.join(outDir, relativePath)
}

const importLibToEs = async ({
  libStr,
  esStr,
  filename,
}: CopyBaseOptions & { filename: string }) => {
  if (!existsSync(filename)) {
    return Promise.resolve()
  }

  const fileContent: string = (await readFile(filename)).toString()

  return writeFile(
    filename,
    fileContent.replace(new RegExp(libStr, 'g'), esStr),
  )
}

export const runCopy = ({
  resolveForItem,
  ...lastOpts
}: CopyBaseOptions & { resolveForItem?: (filename: string) => unknown }) => {
  const files = globSync('./src/**/*', { windowsPathsNoEscape: true })

  const all = [] as Promise<unknown>[]

  for (const filename of files) {
    resolveForItem?.(filename)

    if (/\.(less|scss)$/.test(filename)) {
      all.push(copy(filename, toOutputPath(filename, 'esm')))
      all.push(copy(filename, toOutputPath(filename, 'lib')))

      continue
    }

    if (/[/\\]style\.ts$/.test(filename)) {
      importLibToEs({
        ...lastOpts,
        filename: toOutputPath(filename, 'esm').replace(/\.ts$/, '.js'),
      })

      continue
    }
  }

  return Promise.all(all)
}
