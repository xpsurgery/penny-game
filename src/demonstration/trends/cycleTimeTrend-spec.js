import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import { tick } from '../../controls/actionCreators'
import { receiveBatch } from '../penny-game/actionCreators'
import reducers, { cycleTimeHistory } from './reducer'

describe('cycleTimes reducer', () => {
  let state
  let reducer = reducers('scrumfall')

  describe('when no batch has been received', () => {
    it('there are no cycle time data points', () => {
      state = reductio(reducer, [])
      expect(cycleTimeHistory(state)).to.deep.equal([0])
    })
  })

  describe('when a batch is received', () => {
    it('adds the fastest coin from the batch', () => {
      let actions = [
        tick(), tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}])
      ]
      state = reductio(reducer, actions)
      expect(cycleTimeHistory(state)).to.deep.equal([0,0,0,1])
    })
  })

  describe('when several batches are received', () => {
    it('adds the fastest coin from each batch', () => {
      let actions = [
        tick(), tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}]),
        tick(), tick(), tick(),
        receiveBatch('scrumfall', 'customer', [{createdAt: 1}, {createdAt: 2}])
      ]
      state = reductio(reducer, actions)
      expect(cycleTimeHistory(state)).to.deep.equal([0,0,0,1,1,1,4])
    })
  })

})

