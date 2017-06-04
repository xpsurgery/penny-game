import { combineReducers } from 'redux'
import productionLine from './productionLine'

export default combineReducers({
  waterfall: productionLine({
    defaultBatchSize:      20,
    initialDeveloperBatch: 20,
    batchSizeIncrement:     5,
    devTaskTicks:           5
  }),
  agile: productionLine({
    defaultBatchSize:       5,
    initialDeveloperBatch:  5,
    batchSizeIncrement:     0,
    devTaskTicks:           1
  }),
  scrum: productionLine({
    defaultBatchSize:       5,
    initialDeveloperBatch: 10,
    batchSizeIncrement:     5,
    devTaskTicks:           5
  }),
})

