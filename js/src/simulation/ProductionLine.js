import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import CoinPile from './CoinPile'
import { coinType, coinTypes } from './reducers/worker'

const workerArgs = (worker) => ({
  ...coinTypes(worker),
  name: worker.displayName,
  batchSize: worker.currentBatchSize
})

const customerCoins = (simulation) =>
  simulation.customer.coins.map(coin => coinType(coin))

const Customer = ({ coins }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <CoinPile coins={coins} />
  </div>

export default ({ simulation }) =>
  <div className='production-line group'>
    <Worker {...workerArgs(simulation.s1)} />
    <Worker {...workerArgs(simulation.s2)} />
    <Worker {...workerArgs(simulation.s3)} />
    <Worker {...workerArgs(simulation.s4)} />
    <Customer coins={customerCoins(simulation)} />
    <Stats simulation={simulation} />
  </div>

