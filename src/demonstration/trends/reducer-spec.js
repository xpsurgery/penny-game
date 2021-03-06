import { expect } from 'chai'
import { reductio } from '../../specHelper'
import { tick } from '../../controls/actionCreators'
import {
  newBatchFromCustomer,
  receiveBatch
} from '../penny-game/actionCreators'
import reducers, { cycleTimeHistory, valueDeliveredHistory, wipHistory } from './reducer'

describe('trends reducer', () => {
  let state
  let reducer = reducers('scrumfall')

  describe('when no batch has been received', () => {
    beforeEach(() => {
      state = reductio(reducer, [])
    })

    it('there are no cycle time data points', () => {
      expect(cycleTimeHistory(state)).to.deep.equal([0])
    })

    it('there are no value data points', () => {
      expect(valueDeliveredHistory(state)).to.deep.equal([0])
    })

    it('there are no wip data points', () => {
      expect(wipHistory(state)).to.deep.equal([0])
    })
  })

  describe('when a batch has been started', () => {
    beforeEach(() => {
      let actions = [
        tick(), tick(),
        newBatchFromCustomer('scrumfall', 's1', ['H', 'H', 'H', 'H', 'H'])
      ]
      state = reductio(reducer, actions)
    })

    it('there are no cycle time data points', () => {
      expect(cycleTimeHistory(state)).to.deep.equal([0,0,0])
    })

    it('there are no value data points', () => {
      expect(valueDeliveredHistory(state)).to.deep.equal([0,0,0])
    })

    it('there are no wip data points', () => {
      expect(wipHistory(state)).to.deep.equal([0,0,5])
    })
  })

  describe('when a batch is received', () => {
    beforeEach(() => {
      let actions = [
        newBatchFromCustomer('scrumfall', 's1', ['H', 'H', 'H', 'H', 'H']),
        tick(), tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}])
      ]
      state = reductio(reducer, actions)
    })

    it('adds the fastest coin from the batch', () => {
      expect(cycleTimeHistory(state)).to.deep.equal([0,0,0,1])
    })

    it('adds the coins delivered', () => {
      expect(valueDeliveredHistory(state)).to.deep.equal([0,0,0,2])
    })

    it('records the reduced wip', () => {
      expect(wipHistory(state)).to.deep.equal([5,5,5,3])
    })
  })

  describe('when several batches are received', () => {
    beforeEach(() => {
      let actions = [
        newBatchFromCustomer('scrumfall', 's1', ['H', 'H', 'H', 'H', 'H']),
        tick(), tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}]),
        tick(),
        newBatchFromCustomer('scrumfall', 's1', ['H', 'H', 'H', 'H', 'H']),
        tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}, {createdAt: 2}])
      ]
      state = reductio(reducer, actions)
    })

    it('adds the fastest coin from each batch', () => {
      expect(cycleTimeHistory(state)).to.deep.equal([0,0,0,1,1,1,4])
    })

    it('adds all of the coins delivered', () => {
      expect(valueDeliveredHistory(state)).to.deep.equal([0,0,0,2,2,2,5])
    })

    it('records the wip trends', () => {
      expect(wipHistory(state)).to.deep.equal([5,5,5,3,8,8,5])
    })
  })

})

