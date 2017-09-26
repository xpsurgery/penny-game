import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PennyGame from './penny-game/PennyGame'
import TrendChart from './trends/TrendChart'
import prepareDemonstration from './prepareDemonstration'

const Demonstration = ({ waterfall, agile, scrum, times, values, wips }) =>
  <div className='demonstration'>
    <div className='graphs group'>
      <TrendChart title='Cycle time' dataSeries={times} />
      <TrendChart title='Value delivered' dataSeries={values} />
      <TrendChart title='Work in process' dataSeries={wips} />
    </div>
    <div className='games group'>
      <div className='waterfall'>
        <h2> "Waterfall" </h2>
        <PennyGame {...waterfall} />
      </div>
      <div className='agile'>
        <h2> "Agile" </h2>
        <PennyGame {...agile} />
      </div>
      <div className='scrum'>
        <h2> "Scrum" </h2>
        <PennyGame {...scrum} />
      </div>
    </div>
  </div>

Demonstration.displayName = 'Demonstration'
Demonstration.propTypes = {
  waterfall: PropTypes.object.isRequired,
  agile:     PropTypes.object.isRequired,
  scrum:     PropTypes.object.isRequired,
  times:     PropTypes.array.isRequired,
  values:    PropTypes.array.isRequired,
  wips:      PropTypes.array.isRequired
}

export default connect(prepareDemonstration)(Demonstration)

