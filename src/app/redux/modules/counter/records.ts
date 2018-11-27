import { Record } from 'immutable'
import { ICounter } from './types'

export class CounterRecord extends Record({ count: 0 }) implements ICounter {
  inc(payload: number) {
    console.log('HOHOHOHOHO')
    return this.withMutations(s => s.set('count', this.count + payload))
  }
  dec(payload: number) {
    return this.withMutations(s => s.set('count', this.count + payload))
  }
}
