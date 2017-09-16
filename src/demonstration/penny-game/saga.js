import { put, select, takeEvery } from 'redux-saga/effects'
import actions from './saga-actions'

function* process(simulationName, workerName, nextWorkerName) {
  const state = yield select()
  const line = state.demonstration[simulationName].pennyGame
  const acts = actions(simulationName, line, workerName, nextWorkerName)
  for (let action of acts)
    yield put(action)
}

export default function* scenarioSagas(scenarioName) {
  yield takeEvery('TICK', process, scenarioName, 's1', 's2')
  yield takeEvery('TICK', process, scenarioName, 's2', 's3')
  yield takeEvery('TICK', process, scenarioName, 's3', 's4')
  yield takeEvery('TICK', process, scenarioName, 's4', 'customer')
}

