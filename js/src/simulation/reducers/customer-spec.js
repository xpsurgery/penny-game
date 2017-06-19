import { expect } from 'chai'
import { reductio } from '../../app/specHelper'
import { receiveBatch } from '../actionCreators'
import customer from './customer'

describe('Customer reducer', () => {

  const reducer = customer('test', 'fred')

  describe('when it receives a batch of coins', () => {

    it('adds them to its pile', () => {
      const actions = [
        receiveBatch('test', 'fred', ['T', 'T']),
        receiveBatch('test', 'fred', ['T', 'T']),
        receiveBatch('test', 'fred', ['T', 'T'])
      ]
      const state = reductio(reducer, actions)
      expect(state.coins).to.deep.eq(['T', 'T', 'T', 'T', 'T', 'T'])
    })
  })

})

