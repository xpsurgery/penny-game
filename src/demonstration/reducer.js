import { combineReducers } from 'redux'
import pennyGame from './penny-game/reducer'
import graphs from './graphs/reducer'

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

const reducers = (config) => combineReducers({
  pennyGame: pennyGame(config),
  graphs: graphs(config.name)
})

export default combineReducers({
  waterfall: reducers(waterfallConfig),
  agile:     reducers(agileConfig),
  scrum:     reducers(scrumConfig),
})

