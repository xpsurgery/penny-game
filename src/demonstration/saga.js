import scenarioSagas from '../penny-game/saga'

export default () => [
  scenarioSagas('waterfall'),
  scenarioSagas('agile'),
  scenarioSagas('scrum')
]

