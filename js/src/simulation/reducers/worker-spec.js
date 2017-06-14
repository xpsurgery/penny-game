import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import {
  newBatchFromCustomer,
  pickUpNextTask,
  continueTask
} from '../actionCreators'
import worker, {
  hasTaskInProgress,
  hasBatchReady,
  isReadyForNextBatch,
  hasWorkReadyToStart,
  coins
} from './worker'

describe('Worker reducer', () => {

  const reducer = worker('test', 's1', {
    initialBatchSize: 3,
    taskTicks: 2
  })

  describe('when there is nothing to do', () => {
    it('reports state correctly', () => {
      const state = reductio(reducer, [])
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(false)
    })
  })

  describe('when instructed to get a new batch from the customer', () => {
    let state

    beforeEach(() => {
      const actions = [newBatchFromCustomer('test', 's1')]
      state = reductio(reducer, actions)
    })

    it('collects the batch', () => {
      expect(coins(state)).to.deep.equal({ todo: ['H', 'H', 'H'], wip: [], out: [] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })

  })

  describe('when instructed to pick up the first task', () => {
    let state

    beforeEach(() => {
      const actions = [
        newBatchFromCustomer('test', 's1'),
        pickUpNextTask('test', 's1')
      ]
      state = reductio(reducer, actions)
    })

    it('picks up the task', () => {
      expect(coins(state)).to.deep.equal({ todo: ['H', 'H'], wip: ['H'], out: [] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(true)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })
  })

  describe('when instructed to continue the task', () => {
    let state

    beforeEach(() => {
      const actions = [
        newBatchFromCustomer('test', 's1'),
        pickUpNextTask('test', 's1'),
        continueTask('test', 's1')
      ]
      state = reductio(reducer, actions)
    })

    it('continues the task', () => {
      expect(coins(state)).to.deep.equal({ todo: ['H', 'H'], wip: ['H'], out: [] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(true)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })
  })

  describe('when instructed to continue the task again', () => {
    let state

    beforeEach(() => {
      const actions = [
        newBatchFromCustomer('test', 's1'),
        pickUpNextTask('test', 's1'),
        continueTask('test', 's1'),
        continueTask('test', 's1')
      ]
      state = reductio(reducer, actions)
    })

    it('completes the task', () => {
      expect(coins(state)).to.deep.equal({ todo: ['H', 'H'], wip: ['T'], out: [] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(true)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })
  })

  describe('when instructed to continue the task again', () => {
    let state

    beforeEach(() => {
      const actions = [
        newBatchFromCustomer('test', 's1'),
        pickUpNextTask('test', 's1'),
        continueTask('test', 's1'),
        continueTask('test', 's1'),
        continueTask('test', 's1')
      ]
      state = reductio(reducer, actions)
    })

    it('completes the task', () => {
      expect(coins(state)).to.deep.equal({ todo: ['H', 'H'], wip: [], out: ['T'] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })
  })

  describe('when instructed to complete all tasks', () => {
    let state

    beforeEach(() => {
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
      state = reductio(reducer, actions)
    })

    it('completes all tasks', () => {
      expect(coins(state)).to.deep.equal({ todo: [], wip: [], out: ['T', 'T', 'T'] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(false)
    })

    it('can deliver', () => {
      expect(hasBatchReady(state)).to.eq(true)
    })

    it('can receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(true)
    })
  })

})

