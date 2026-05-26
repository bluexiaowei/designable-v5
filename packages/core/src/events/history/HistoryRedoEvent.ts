import { ICustomEvent } from '@designable-v5/shared'
import { AbstractHistoryEvent } from './AbstractHistoryEvent'

export class HistoryUndoEvent
  extends AbstractHistoryEvent
  implements ICustomEvent
{
  type = 'history:undo'
}
