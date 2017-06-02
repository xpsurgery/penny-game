import { all } from 'redux-saga/effects'
import watchTick from '../simulation/saga'

export default function* rootSaga() {
  yield all([
    watchTick()
  ])
}

