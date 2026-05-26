import { GlobalRegistry, IDesignerRegistry } from '@designable-v5/core'
import { globalThisPolyfill } from '@designable-v5/shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
