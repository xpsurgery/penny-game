import { all } from 'redux-saga/effects'
import watchTick from '../demonstration/saga'
import repeatTimer from '../controls/saga'

export default function* rootSaga() {
  yield all([
    repeatTimer(),
    watchTick()
  ])
}

