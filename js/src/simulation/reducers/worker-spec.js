import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import { newBatchFromCustomer } from '../actionCreators'
import worker from './worker'

describe('Worker reducer', () => {

  it('can receive a new batch from the customer', () => {
    const reducer = worker('test', 's1', {
      defaultBatchSize: 3
    })
    const actions = [newBatchFromCustomer('test', 's1')]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H', 'H'])
    expect(state.wip).to.deep.equal({occupied: false})
    expect(state.out).to.deep.equal([])
  })

})

