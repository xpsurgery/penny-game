import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import { tick } from '../../controls/actionCreators'
import { receiveBatch } from '../actionCreators'
import stats, { ticksToFirstValue } from './stats'

describe('ticks remaining', () => {
  let state
  let reducer = stats('agile')

  it('ignores other simulations', () => {
    state = reducer(state, receiveBatch())
    expect(ticksToFirstValue(state)).to.equal(undefined)
  })

  it('counts the ticks upto delivery', () => {
    let actions = [tick(), tick(), receiveBatch('agile', 'customer', [])]
    state = reductio(reducer, actions)
    expect(ticksToFirstValue(state)).to.equal(2)
  })

  it("doesn't change after the first delivery", () => {
    let actions = [
      tick(), tick(), tick(),
      receiveBatch('agile', 'customer', []),
      tick(), tick(), tick(),
      receiveBatch('agile', 'customer', [])
    ]
    state = reductio(reducer, actions)
    expect(ticksToFirstValue(state)).to.equal(3)
  })

})

