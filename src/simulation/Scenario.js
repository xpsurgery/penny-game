import React from 'react'
import PropTypes from 'prop-types'
import Config from './Config'
import Worker from './Worker'
import Stats from './Stats'
import Customer from './Customer'
import { coinType, coinTypes } from './reducers/worker'

const workerArgs = (worker) => ({
  ...coinTypes(worker),
  name: worker.displayName,
  batchSize: worker.currentBatchSize
})

const customerCoins = (simulation) =>
  simulation.customer.coins.map(coin => coinType(coin))

const Scenario = ({ simulation }) =>
  <div className='production-line group'>
    <Config simulation={simulation} />
    <Worker {...workerArgs(simulation.s1)} />
    <Worker {...workerArgs(simulation.s2)} />
    <Worker {...workerArgs(simulation.s3)} />
    <Worker {...workerArgs(simulation.s4)} />
    <Customer coins={customerCoins(simulation)} />
    <Stats simulation={simulation} />
  </div>

Scenario.displayName = 'Scenario'
Scenario.propTypes = {
  simulation: PropTypes.object.isRequired
}

export default Scenario

