import React from 'react'
import { connect } from 'react-redux'
import { enableRepeater, disableRepeater } from './actionCreators'

const Buttons = ({ ticksRemaining, enableRepeater, disableRepeater }) =>
  <div className='play-controls'>
    <button onClick={() => enableRepeater()}> play </button>
    <button onClick={() => disableRepeater()}> pause </button>
    <div className='time-remaining'>
      Time remaining: {ticksRemaining} ticks
    </div>
  </div>

const mapStateToProps = ({ controls }) => controls

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater
})(Buttons)

