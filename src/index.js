import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import saga from './saga'
import Application from './Application'

require("./index.less")

const store = configureStore()

store.runSaga(saga)

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('root')
)

