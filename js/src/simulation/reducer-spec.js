import { expect } from 'chai'
import { reductio } from '../app/specHelper'
import { tick } from './actionCreators'
import reducer from './reducer'

describe('productionLine', () => {

  let testCases = [
    { ticks: 0, state: {
      s1: {in: [], wip: [], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 1, state: {
      s1: {in: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 2, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 3, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 4, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: [], out: ['T']},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }
  ]

  testCases.forEach(ex => {
    it('works for ${ex.ticks} ticks', () => {
      let actions = Array(ex.ticks).fill(tick())
      let state = reductio(reducer, actions)
      expect(state.batchesOf5).to.deep.equal(ex.state)
    })
  })

})

