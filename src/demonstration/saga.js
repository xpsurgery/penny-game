import pennyGameSaga from './penny-game/saga'

export default () => [
  pennyGameSaga('waterfall'),
  pennyGameSaga('agile'),
  pennyGameSaga('scrum')
]

