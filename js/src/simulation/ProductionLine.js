import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import CoinPile from './CoinPile'
import { coins } from './reducers/productionLine'

const Customer = ({ coins }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <CoinPile coins={coins} />
  </div>

export default ({ simulation }) =>
  <div className='production-line group'>
    <Worker {...coins(simulation.s1)} name={simulation.s1.displayName} batchSize={simulation.s1.currentBatchSize} />
    <Worker {...coins(simulation.s2)} name={simulation.s2.displayName} batchSize={simulation.s2.currentBatchSize} />
    <Worker {...coins(simulation.s3)} name={simulation.s3.displayName} batchSize={simulation.s3.currentBatchSize} />
    <Worker {...coins(simulation.s4)} name={simulation.s4.displayName} batchSize={simulation.s4.currentBatchSize} />
    <Customer {...simulation.customer} />
    <Stats simulation={simulation} />
  </div>

