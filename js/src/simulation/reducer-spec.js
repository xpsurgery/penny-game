import { expect } from 'chai'
import { reductio } from '../app/specHelper'
import { tick } from './actionCreators'
import reducer, { workInProgress, valueDelivered } from './reducer'

describe('productionLine', () => {

  let testCases = [
    { ticks: 0, wip: 0, value: 0, state: {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 1, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 2, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 3, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 4, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: [], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 5, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['H'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 6, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['T'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 7, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: [], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 8, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: ['H'], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 9, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: ['T'], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 10, wip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: [], out: ['T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 15, wip: 5, value: 0, state: {
      s1: {todo: [], wip: ['T'], out: ['T', 'T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 16, wip: 5, value: 0, state: {
      s1: {todo: [], wip: [], out: ['T', 'T', 'T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 17, wip: 5, value: 0, state: {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: ['T', 'T', 'T', 'T', 'T'], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 18, wip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: ['T'], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 19, wip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: ['H'], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 20, wip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: [], out: ['H']},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }
  ]

  testCases.forEach((ex) => {
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

