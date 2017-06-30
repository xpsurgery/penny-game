import React from 'react'
import { connect } from 'react-redux'
import NumericalStat from './NumericalStat'
import {
  valueDelivered,
  workInProgress
} from './reducers/simulation'
import { ticksToFirstValue, cycleTime } from './reducers/stats'

const Stats = ({ value, wip, ttfv, ct }) =>
  <div className='stats'>
    <NumericalStat label='Value delivered' value={value} />
    <NumericalStat label='Current WIP' value={wip} />
    <NumericalStat label='Time to first value' value={ttfv} />
    <NumericalStat label='Cycle time' value={ct} />
  </div>

const mapStateToProps = (state, ownProps) => {
  return {
    value: valueDelivered(ownProps.simulation),
    wip:   workInProgress(ownProps.simulation),
    ttfv:  ticksToFirstValue(ownProps.simulation.stats) || '--',
    ct:    cycleTime(ownProps.simulation.stats) || '--'
  }
}

export default connect(mapStateToProps)(Stats)

