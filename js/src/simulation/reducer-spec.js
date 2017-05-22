import { expect } from 'chai'
import { reductio } from '../app/specHelper'
import { tick } from './actionCreators'
import reducer, { workInProgress, valueDelivered } from './reducer'

describe('productionLine', () => {

  let testCases = [
    { wip: 0, value: 0, state: {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: [], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['H'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['T'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: [], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }
  ]

  testCases.forEach((ex, numTicks) => {
    describe(`after ${numTicks} ticks`, () => {
      var state

      beforeEach(() => {
        let actions = Array(numTicks).fill(tick())
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

