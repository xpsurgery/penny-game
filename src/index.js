import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './app/store'
import saga from './app/saga'
import Application from './app/Application'

require("./app/index.less")

const store = configureStore()

store.runSaga(saga)

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
)

