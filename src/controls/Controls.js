import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'
import {
  enableRepeater, disableRepeater,
  resetAll, toggleParamsView
} from './actionCreators'

const Controls = ({ running, playMessage, ticksSoFar, enableRepeater, disableRepeater, resetAll, toggleParamsView }) =>
  <div className='controls group'>
    <div className='play-controls'>
      <button onClick={toggleParamsView} data-tip = 'Show/change simulation parameters'>
        <FontAwesome name='sliders' />
      </button>
      <button onClick={resetAll} data-tip = 'Reset everything'>
        <FontAwesome name='fast-backward' />
      </button>
      {
        running ? (
          <button onClick={disableRepeater} data-tip ='Pause'>
            <FontAwesome name='pause' />
          </button>
        ) : (
          <button onClick={enableRepeater} data-tip={playMessage}>
            <FontAwesome name='play' />
          </button>
        )
      }
    </div>
    <div className='ticks-so-far'>
      Ticks so far: {ticksSoFar}
    </div>
    <ReactTooltip type='light' effect='solid' border={true} className='tooltip' />
  </div>

Controls.displayName = 'Controls'
Controls.propTypes = {
  running:          PropTypes.bool.isRequired,
  playMessage:      PropTypes.string.isRequired,
  ticksSoFar:       PropTypes.number.isRequired,
  enableRepeater:   PropTypes.func.isRequired,
  disableRepeater:  PropTypes.func.isRequired,
  resetAll:         PropTypes.func.isRequired,
  toggleParamsView: PropTypes.func.isRequired
}

const mapStateToProps = ({ controls }) => {
  return {
    ...controls,
    playMessage: (controls.ticksSoFar > 0) ? 'Continue' : 'Start the simulation'
  }
}

export default connect(mapStateToProps, {
  enableRepeater,
  disableRepeater,
  resetAll,
  toggleParamsView
})(Controls)

