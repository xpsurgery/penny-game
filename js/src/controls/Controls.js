import React from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import { enableRepeater, disableRepeater, resetAll } from './actionCreators'

const Controls = ({ running, ticksSoFar, enableRepeater, disableRepeater, resetAll }) =>
  <div className='controls group'>
    <div className='play-controls'>
      <button onClick={resetAll}>
        <FontAwesome name='fast-backward' />
      </button>
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
  disableRepeater,
  resetAll
})(Controls)

