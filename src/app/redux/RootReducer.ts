import * as Redux from 'redux'
import { IStore } from './IStore'
import { countUpReducer } from './modules/counter'
import { authReducer } from './modules/auth'

const rootReducer: Redux.Reducer<IStore> = Redux.combineReducers<any>({
  counter: countUpReducer,
  auth: authReducer
})
export default rootReducer
