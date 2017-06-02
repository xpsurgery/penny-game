import { put, select, takeEvery } from 'redux-saga/effects'

function* count() {
  const state = yield select()
  const line = state.simulation.batchesOf5
  const worker = line['s3']
  const nextWorker = line['s4']
  let nextIsReady = (nextWorker.acceptInputAnyTime || (nextWorker.todo.length === 0 && worker.out.length >= nextWorker.batchSize))
  if (worker.out.length >= worker.batchSize && nextIsReady)
    yield put({
      type: 'DELIVER_BATCH_TO_NEXT_WORKER',
      lineName: 'batchesOf5',
      from: 's3',
      to: 's4',
      batch: worker.out
    })
}

export default function* watchTick() {
  yield takeEvery('TICK', count)
}

