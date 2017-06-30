import React from 'react'
import NumericalStat from './NumericalStat'

const Config = ({ simulation }) =>
  <div className='config'>
    <NumericalStat label='Batch size' value={simulation.s1.initialBatchSize} />
  </div>

export default Config

