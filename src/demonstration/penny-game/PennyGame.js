import React from 'react'
import PropTypes from 'prop-types'
import Config from './config/Config'
import Worker from './worker/Worker'
import Stats from './stats/Stats'
import Customer from './customer/Customer'
import { coinType, coinTypes } from './worker/reducer'

const workerArgs = (worker) => ({
  ...coinTypes(worker),
  name: worker.displayName,
  batchSize: worker.currentBatchSize
})

const customerCoins = (simulation) =>
  simulation.customer.coins.map(coin => coinType(coin))

const PennyGame = ({ config }) =>
  <div className='production-line group'>
    <Config analysis={config.s1} development={config.s3} />
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

