import React from 'react'
import { render } from 'react-dom'
import configureStore from './app/store'
import saga from './app/saga'
import Root from './app/Root'

require("./app/index.less")

const store = configureStore()

store.runSaga(saga)

render(
  <Root store={store} />,
  document.getElementById('root')
)

