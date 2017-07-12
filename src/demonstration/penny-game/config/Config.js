import React from 'react'
import PropTypes from 'prop-types'
import NumericalStat from '../NumericalStat'

const Config = ({ analysis, development }) =>
  <div className='config'>
    <NumericalStat name='Batch size' value={analysis.initialBatchSize} />
    <NumericalStat name='Dev batch size' value={development.currentBatchSize} />
    <NumericalStat name='Dev batch increment' value={development.batchSizeIncrement} />
    <NumericalStat name='Dev task size' value={development.taskTicks} />
  </div>

Config.displayName = 'Config'
Config.propTypes = {
  analysis:    PropTypes.object.isRequired,
  development: PropTypes.object.isRequired
}

export default Config

