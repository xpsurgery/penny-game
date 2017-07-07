import React from 'react'
import PropTypes from 'prop-types'

const NumericalStat = ({ name, value }) =>
  <div className='numerical-stat'>
    <div className='name'> {name} </div>
    <div className='value'> {value} </div>
  </div>

NumericalStat.displayName = 'NumericalStat'
NumericalStat.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
}

export default NumericalStat

