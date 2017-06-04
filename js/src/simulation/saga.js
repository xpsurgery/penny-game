import { put, select, takeEvery } from 'redux-saga/effects'
import { deliverBatch } from './actionCreators'

function* count() {
  const state = yield select()
  const line = state.simulation.agile.line
  const worker = line['s3']
  const nextWorker = line['s4']
  let nextIsReady = (nextWorker.acceptInputAnyTime || (nextWorker.todo.length === 0 && worker.out.length >= nextWorker.batchSize))
  if (worker.out.length >= worker.batchSize && nextIsReady)
    yield put(deliverBatch( 'agile', 's3', 's4', worker.out))
}

export default function* watchTick() {
  yield takeEvery('TICK', count)
}

