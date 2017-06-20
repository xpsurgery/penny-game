import { combineReducers } from 'redux'
import simulation from './simulation'

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

export default combineReducers({
  waterfall: simulation(waterfallConfig),
  agile:     simulation(agileConfig),
  scrum:     simulation(scrumConfig),
})

