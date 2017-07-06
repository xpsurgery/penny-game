import React from 'react'
import PropTypes from 'prop-types'
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

Controls.displayName = 'Controls'
Controls.propTypes = {
  running:         PropTypes.bool.isRequired,
  ticksSoFar:      PropTypes.number.isRequired,
  enableRepeater:  PropTypes.func.isRequired,
  disableRepeater: PropTypes.func.isRequired,
  resetAll:        PropTypes.func.isRequired
}

const mapStateToProps = ({ controls }) => controls

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater,
  resetAll
})(Controls)

