import { expect } from 'chai'
import { reductio } from '../specHelper'
import { tick, enableRepeater, disableRepeater, resetAll } from './actionCreators'
import reducer from './reducer'

describe('controls reducer', () => {

  it('counts the ticks', () => {
    let actions = [tick(), tick(), tick(), tick()]
    let state = reductio(reducer, actions)
    expect(state.ticksSoFar).to.equal(4)
  })

  it('can be enabled', () => {
    let actions = [tick(), tick(), enableRepeater(), tick()]
    let state = reductio(reducer, actions)
    expect(state.running).to.equal(true)
  })

  it('can be disabled', () => {
    let actions = [tick(), tick(), enableRepeater(), disableRepeater()]
    let state = reductio(reducer, actions)
    expect(state.running).to.equal(false)
  })

  it('can be reset', () => {
    let actions = [tick(), tick(), resetAll()]
    let state = reductio(reducer, actions)
    expect(state.running).to.equal(false)
    expect(state.ticksSoFar).to.equal(0)
  })

})

