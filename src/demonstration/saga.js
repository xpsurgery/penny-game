import scenarioSagas from '../simulation/saga'

export default () => [
  scenarioSagas('waterfall'),
  scenarioSagas('agile'),
  scenarioSagas('scrum')
]

