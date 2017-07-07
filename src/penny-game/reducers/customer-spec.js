import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import { receiveBatch } from '../actionCreators'
import { resetAll } from '../../controls/actionCreators'
import customer from './customer'

describe('Customer reducer', () => {

  const reducer = customer('test', 'fred')

  it('can receive a batch of coins', () => {
    const actions = [
      receiveBatch('test', 'fred', ['T', 'T']),
      receiveBatch('test', 'fred', ['T', 'T']),
      receiveBatch('test', 'fred', ['T', 'T'])
    ]
    const state = reductio(reducer, actions)
    expect(state.coins).to.deep.eq(['T', 'T', 'T', 'T', 'T', 'T'])
  })

  it('can be reset', () => {
    const actions = [
      receiveBatch('test', 'fred', ['T', 'T']),
      resetAll()
    ]
    const state = reductio(reducer, actions)
    expect(state.coins).to.deep.eq([])
  })

})

