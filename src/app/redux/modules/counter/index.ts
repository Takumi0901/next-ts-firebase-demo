import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import { ICounter } from './types'

// Action types
const actionCreator = actionCreatorFactory()
export enum ActionTypes {
  INCREMENT = 'counter/INCREMENT',
  DECREMENT = 'counter/DECREMENT'
}

export const increment = actionCreator<number>(ActionTypes.INCREMENT)
export const decrement = actionCreator<number>(ActionTypes.DECREMENT)

const initialState: ICounter = {
  count: 0
}

// Reducer
export const countUpReducer = reducerWithInitialState(initialState)
  .case(increment, (state: ICounter, payload: number) => {
    return { count: state.count + payload }
  })
  .case(decrement, (state: ICounter, payload: number) => {
    return { count: state.count - payload }
  })
