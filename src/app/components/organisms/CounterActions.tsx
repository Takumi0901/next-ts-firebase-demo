import * as React from 'react'
import { counterEnhancer, Props } from '../enhancers/Counter'

const CounterActions: React.SFC<Props> = ({ counter, increment, decrement }) => {
  return (
    <div>
      <div>{counter.count}</div>
      <button onClick={() => increment(1)}>+</button>
      <button onClick={() => decrement(-1)}>-</button>
    </div>
  )
}

export default counterEnhancer(CounterActions)
