import React from 'react'
import NumericalStat from './NumericalStat'

const Config = ({ simulation }) =>
  <div className='config'>
    <NumericalStat label='Batch size' value={simulation.s1.initialBatchSize} />
    <NumericalStat label='Dev batch size' value={simulation.s3.currentBatchSize} />
    <NumericalStat label='Dev batch increment' value={simulation.s3.batchSizeIncrement} />
    <NumericalStat label='Dev task size' value={simulation.s3.taskTicks} />
  </div>

export default Config

