import { expect } from 'chai'
import { reductio } from '../../../app/specHelper'
import { tick } from '../../../controls/actionCreators'
import { receiveBatch } from '../actionCreators'
import stats, { ticksToFirstValue, cycleTime } from './stats'

describe('stats reducer', () => {
  let state
  let reducer = stats('agile')

  describe('ticks to first value', () => {

    it('ignores other simulations', () => {
      state = reducer(state, receiveBatch())
      expect(ticksToFirstValue(state)).to.equal(undefined)
    })

    it('counts the ticks upto delivery', () => {
      let actions = [tick(), tick(), receiveBatch('agile', 'customer', [{createdAt: 34}])]
      state = reductio(reducer, actions)
      expect(ticksToFirstValue(state)).to.equal(2)
    })

    it("doesn't change after the first delivery", () => {
      let actions = [
        tick(), tick(), tick(),
        receiveBatch('agile', 'customer', [{createdAt: 34}]),
        tick(), tick(), tick(),
        receiveBatch('agile', 'customer', [{createdAt: 34}])
      ]
      state = reductio(reducer, actions)
      expect(ticksToFirstValue(state)).to.equal(3)
    })

  })

  describe('cycle time', () => {
    it('records the oldest coin', () => {
      let actions = [
        tick(), tick(), tick(),
        receiveBatch('agile', 'customer', [{createdAt: 1}, {createdAt: 2}])
      ]
      state = reductio(reducer, actions)
      expect(cycleTime(state)).to.equal(2)
    })
  })

})

