import { all } from 'redux-saga/effects'
import scenarioSagas from '../demonstration/saga'
import repeatTimer from '../controls/saga'

export default function* rootSaga() {
  yield all([
    repeatTimer(),
    ...scenarioSagas()
  ])
}

