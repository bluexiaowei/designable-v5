import { ICustomEvent } from '@designable-v5/shared'
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent'
export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'add:workspace'
}
