import { expect } from 'chai'
import { reductio } from '../app/specHelper'
import { tick } from '../repeat/actionCreators'
import { productionLine, coins, workInProgress, valueDelivered } from './reducer'

describe('Basic processing', () => {

  let testCases = [
    { ticks: 0, totalWip: 0, value: 0, state: {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 1, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 2, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 3, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 4, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: [], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 5, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['H'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 6, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: ['T'], out: ['T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 7, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H', 'H'], wip: [], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 8, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: ['H'], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 9, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: ['T'], out: ['T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 10, totalWip: 5, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: [], out: ['T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 15, totalWip: 5, value: 0, state: {
      s1: {todo: [], wip: ['T'], out: ['T', 'T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 16, totalWip: 5, value: 0, state: {
      s1: {todo: [], wip: [], out: ['T', 'T', 'T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 17, totalWip: 5, value: 0, state: {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: ['T', 'T', 'T', 'T', 'T'], wip: [], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 18, totalWip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: ['T'], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 19, totalWip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['H'], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: ['H'], out: []},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 20, totalWip: 10, value: 0, state: {
      s1: {todo: ['H', 'H', 'H', 'H'], wip: ['T'], out: []},
      s2: {todo: ['T', 'T', 'T', 'T'], wip: [], out: ['H']},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}}
    }, { ticks: 60, totalWip: 20, value: 0, state: {
      s1: {todo: ['H', 'H'], wip: ['T'], out: ['T', 'T']},
      s2: {todo: ['T', 'T'], wip: [], out: ['H', 'H', 'H']},
      s3: {todo: ['H'], wip: ['H'], out: ['T', 'T', 'T']},
      s4: {todo: ['T'], wip: ['H'], out: ['H', 'H', 'H']}}
    }, { ticks: 67, totalWip: 15, value: 5, state: {
      s1: {todo: [], wip: [], out: ['T', 'T', 'T', 'T', 'T']},
      s2: {todo: [], wip: [], out: []},
      s3: {todo: ['H', 'H', 'H', 'H', 'H'], wip: [], out: []},
      s4: {todo: ['T', 'T', 'T', 'T'], wip: ['T'], out: []}}
    }
  ]

  testCases.forEach((ex) => {
    describe(`after ${ex.ticks} ticks`, () => {
      var state

      beforeEach(() => {
        let actions = Array(ex.ticks).fill(tick())
        let reducer = productionLine({
          defaultBatchSize: 5,
          initialDeveloperBatch: 5,
          batchSizeIncrement: 0
        })
        state = reductio(reducer, actions)
      })

      it('all coins and workers are in the correct state', () => {
        expect(coins(state.s1)).to.deep.equal(ex.state.s1)
        expect(coins(state.s2)).to.deep.equal(ex.state.s2)
        expect(coins(state.s3)).to.deep.equal(ex.state.s3)
        expect(coins(state.s4)).to.deep.equal(ex.state.s4)
      })

      it('calculates the current WIP', () => {
        expect(workInProgress(state)).to.deep.equal(ex.totalWip)
      })

      it('calculates the total value delivered', () => {
        expect(valueDelivered(state)).to.deep.equal(ex.value)
      })
    })
  })

})

describe('enforced batches', () => {
  let state

  beforeEach(() => {
    let actions = Array(34).fill(tick())
    let reducer = productionLine({
      defaultBatchSize: 5,
      initialDeveloperBatch: 10,
      batchSizeIncrement: 0
    })
    state = reductio(reducer, actions)
  })

  it('work queues up until the batch size is right for the dev', () => {
    let expectedState = {
      s1: {todo: [], wip: [], out: []},
      s2: {todo: ['T', 'T', 'T', 'T', 'T'], wip: [], out: ['H', 'H', 'H', 'H', 'H']},
      s3: {todo: [], wip: [], out: []},
      s4: {todo: [], wip: [], out: []}
    }
    expect(coins(state.s1)).to.deep.equal(expectedState.s1)
    expect(coins(state.s2)).to.deep.equal(expectedState.s2)
    expect(coins(state.s3)).to.deep.equal(expectedState.s3)
    expect(coins(state.s4)).to.deep.equal(expectedState.s4)
  })
})

