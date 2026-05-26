import { ICustomEvent } from '@designable-v5/shared'
import { AbstractKeyboardEvent } from './AbstractKeyboardEvent'

export class KeyUpEvent extends AbstractKeyboardEvent implements ICustomEvent {
  type = 'key:up'
}
