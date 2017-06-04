import React from 'react'
import { connect } from 'react-redux'
import { enableRepeater, disableRepeater } from './actionCreators'

const Buttons = ({ enableRepeater, disableRepeater }) =>
  <div className='play-controls'>
    <button onClick={() => enableRepeater()}> play </button>
    <button onClick={() => disableRepeater()}> pause </button>
  </div>

const mapStateToProps = ({ controls }) => controls

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater
})(Buttons)

