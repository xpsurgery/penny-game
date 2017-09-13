import { put, select, takeEvery } from 'redux-saga/effects'
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

export const actions = (simulationName, line, workerName, nextWorkerName) => {
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

function* process(simulationName, workerName, nextWorkerName) {
  const state = yield select()
  const line = state.demonstration[simulationName].pennyGame
  const acts = actions(simulationName, line, workerName, nextWorkerName)
  for (let act of acts)
    yield put(act)
}

export default function* scenarioSagas(scenarioName) {
  yield takeEvery('TICK', process, scenarioName, 's1', 's2')
  yield takeEvery('TICK', process, scenarioName, 's2', 's3')
  yield takeEvery('TICK', process, scenarioName, 's3', 's4')
  yield takeEvery('TICK', process, scenarioName, 's4', 'customer')
}

