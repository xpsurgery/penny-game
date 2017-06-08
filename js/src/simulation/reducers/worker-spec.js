import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import {
  newBatchFromCustomer,
  pickUpNextTask,
  continueTask
} from '../actionCreators'
import worker from './worker'

describe('Worker reducer', () => {

  const reducer = worker('test', 's1', {
    defaultBatchSize: 3,
    taskTicks: 2
  })

  it('can receive a new batch from the customer', () => {
    const actions = [newBatchFromCustomer('test', 's1')]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H', 'H'])
    expect(state.wip).to.deep.equal({occupied: false})
    expect(state.out).to.deep.equal([])
  })

  it('can pick up the first task', () => {
    const actions = [
      newBatchFromCustomer('test', 's1'),
      pickUpNextTask('test', 's1')
    ]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H'])
    expect(state.wip).to.deep.equal({
      occupied:       true,
      ticksRemaining: 2,
      coin:           'H'
    })
    expect(state.out).to.deep.equal([])
  })

  it('can wait on the task', () => {
    const actions = [
      newBatchFromCustomer('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1')
    ]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H'])
    expect(state.wip).to.deep.equal({
      occupied:       true,
      ticksRemaining: 1,
      coin:           'H'
    })
    expect(state.out).to.deep.equal([])
  })

  it('can complete the task', () => {
    const actions = [
      newBatchFromCustomer('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1')
    ]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H'])
    expect(state.wip).to.deep.equal({
      occupied:       true,
      ticksRemaining: 0,
      coin:           'T'
    })
    expect(state.out).to.deep.equal([])
  })

  it('can move the task to done', () => {
    const actions = [
      newBatchFromCustomer('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1')
    ]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal(['H', 'H'])
    expect(state.wip).to.deep.equal({ occupied: false })
    expect(state.out).to.deep.equal(['T'])
  })

  it('can complete all tasks', () => {
    const actions = [
      newBatchFromCustomer('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      pickUpNextTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1'),
      continueTask('test', 's1')
    ]
    const state = reductio(reducer, actions)
    expect(state.todo).to.deep.equal([])
    expect(state.wip).to.deep.equal({ occupied: false })
    expect(state.out).to.deep.equal(['T', 'T', 'T'])
  })

})

