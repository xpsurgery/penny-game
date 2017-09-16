import {
  createBatch,
  hasTaskInProgress,
  hasBatchReady,
  isReadyForNextBatch,
  hasWorkReadyToStart
} from './worker/reducer'
import {
  continueTask,
  deliverBatch,
  receiveBatch,
  pickUpNextTask,
  newBatchFromCustomer
} from './actionCreators'

const actions = (simulationName, line, workerName, nextWorkerName) => {
  const worker = line[workerName]
  const nextWorker = line[nextWorkerName]

  if (hasTaskInProgress(worker))
    return [continueTask(simulationName, workerName)]
  else if (hasBatchReady(worker) && (nextWorkerName === 'customer' || isReadyForNextBatch(nextWorker, worker.out))) {
    let sz = Math.max(worker.currentBatchSize, nextWorker.currentBatchSize)
    let batch = worker.out.slice(0, sz)
    return [
      deliverBatch(simulationName, workerName, batch),
      receiveBatch(simulationName, nextWorkerName, batch)
    ]
  } else if (hasWorkReadyToStart(worker))
    return [pickUpNextTask(simulationName, workerName)]
  else if (workerName === 's1') {
    let batch = createBatch(worker)
    return [newBatchFromCustomer(simulationName, workerName, batch)]
  }
  return []
}

export default actions

