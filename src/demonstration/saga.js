import scenarioSagas from '../simulation/saga'

export default function* watchTick() {
  yield scenarioSagas('waterfall')
  yield scenarioSagas('agile')
  yield scenarioSagas('scrum')
}

