import { expect } from 'chai'
import { reductio } from '../app/specHelper'
import { tick } from './actionCreators'
import reducer, { workInProgress, valueDelivered } from './reducer'

describe('productionLine', () => {

  let testCases = [
    { ticks: 0, wip: 0, value: 0, state: {
      s1: {in: [], wip: [], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 1, wip: 5, value: 0, state: {
      s1: {in: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 2, wip: 5, value: 0, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 3, wip: 5, value: 0, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }, { ticks: 4, wip: 5, value: 0, state: {
      s1: {in: ['H', 'H', 'H', 'H'], wip: [], out: ['T']},
      s2: {in: [], wip: [], out: []},
      s3: {in: [], wip: [], out: []},
      s4: {in: [], wip: [], out: []}}
    }
  ]

  testCases.forEach(ex => {
    describe(`after ${ex.ticks} ticks`, () => {
      var state

      beforeEach(() => {
        let actions = Array(ex.ticks).fill(tick())
        state = reductio(reducer, actions)
      })

      it('all coins and workers are in the correct state', () => {
        expect(state.batchesOf5).to.deep.equal(ex.state)
      })

      it('calculates the current WIP', () => {
        expect(workInProgress(state.batchesOf5)).to.deep.equal(ex.wip)
      })

      it('calculates the total value delivered', () => {
        expect(valueDelivered(state.batchesOf5)).to.deep.equal(ex.value)
      })
    })
  })

})

