import { put, select, takeEvery } from 'redux-saga/effects'
import {
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

function* process(simulationName, workerName, nextWorkerName) {
  const state = yield select()
  const line = state.demonstration[simulationName]
  const worker = line[workerName]
  const nextWorker = line[nextWorkerName]

  if (hasTaskInProgress(worker))
    yield put(continueTask(simulationName, workerName))
  else if (hasBatchReady(worker) && (nextWorkerName === 'customer' || isReadyForNextBatch(nextWorker, worker.out))) {
    let sz = Math.max(worker.currentBatchSize, nextWorker.currentBatchSize)
    let batch = worker.out.slice(0, sz)
    yield put(deliverBatch(simulationName, workerName, batch))
    yield put(receiveBatch(simulationName, nextWorkerName, batch))
  } else if (hasWorkReadyToStart(worker))
    yield put(pickUpNextTask(simulationName, workerName))
  else if (workerName === 's1')
    yield put(newBatchFromCustomer(simulationName, workerName))
}

export default function* scenarioSagas(scenarioName) {
  yield takeEvery('TICK', process, scenarioName, 's1', 's2')
  yield takeEvery('TICK', process, scenarioName, 's2', 's3')
  yield takeEvery('TICK', process, scenarioName, 's3', 's4')
  yield takeEvery('TICK', process, scenarioName, 's4', 'customer')
}

