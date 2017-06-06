import React from 'react'
import { connect } from 'react-redux'
import {
  valueDelivered,
  workInProgress
} from './reducers/productionLine'
import { ticksToFirstValue } from './reducers/stats'

const NumericalStat = ({ label, value }) =>
  <div className='numerical-stat'>
    <div className='label'> {label} </div>
    <div className='value'> {value} </div>
  </div>

const Stats = ({ value, wip, ttfv, ct }) =>
  <div className='stats'>
    <NumericalStat label='Value delivered' value={value} />
    <NumericalStat label='Current WIP' value={wip} />
    <NumericalStat label='Time to first value' value={ttfv} />
    <NumericalStat label='Cycle time' value={ct} />
  </div>

const mapStateToProps = (state, ownProps) => {
  let line = ownProps.simulation.line
  return {
    value: valueDelivered(line),
    wip: workInProgress(line),
    ttfv: ticksToFirstValue(ownProps.simulation.stats) || '--',
    ct: '??'
  }
}

export default connect(mapStateToProps)(Stats)

