import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Simulation from '../simulation/Simulation'

const Root = ({ store }) =>
  <Provider store={store}>
    <Simulation />
  </Provider>

Root.displayName = 'Root'
Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
