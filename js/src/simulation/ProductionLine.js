import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import CoinPile from './CoinPile'
import { coinType, coinTypes } from './reducers/worker'

const Customer = ({ coins }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <CoinPile coins={coins} />
  </div>

export default ({ simulation }) =>
  <div className='production-line group'>
    <Worker {...coinTypes(simulation.s1)} name={simulation.s1.displayName} batchSize={simulation.s1.currentBatchSize} />
    <Worker {...coinTypes(simulation.s2)} name={simulation.s2.displayName} batchSize={simulation.s2.currentBatchSize} />
    <Worker {...coinTypes(simulation.s3)} name={simulation.s3.displayName} batchSize={simulation.s3.currentBatchSize} />
    <Worker {...coinTypes(simulation.s4)} name={simulation.s4.displayName} batchSize={simulation.s4.currentBatchSize} />
    <Customer coins={simulation.customer.coins.map(coin => coinType(coin))} />
    <Stats simulation={simulation} />
  </div>

