import { put, select, takeEvery } from 'redux-saga/effects'
import { deliverBatch } from './actionCreators'
import { canDeliverBatch } from './reducers/productionLine'

function* process(simulationName, workerName, nextWorkerName) {
  const state = yield select()
  const line = state.simulation[simulationName].line
  const worker = line[workerName]
  const nextWorker = line[nextWorkerName]
  if (canDeliverBatch(worker, nextWorker))
    yield put(deliverBatch(simulationName, workerName, nextWorkerName, worker.out))
}

export default function* watchTick() {
  yield takeEvery('TICK', process, 'waterfall', 's1', 's2')
  yield takeEvery('TICK', process, 'agile', 's1', 's2')
  yield takeEvery('TICK', process, 'scrum', 's1', 's2')

  yield takeEvery('TICK', process, 'waterfall', 's2', 's3')
  yield takeEvery('TICK', process, 'agile', 's2', 's3')
  yield takeEvery('TICK', process, 'scrum', 's2', 's3')

  yield takeEvery('TICK', process, 'waterfall', 's3', 's4')
  yield takeEvery('TICK', process, 'agile', 's3', 's4')
  yield takeEvery('TICK', process, 'scrum', 's3', 's4')

  yield takeEvery('TICK', process, 'waterfall', 's4', 'customer')
  yield takeEvery('TICK', process, 'agile', 's4', 'customer')
  yield takeEvery('TICK', process, 'scrum', 's4', 'customer')
}

