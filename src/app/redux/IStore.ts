import { ICounter } from './modules/counter/types'
import { IAuth } from './modules/auth/types'

export interface IStore {
  counter: ICounter
  auth: IAuth
}
