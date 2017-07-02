import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import {
  newBatchFromCustomer,
  receiveBatch,
  pickUpNextTask,
  continueTask,
  deliverBatch
} from '../actionCreators'
import { resetAll } from '../../controls/actionCreators'
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
    batchSizeIncrement: 2,
    taskTicks: 2
  })
  let state

  describe('when there is nothing to do', () => {
    it('reports state correctly', () => {
      state = reductio(reducer, [])
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(false)
    })

    it('has no work in progress', () => {
      expect(coins(state)).to.deep.equal({ todo: [], wip: [], out: [] })
    })

    it('has the correct initial batch size', () => {
      expect(state.currentBatchSize).to.eq(3)
    })
  })

  describe('when instructed to get a new batch from the customer', () => {

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

  describe('when instructed to deliver the batch', () => {

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
        continueTask('test', 's1'),
        deliverBatch('test', 's1', [{state: 'T'}, {state: 'T'}])
      ]
      state = reductio(reducer, actions)
    })

    it('no longer has the tasks', () => {
      expect(coins(state)).to.deep.equal({ todo: [], wip: [], out: ['T'] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(false)
    })

    it('cannot deliver', () => {
      expect(hasBatchReady(state)).to.eq(false)
    })

    it('has a bigger batch size', () => {
      expect(state.currentBatchSize).to.eq(5)
    })

    it('can receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H', 'H', 'H'])).to.eq(true)
    })

  })

  describe('when instructed to receive a batch', () => {

    beforeEach(() => {
      const actions = [
        receiveBatch('test', 's1', [{state: 'T'}, {state: 'T'}, {state: 'T'}, {state: 'T'}])
      ]
      state = reductio(reducer, actions)
    })

    it('has the batch ready', () => {
      expect(coins(state)).to.deep.equal({ todo: ['T', 'T', 'T', 'T'], wip: [], out: [] })
    })

    it('reports state correctly', () => {
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(true)
    })

    it('cannot deliver', () => {
      expect(hasBatchReady(state)).to.eq(false)
    })

    it('cannot receive a new batch of work', () => {
      expect(isReadyForNextBatch(state, ['H', 'H', 'H'])).to.eq(false)
    })
  })

  describe('when reset', () => {

    beforeEach(() => {
      const actions = [newBatchFromCustomer('test', 's1'), resetAll()]
      state = reductio(reducer, actions)
    })

    it('reports state correctly', () => {
      state = reductio(reducer, [])
      expect(hasTaskInProgress(state)).to.eq(false)
      expect(hasBatchReady(state)).to.eq(false)
      expect(hasWorkReadyToStart(state)).to.eq(false)
    })

    it('has no work in progress', () => {
      expect(coins(state)).to.deep.equal({ todo: [], wip: [], out: [] })
    })

    it('has the correct initial batch size', () => {
      expect(state.currentBatchSize).to.eq(3)
    })
  })

})

