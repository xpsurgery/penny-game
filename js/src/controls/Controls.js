import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { enableRepeater, disableRepeater } from './actionCreators'

const Controls = ({ running, ticksSoFar, enableRepeater, disableRepeater }) =>
  <div className='controls group'>
    <div className='play-controls'>
      {
        running ? (
          <button onClick={disableRepeater}>
            <FontAwesome name='pause' />
          </button>
        ) : (
          <button onClick={enableRepeater}>
            <FontAwesome name='play' />
          </button>
        )
      }
    </div>
    <div className='ticks-so-far'>
      Ticks so far: {ticksSoFar}
    </div>
  </div>

const mapStateToProps = ({ controls }) => controls

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater
})(Controls)

