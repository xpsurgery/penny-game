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
    initialBatchSize: 1,
    batchSizeIncrement: 0,
    taskTicks: 1
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

  describe('when the worker has a completed batch', () => {
    describe('and the next worker is the customer', () => {
      it('tells the worker to deliver the batch', () => {
        let line = {
          s1: reductio(reducer, [
            receiveBatch('test', 's1', [{state: 'T'}]),
            pickUpNextTask('test', 's1'),
            continueTask('test', 's1'),
            continueTask('test', 's1')
          ]),
          customer: reductio(reducer, [])
        }
        let acts = actions('test', line, 's1', 'customer')
        expect(acts.length).to.eq(2)
        expect(acts[0].type).to.eq(deliverBatch().type)
        expect(acts[1].type).to.eq(receiveBatch().type)
      })
    })

    describe('and the next worker is not the customer', () => {

      describe('and is ready to receive', () => {
        it('tells the worker to deliver the batch', () => {
          let line = {
            s1: reductio(reducer, [
              receiveBatch('test', 's1', [{state: 'T'}]),
              pickUpNextTask('test', 's1'),
              continueTask('test', 's1'),
              continueTask('test', 's1')
            ]),
            s2: reductio(reducer, [])
          }
          let acts = actions('test', line, 's1', 's2')
          expect(acts.length).to.eq(2)
          expect(acts[0].type).to.eq(deliverBatch().type)
          expect(acts[1].type).to.eq(receiveBatch().type)
        })
      })

      describe('and is not ready to receive', () => {
        it('does nothing', () => {
          let line = {
            s2: reductio(reducer, [
              receiveBatch('test', 's2', [{state: 'T'}]),
              pickUpNextTask('test', 's2'),
              continueTask('test', 's2'),
              continueTask('test', 's2')
            ]),
            s3: reductio(reducer, [
              receiveBatch('test', 's3', [{state: 'T'}]),
              pickUpNextTask('test', 's3')
            ])
          }
          let acts = actions('test', line, 's2', 's3')
          expect(acts.length).to.eq(0)
        })
      })

    })

  })

})

