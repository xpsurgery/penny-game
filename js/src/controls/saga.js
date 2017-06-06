import { delay } from 'redux-saga'
import { call, put, take, fork, cancel, select } from 'redux-saga/effects'
import { tick, ENABLE_REPEATER, DISABLE_REPEATER } from './actionCreators'

function* sendTick() {
  const state = yield select()
  const millis = state.controls.millisecondsPerTick
  while (yield call(delay, millis, true))
    yield put(tick())
}

function* timer() {
  while (yield take(ENABLE_REPEATER)) {
    const bgSyncTask = yield fork(sendTick)
    yield take(DISABLE_REPEATER)
    yield cancel(bgSyncTask)
  }
}

export default function* root() {
  yield timer()
}

