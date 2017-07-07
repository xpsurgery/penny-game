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

const PennyGame = ({ config }) =>
  <div className='production-line group'>
    <Config simulation={config} />
    <Worker {...workerArgs(config.s1)} />
    <Worker {...workerArgs(config.s2)} />
    <Worker {...workerArgs(config.s3)} />
    <Worker {...workerArgs(config.s4)} />
    <Customer coins={customerCoins(config)} />
    <Stats simulation={config} />
  </div>

PennyGame.displayName = 'PennyGame'
PennyGame.propTypes = {
  config: PropTypes.object.isRequired
}

export default PennyGame

