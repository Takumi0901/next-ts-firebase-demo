import * as Redux from 'redux'
import rootReducer from './RootReducer'
import { IStore } from './IStore'
import Cookies from 'js-cookie'

const configureStore = (initialState?: IStore): Redux.Store<IStore> => {
  let composes

  if (process.env.NODE_ENV === 'development') {
    const composeEnhancers =
      typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
        ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
        : Redux.compose
    composes = composeEnhancers(Redux.applyMiddleware())
  } else {
    composes = Redux.compose(Redux.applyMiddleware())
  }

  const token = Cookies.get('token') || ''

  return Redux.createStore(rootReducer, { ...initialState, auth: { token: token } }, composes)
}

export default configureStore
