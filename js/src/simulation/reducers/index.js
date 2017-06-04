import { combineReducers } from 'redux'
import productionLine from './productionLine'

export default combineReducers({
  batchesOf20: productionLine({
    defaultBatchSize: 20,
    initialDeveloperBatch: 20,
    batchSizeIncrement: 5,
    devTaskTicks: 5
  }),
  batchesOf5:  productionLine({
    defaultBatchSize: 5,
    initialDeveloperBatch: 5,
    batchSizeIncrement: 0,
    devTaskTicks: 1
  }),
  slowDev:     productionLine({
    defaultBatchSize: 5,
    initialDeveloperBatch: 10,
    batchSizeIncrement: 5,
    devTaskTicks: 5
  }),
})

