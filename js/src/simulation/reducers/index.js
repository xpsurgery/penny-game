import { combineReducers } from 'redux'
import productionLine from './productionLine'
import worker from './worker'
import stats from './stats'
import customer from './customer'

const waterfallConfig = {
  name:                  'waterfall',
  defaultBatchSize:      20,
  initialDeveloperBatch: 20,
  batchSizeIncrement:     5,
  devTaskTicks:           5
}

const agileConfig = {
  name:                  'agile',
  defaultBatchSize:       5,
  initialDeveloperBatch:  5,
  batchSizeIncrement:     0,
  devTaskTicks:           1
}

const scrumConfig = {
  name:                  'scrum',
  defaultBatchSize:       5,
  initialDeveloperBatch: 10,
  batchSizeIncrement:     5,
  devTaskTicks:           5
}

const simulation = (config) => combineReducers({
  s1: worker(config.name, 's1', {
    displayName:        'Analysis',
    initialBatchSize:   config.defaultBatchSize,
    batchSizeIncrement: 0,
    taskTicks:          1,
    acceptInputAnyTime: false
  }),
  s2: worker(config.name, 's2', {
    displayName:        'UX',
    initialBatchSize:   config.defaultBatchSize,
    batchSizeIncrement: 0,
    taskTicks:          1,
    acceptInputAnyTime: false
  }),
  s3: worker(config.name, 's3', {
    displayName:        'Development',
    initialBatchSize:   config.initialDeveloperBatch,
    batchSizeIncrement: config.batchSizeIncrement,
    taskTicks:          config.devTaskTicks,
    acceptInputAnyTime: false
  }),
  s4: worker(config.name, 's4', {
    displayName:        'Testing',
    initialBatchSize:   config.defaultBatchSize,
    batchSizeIncrement: 0,
    taskTicks:          1,
    acceptInputAnyTime: false
  }),
  customer: customer(config.name, 'customer'),
  line: productionLine(config),
  stats: stats(config.name)
})

export default combineReducers({
  waterfall: simulation(waterfallConfig),
  agile: simulation(agileConfig),
  scrum: simulation(scrumConfig),
})

