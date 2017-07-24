import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PennyGame from './penny-game/PennyGame'
import TrendChart from './graphs/TrendChart'
import prepareDemonstration from './prepareDemonstration'

const Demonstration = ({ waterfall, agile, scrum, cycleTime, valueDelivered, wip }) =>
  <div className='demonstration'>
    <div className='games'>
      <h2> "Waterfall" </h2>
      <PennyGame {...waterfall} />
      <h2> "Agile" </h2>
      <PennyGame {...agile} />
      <h2> "Scrum" </h2>
      <PennyGame {...scrum} />
    </div>
    <div className='graphs'>
      <TrendChart title='Cycle time' dataSeries={cycleTime} />
      <TrendChart title='Value delivered' dataSeries={valueDelivered} />
      <TrendChart title='Work in process' dataSeries={wip} />
    </div>
  </div>

Demonstration.displayName = 'Demonstration'
Demonstration.propTypes = {
  waterfall: PropTypes.object.isRequired,
  agile:     PropTypes.object.isRequired,
  scrum:     PropTypes.object.isRequired,
  cycleTime:      PropTypes.array.isRequired,
  valueDelivered: PropTypes.array.isRequired,
  wip:            PropTypes.array.isRequired
}

export default connect(prepareDemonstration)(Demonstration)

