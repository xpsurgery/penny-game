import { combineReducers } from 'redux'
import { TICK } from '../repeat/actionCreators'

const initialState = () => {
  let customer = { todo: [] }
  let s4 = {todo: [], wip: {occupied: false}, out: [], next: customer}
  let s3 = {todo: [], wip: {occupied: false}, out: [], next: s4}
  let s2 = {todo: [], wip: {occupied: false}, out: [], next: s3}
  let s1 = {todo: [], wip: {occupied: false}, out: [], next: s2}
  return { s1, s2, s3, s4 }
}

const pickUpNextTask = (state, workerName) => {
  let worker = state[workerName]
  return {
    ...state,
    [workerName]: {
      ...worker,
      todo: worker.todo.slice(1),
      wip: {
        occupied: true,
        ticksRemaining: 1,
        coin: worker.todo.slice(0, 1)[0]
      }
    }
  }
}

const flipCoin = (worker) => ({
  ...worker,
  wip: {
    ...worker.wip,
    ticksRemaining: 0,
    coin: (worker.wip.coin == 'H') ? 'T' : 'H'
  }
})

const wait = (worker) => ({
  ...worker,
  wip: {
    ...worker.wip,
    ticksRemaining: worker.ticksRemaining - 1
  }
})

const moveCoinToDone = (worker) => ({
  ...worker,
  wip: {occupied: false},
  out: worker.out.concat(worker.wip.coin)
})

const hasTaskInProgress = (worker) => {
  return (worker.wip.occupied)
}

const continueTask = (state, workerName) => {
  let worker = state[workerName]
  let newWorker
  if (worker.wip.ticksRemaining > 1)
    newWorker = wait(worker)
  else if (worker.wip.ticksRemaining == 1)
    newWorker = flipCoin(worker)
  else
    newWorker = moveCoinToDone(worker)
  return {
    ...state,
    [workerName]: newWorker
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
  let toWorker = fromWorker.next
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
    return continueTask(state, workerName)
  else if (hasCompletedBatch(worker))
    return deliverCompletedBatch(state, workerName, nextWorkerName)
  else if (hasWorkReadyToStart(worker))
    return pickUpNextTask(state, workerName)
  else
    return state
}

const productionLine = (state=initialState(), action) => {
  switch (action.type) {
    case TICK:
      state = p2(state, 's4', 'customer')
      state = p2(state, 's3', 's4')
      state = p2(state, 's2', 's3')
      return process(state, 's1', 's2')
    default:
      return state
  }
}

export const coins = (worker) => ({
  todo: worker.todo,
  wip: (worker.wip.occupied) ? [worker.wip.coin] : [],
  out: worker.out
})

export const valueDelivered = (line) => {
  return line.s4.next.todo.length
}

export const workInProgress = (line) => {
  let c1 = coins(line.s1)
  let c2 = coins(line.s2)
  let c3 = coins(line.s3)
  let c4 = coins(line.s4)
  return c1.todo.length + c1.wip.length + c1.out.length +
         c2.todo.length + c2.wip.length + c2.out.length +
         c3.todo.length + c3.wip.length + c3.out.length +
         c4.todo.length + c4.wip.length + c4.out.length
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})

