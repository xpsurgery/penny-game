import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Demonstration from '../demonstration/Demonstration'

const Root = ({ store }) =>
  <Provider store={store}>
    <Demonstration />
  </Provider>

Root.displayName = 'Root'
Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root

