import React from 'react'
import { Provider } from 'react-redux'
import Simulation from '../simulation/Simulation'

const Root = ({ store }) => (
  <Provider store={store}>
    <Simulation />
  </Provider>
)

export default Root
