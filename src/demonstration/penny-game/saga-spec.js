import { expect } from 'chai'
import { reductio } from '../../specHelper'
import actions from './saga-actions'
import {
  newBatchFromCustomer,
  receiveBatch,
  pickUpNextTask,
  continueTask,
  deliverBatch
} from './actionCreators'
import worker from './worker/reducer'

describe('Penny game saga', () => {

  const reducer = worker('test', 's1', {
    initialBatchSize: 3,
    batchSizeIncrement: 2,
    taskTicks: 2
  })

  describe('when the worker has nothing to do', () => {

    describe('and this is the first worker in the line', () => {
      it('tells the worker to get a new batch from the customer', () => {
        let line = {
          s1: reductio(reducer, [])
        }
        let acts = actions('test', line, 's1', 's2')
        expect(acts.length).to.eq(1)
        expect(acts[0].type).to.eq(newBatchFromCustomer().type)
      })
    })

    describe('and the worker has a supplier', () => {
      it('passes no instructions to the worker', () => {
        let line = {
          s2: reductio(reducer, [])
        }
        let acts = actions('test', line, 's2', 's3')
        expect(acts.length).to.eq(0)
      })
    })

  })

  describe('when the worker has unstarted work', () => {
    it('tells the worker to begin a task', () => {
      let line = {
        s2: reductio(reducer, [receiveBatch('test', 's1', [{state: 'T'}, {state: 'T'}])])
      }
      let acts = actions('test', line, 's2', 's3')
      expect(acts.length).to.eq(1)
      expect(acts[0].type).to.eq(pickUpNextTask().type)
    })
  })

  describe('when the worker has a task in progress', () => {
    it('tells the worker to continue the task', () => {
      let line = {
        s1: reductio(reducer, [pickUpNextTask('test', 's1')])
      }
      let acts = actions('test', line, 's1', 's2')
      expect(acts.length).to.eq(1)
      expect(acts[0].type).to.eq(continueTask().type)
    })

  })

})

