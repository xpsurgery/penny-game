import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reducer from '../reducer'
import createSagaMiddleware, { END } from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, createLogger())
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore

