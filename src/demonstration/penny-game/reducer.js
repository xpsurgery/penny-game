import { combineReducers } from 'redux'
import worker, { coins } from './worker/reducer'
import stats from './stats/reducer'
import customer from './customer/reducer'

const standardWorker = (config, name, displayName) =>
  worker(config.name, name, {
    displayName:        displayName,
    initialBatchSize:   config.defaultBatchSize,
    batchSizeIncrement: 0,
    taskTicks:          1,
    acceptInputAnyTime: false
  })

const developer = (config, name, displayName) =>
  worker(config.name, name, {
    displayName:        displayName,
    initialBatchSize:   config.initialDeveloperBatch,
    batchSizeIncrement: config.batchSizeIncrement,
    taskTicks:          config.devTaskTicks,
    acceptInputAnyTime: false
  })

export default (config) => combineReducers({
  s1: standardWorker(config, 's1', 'Analysis'),
  s2: standardWorker(config, 's2', 'UX'),
  s3: developer(config, 's3', 'Development'),
  s4: standardWorker(config, 's4', 'Testing'),
  customer: customer(config.name, 'customer'),
  stats: stats(config.name)
})

export const valueDelivered = (simulation) => {
  return simulation.customer.coins.length
}

export const workInProgress = (simulation) => {
  let c1 = coins(simulation.s1)
  let c2 = coins(simulation.s2)
  let c3 = coins(simulation.s3)
  let c4 = coins(simulation.s4)
  return c1.todo.length + c1.wip.length + c1.out.length +
         c2.todo.length + c2.wip.length + c2.out.length +
         c3.todo.length + c3.wip.length + c3.out.length +
         c4.todo.length + c4.wip.length + c4.out.length
}

