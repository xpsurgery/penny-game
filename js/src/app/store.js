import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducer'

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk, createLogger())
  )

  return store
}

export default configureStore

