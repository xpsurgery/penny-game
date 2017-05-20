import React from 'react'
import { render } from 'react-dom'
import configureStore from './app/store'
import Root from './app/Root'

//require("./app/index.less")

const store = configureStore()

render(
  <Root store={store} />,
  document.getElementById('root')
)
