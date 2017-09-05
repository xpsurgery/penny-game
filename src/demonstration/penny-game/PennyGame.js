import React from 'react'
import PropTypes from 'prop-types'
import Config from './config/Config'
import Worker from './worker/Worker'
import Customer from './customer/Customer'
import { coinType, coinTypes } from './worker/reducer'

const workerArgs = (worker) => ({
  ...coinTypes(worker),
  name: worker.displayName,
  batchSize: worker.currentBatchSize,
  batchIncrement: worker.batchSizeIncrement,
  taskSize: worker.taskTicks,
  showParams: worker.showParams
})

const customerCoins = (customer) =>
  customer.coins.map(coin => coinType(coin))

const PennyGame = ({ s1, s2, s3, s4, customer }) =>
  <div className='penny-game group'>
    <Config analysis={s1} development={s3} />
    <Worker {...workerArgs(s1)} />
    <Worker {...workerArgs(s2)} />
    <Worker {...workerArgs(s3)} />
    <Worker {...workerArgs(s4)} />
    <Customer coins={customerCoins(customer)} />
  </div>

PennyGame.displayName = 'PennyGame'
PennyGame.propTypes = {
  s1: PropTypes.object.isRequired,
  s2: PropTypes.object.isRequired,
  s3: PropTypes.object.isRequired,
  s4: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired
}

export default PennyGame

