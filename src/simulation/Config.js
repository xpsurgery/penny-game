import React from 'react'
import NumericalStat from './NumericalStat'

const Config = ({ simulation }) =>
  <div className='config'>
    <NumericalStat name='Batch size' value={simulation.s1.initialBatchSize} />
    <NumericalStat name='Dev batch size' value={simulation.s3.currentBatchSize} />
    <NumericalStat name='Dev batch increment' value={simulation.s3.batchSizeIncrement} />
    <NumericalStat name='Dev task size' value={simulation.s3.taskTicks} />
  </div>

export default Config

