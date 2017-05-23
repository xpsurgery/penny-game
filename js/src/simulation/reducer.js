import { combineReducers } from 'redux'
import { TICK } from '../repeat/actionCreators'

const initialState = {
  s1: {todo: [], wip: [], out: []},
  s2: {todo: [], wip: [], out: []},
  s3: {todo: [], wip: [], out: []},
  s4: {todo: [], wip: [], out: []}
}

const pickUpNextTask = (state, workerName) => {
  let worker = state[workerName]
  return {
    ...state,
    [workerName]: {
      ...worker,
      todo: worker.todo.slice(1),
      wip: worker.todo.slice(0, 1)
    }
  }
}

const flipCoin = (worker) => ({
  ...worker,
  wip: [(worker.wip[0] == 'H') ? 'T' : 'H']
})

const moveCoinToDone = (worker) => ({
  ...worker,
  wip: [],
  out: worker.out.concat(worker.wip)
})

const hasTaskInProgress = (worker) => {
  return (worker.wip.length > 0)
}

const continueTask = (state, workerName) => {
  let worker = state[workerName]
  return {
    ...state,
    [workerName]: (worker.wip[0] == 'H') ? flipCoin(worker) : moveCoinToDone(worker)
  }
}

const hasCompletedBatch = (worker) => {
  return (worker.out.length >= 5)
}

const hasWorkReadyToStart = (worker) => {
  return (worker.todo.length > 0)
}

const newBatchFromCustomer = (state, workerName) => ({
  ...state,
  s1: {
    ...state.s1,
    todo: (workerName == 's1') ? ['H', 'H', 'H', 'H', 'H'] : []
  }
})

const deliverCompletedBatch = (state, fromWorkerName, toWorkerName) => {
  let fromWorker = state[fromWorkerName]
  let toWorker = state[toWorkerName]
  return {
    ...state,
    [fromWorkerName]: {
      ...fromWorker,
      out: []
    },
    [toWorkerName]: {
      ...toWorker,
      todo: toWorker.todo.concat(fromWorker.out)
    }
  }
}

const process = (state, workerName, nextWorkerName) => {
  let worker = state[workerName]
  if (hasTaskInProgress(worker))
    return continueTask(state, workerName)
  else if (hasCompletedBatch(worker))
    return deliverCompletedBatch(state, workerName, nextWorkerName)
  else if (hasWorkReadyToStart(worker))
    return pickUpNextTask(state, workerName)
  else
    return newBatchFromCustomer(state, workerName)
}

const p2 = (state, workerName, nextWorkerName) => {
  let worker = state[workerName]
  if (hasTaskInProgress(worker))
    return {
      ...state,
      [workerName]: (worker.wip[0] == 'T') ? flipCoin(worker) : moveCoinToDone(worker)
    }
  else if (hasCompletedBatch(worker))
    return deliverCompletedBatch(state, workerName, nextWorkerName)
  else if (hasWorkReadyToStart(worker))
    return pickUpNextTask(state, workerName)
  else
    return state
}

const productionLine = (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      state = p2(state, 's3', 's4')
      state = p2(state, 's2', 's3')
      return process(state, 's1', 's2')
    default:
      return state
  }
}

export const coins = (worker) => ({
  ...worker
})

export const valueDelivered = (line) => {
  return line.s4.out.length
}

export const workInProgress = (line) => {
  let c1 = coins(line.s1)
  let c2 = coins(line.s2)
  let c3 = coins(line.s3)
  let c4 = coins(line.s4)
  return c1.todo.length + c1.wip.length + c1.out.length +
         c2.todo.length + c2.wip.length + c2.out.length +
         c3.todo.length + c3.wip.length + c3.out.length +
         c4.todo.length + c4.wip.length
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})

