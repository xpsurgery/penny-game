import { put, select, takeEvery } from 'redux-saga/effects'
import {
  hasTaskInProgress,
  hasBatchReady,
  isReadyForNextBatch,
  hasWorkReadyToStart,
  batchOf
} from './reducers/worker'
import {
  continueTask,
  deliverBatch,
  receiveBatch,
  pickUpNextTask,
  newBatchFromCustomer
} from './actionCreators'

function* process(simulationName, workerName, nextWorkerName) {
  const state = yield select()
  const line = state.simulation[simulationName]
  const worker = line[workerName]
  const nextWorker = line[nextWorkerName]

  if (hasTaskInProgress(worker))
    yield put(continueTask(simulationName, workerName))
  else if (hasBatchReady(worker) && (nextWorkerName === 'customer' || isReadyForNextBatch(nextWorker, worker.out))) {
    let batch = batchOf(worker.currentBatchSize, worker)
    yield put(deliverBatch(simulationName, workerName, batch))
    yield put(receiveBatch(simulationName, nextWorkerName, batch))
  } else if (hasWorkReadyToStart(worker))
    yield put(pickUpNextTask(simulationName, workerName))
  else if (workerName === 's1')
    yield put(newBatchFromCustomer(simulationName, workerName))
}

export default function* watchTick() {
  yield takeEvery('TICK', process, 'waterfall', 's1', 's2')
  yield takeEvery('TICK', process, 'waterfall', 's2', 's3')
  yield takeEvery('TICK', process, 'waterfall', 's3', 's4')
  yield takeEvery('TICK', process, 'waterfall', 's4', 'customer')

  yield takeEvery('TICK', process, 'agile', 's1', 's2')
  yield takeEvery('TICK', process, 'agile', 's2', 's3')
  yield takeEvery('TICK', process, 'agile', 's3', 's4')
  yield takeEvery('TICK', process, 'agile', 's4', 'customer')

  yield takeEvery('TICK', process, 'scrum', 's1', 's2')
  yield takeEvery('TICK', process, 'scrum', 's2', 's3')
  yield takeEvery('TICK', process, 'scrum', 's3', 's4')
  yield takeEvery('TICK', process, 'scrum', 's4', 'customer')
}

