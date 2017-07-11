import { combineReducers } from 'redux'
import pennyGame from './penny-game/reducers'

const waterfallConfig = {
  name:                  'waterfall',
  defaultBatchSize:      20,
  initialDeveloperBatch: 20,
  batchSizeIncrement:     0,
  devTaskTicks:           1
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
  batchSizeIncrement:     1,
  devTaskTicks:           5
}

export default combineReducers({
  waterfall: pennyGame(waterfallConfig),
  agile:     pennyGame(agileConfig),
  scrum:     pennyGame(scrumConfig),
})

