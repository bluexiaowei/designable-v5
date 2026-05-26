import { ICustomEvent } from '@designable-v5/shared'
import { AbstractMutationNodeEvent } from './AbstractMutationNodeEvent'

export class HoverNodeEvent
  extends AbstractMutationNodeEvent
  implements ICustomEvent
{
  type = 'hover:node'
}
