import React from 'react'
import PropTypes from 'prop-types'

const Parameter = ({ label, value }) =>
  <div className='parameter'>
    <span className='label'> {label} </span>:
    <span className='value'> {value} </span>
  </div>

Parameter.displayName = 'Parameter'
Parameter.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default Parameter

