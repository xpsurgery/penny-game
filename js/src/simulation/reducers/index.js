import { combineReducers } from 'redux'
import productionLine from './productionLine'
import worker from './worker'
import stats from './stats'

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
    defaultBatchSize:   config.defaultBatchSize,
    batchSizeIncrement: 0,
    taskTicks:          1,
    acceptInputAnyTime: false
  }),
  line: productionLine(config),
  stats: stats(config.name)
})

export default combineReducers({
  waterfall: simulation(waterfallConfig),
  agile: simulation(agileConfig),
  scrum: simulation(scrumConfig),
})

