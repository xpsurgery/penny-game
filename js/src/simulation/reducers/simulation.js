import { combineReducers } from 'redux'
import productionLine from './productionLine'
import worker from './worker'
import stats from './stats'
import customer from './customer'

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
  line: productionLine(config),
  stats: stats(config.name)
})

