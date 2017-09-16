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
import worker, {
  hasTaskInProgress,
  hasBatchReady,
  isReadyForNextBatch,
  hasWorkReadyToStart,
  coins
} from './worker/reducer'

describe('Penny game saga', () => {

  const reducer = worker('test', 's1', {
    initialBatchSize: 3,
    batchSizeIncrement: 2,
    taskTicks: 2
  })
  let state

  describe('when the worker has a task in progress', () => {
    it('tells the worker to continue the task', () => {
      state = reductio(reducer, [pickUpNextTask('test', 's1')])
      expect(hasTaskInProgress(state)).to.eq(true)
      let line = {
        s1: state
      }
      let acts = actions('test', line, 's1', 's2')
      expect(acts.length).to.eq(1)
      expect(acts[0].type).to.eq(continueTask().type)
    })

  })

})

