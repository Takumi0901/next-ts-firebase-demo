import actionCreatorFactory from 'typescript-fsa'
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist'
import { IAuth } from './types'
import Cookies from 'js-cookie'

// Action types
const actionCreator = actionCreatorFactory()
export enum ActionTypes {
  SIGNIN = 'auth/SIGNIN',
  SIGNOUT = 'auth/SIGNOUT'
}

export const signIn = actionCreator<string>(ActionTypes.SIGNIN)
export const signOut = actionCreator<number>(ActionTypes.SIGNOUT)

const initialState: IAuth = {
  token: ''
}

// Reducer
export const authReducer = reducerWithInitialState(initialState)
  .case(signIn, (_, payload): any => {
    Cookies.set('token', payload)
    return { token: payload }
  })
  .case(signOut, () => {
    Cookies.remove('token')
    return { token: '' }
  })
