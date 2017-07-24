import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PennyGame from './penny-game/PennyGame'
import TrendChart from './graphs/TrendChart'
import {
  cycleTimeHistory, valueDeliveredHistory, wipHistory
} from './graphs/reducer'

const Demonstration = ({ waterfall, agile, scrum, cycleTime, valueDelivered, wip }) =>
  <div className='demonstration'>
    <div className='games'>
      <h2> "Waterfall" </h2>
      <PennyGame config={waterfall} />
      <h2> "Agile" </h2>
      <PennyGame config={agile} />
      <h2> "Scrum" </h2>
      <PennyGame config={scrum} />
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

const mapStateToProps = ({ demonstration }) => ({
  waterfall: demonstration['waterfall'].pennyGame,
  agile: demonstration['agile'].pennyGame,
  scrum: demonstration['scrum'].pennyGame,
  cycleTime: [
    { name: 'agile', data: cycleTimeHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: cycleTimeHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: cycleTimeHistory(demonstration['scrum'].graphs) }
  ],
  valueDelivered: [
    { name: 'agile', data: valueDeliveredHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: valueDeliveredHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: valueDeliveredHistory(demonstration['scrum'].graphs) }
  ],
  wip: [
    { name: 'agile', data: wipHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: wipHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: wipHistory(demonstration['scrum'].graphs) }
  ]
})

export default connect(mapStateToProps)(Demonstration)

