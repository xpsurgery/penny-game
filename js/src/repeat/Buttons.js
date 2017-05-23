import React from 'react'
import { connect } from 'react-redux'
import { enableRepeater, disableRepeater } from './actionCreators'

const Buttons = ({ enableRepeater, disableRepeater }) =>
  <div className='buttons'>
    <button onClick={() => enableRepeater()}> play </button>
    <button onClick={() => disableRepeater()}> pause </button>
  </div>

export default connect( null, {
  enableRepeater,
  disableRepeater
})(Buttons)

