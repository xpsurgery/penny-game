import { combineReducers } from 'redux'
import { TICK } from './actionCreators'

const initialState = {
  s1: {todo: [], wip: [], out: []},
  s2: {todo: [], wip: [], out: []},
  s3: {todo: [], wip: [], out: []},
  s4: {todo: [], wip: [], out: []}
}

const mciw = (worker) => ({
  ...worker,
  todo: worker.todo.slice(1),
  wip: worker.todo.slice(0, 1)
})

const moveCoinIntoWip = (state, workerName) => {
  let worker = state[workerName]
  return {
    ...state,
    [workerName]: mciw(worker)
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

const processCoin = (state, workerName) => {
  let worker = state[workerName]
  if (worker.wip[0] == 'H')
    return {
      ...state,
      [workerName]: flipCoin(worker)
    }
  else
    return {
      ...state,
      [workerName]: moveCoinToDone(worker)
    }
}

const newBatchFromCustomer = (state, workerName) => ({
  ...state,
  s1: {
    ...state.s1,
    todo: (workerName == 's1') ? ['H', 'H', 'H', 'H', 'H'] : []
  }
})

const passCompletedBatchToNextWorker = (state, fromWorkerName, toWorkerName) => {
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
      todo: fromWorker.out
    }
  }
}

const process = (state, workerName, nextWorkerName) => {
  if (state[workerName].out.length == 0)
    if (state[workerName].wip.length == 0)
      if (state[workerName].todo.length == 0)
        return newBatchFromCustomer(state, workerName)
      else
        return moveCoinIntoWip(state, workerName)
    else
      return processCoin(state, workerName)
  else if (state[workerName].out.length < 5)
    if (state[workerName].wip.length == 0)
      return moveCoinIntoWip(state, workerName)
    else
      return processCoin(state, workerName)
  else
    return passCompletedBatchToNextWorker(state, workerName, nextWorkerName)
}

const p2 = (state, workerName, nextWorkerName) => {
  let worker = state[workerName]
  if (worker.wip.length == 0 && worker.todo.length > 0)
    return moveCoinIntoWip(state, workerName)
  return state
}

const productionLine = (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      state = p2(state, 's2', 's3')
      return process(state, 's1', 's2')
    default:
      return state
  }
}

export const valueDelivered = (line) => {
  return line.s4.out.length
}

export const workInProgress = (line) => {
  return line.s1.todo.length + line.s1.wip.length + line.s1.out.length +
    line.s2.todo.length + line.s2.wip.length + line.s2.out.length +
    line.s3.todo.length + line.s3.wip.length + line.s3.out.length +
    line.s4.todo.length + line.s4.wip.length
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})

