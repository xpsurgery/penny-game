import React from 'react'
import { connect } from 'react-redux'
import { enableRepeater, disableRepeater } from './actionCreators'

const Buttons = ({ remaining, enableRepeater, disableRepeater }) =>
  <div className='play-controls'>
    <button onClick={() => enableRepeater()}> play </button>
    <button onClick={() => disableRepeater()}> pause </button>
    <div className='time-remaining'>
      Time remaining: {remaining} seconds
    </div>
  </div>

const mapStateToProps = ({ repeat }) => ({
  remaining: 240 - repeat.ticksSoFar
})

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater
})(Buttons)

