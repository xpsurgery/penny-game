import { delay } from 'redux-saga'
import { all, call, put, take, fork, cancel, select } from 'redux-saga/effects'
import {
  tick, disableRepeater,
  ENABLE_REPEATER, DISABLE_REPEATER, RESET_ALL
} from './actionCreators'

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

function* resetAll() {
  while (yield take(RESET_ALL)) {
    yield put(disableRepeater())
  }
}

export default function* root() {
  yield all([
    fork(timer),
    fork(resetAll)
  ])
}

