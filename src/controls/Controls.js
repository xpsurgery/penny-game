import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'
import { enableRepeater, disableRepeater, resetAll } from './actionCreators'

const Controls = ({ running, ticksSoFar, enableRepeater, disableRepeater, resetAll }) =>
  <div className='controls group'>
    <div className='play-controls'>
      <button onClick={resetAll} data-tip = 'Reset the simulation'>
        <FontAwesome name='fast-backward' />
      </button>
      {
        running ? (
          <button onClick={disableRepeater} data-tip ='Pause the simulation'>
            <FontAwesome name='pause' />
          </button>
        ) : (
          <button onClick={enableRepeater} data-tip='Run the simulation'>
            <FontAwesome name='play' />
          </button>
        )
      }
    </div>
    <div className='ticks-so-far'>
      Ticks so far: {ticksSoFar}
    </div>
    <ReactTooltip type='light' effect='solid' border='true' />
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

