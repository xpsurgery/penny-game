import { combineReducers } from 'redux'
import { TICK } from '../repeat/actionCreators'

const initialState = (config) => {
  let customer = {
    acceptInputAnyTime: true,
    todo: []
  }
  let s4 = {
    name: 'Testing',
    batchSize: config.defaultBatchSize,
    batchSizeIncrement: 0,
    batchSizeFromCustomer: 0,
    acceptInputAnyTime: false,
    todo: [],
    wip: {occupied: false},
    out: []
  }
  let s3 = {
    name: 'Development',
    batchSize: config.initialDeveloperBatch,
    batchSizeIncrement: config.batchSizeIncrement,
    batchSizeFromCustomer: 0,
    acceptInputAnyTime: false,
    todo: [],
    wip: {occupied: false},
    out: []
  }
  let s2 = {
    name: 'UX',
    batchSize: config.defaultBatchSize,
    batchSizeIncrement: 0,
    batchSizeFromCustomer: 0,
    acceptInputAnyTime: false,
    todo: [],
    wip: {occupied: false},
    out: []
  }
  let s1 = {
    name: 'Analysis',
    batchSize: config.defaultBatchSize,
    batchSizeIncrement: 0,
    batchSizeFromCustomer: config.defaultBatchSize,
    acceptInputAnyTime: false,
    todo: [],
    wip: {occupied: false},
    out: []
  }
  return { s1, s2, s3, s4, customer }
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

const hasWorkReadyToStart = (worker) => {
  return (worker.todo.length > 0)
}

const newBatchFromCustomer = (state, workerName) => {
  let worker = state[workerName]
  return {
    ...state,
    [workerName]: {
      ...worker,
      todo: Array(worker.batchSizeFromCustomer).fill('H')
    }
  }
}

const canDeliverBatch = (worker, nextWorker) => {
  let nextIsReady = (nextWorker.acceptInputAnyTime ||  nextWorker.todo.length === 0)
  return (worker.out.length >= worker.batchSize && nextIsReady)
}

const deliverCompletedBatch = (state, fromWorkerName, toWorkerName) => {
  let fromWorker = state[fromWorkerName]
  let toWorker = state[toWorkerName]
  return {
    ...state,
    [fromWorkerName]: {
      ...fromWorker,
      out: [],
      batchSize: fromWorker.batchSize + fromWorker.batchSizeIncrement
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
  else if (canDeliverBatch(worker, state[nextWorkerName]))
    return deliverCompletedBatch(state, workerName, nextWorkerName)
  else if (hasWorkReadyToStart(worker))
    return pickUpNextTask(state, workerName)
  else
    return newBatchFromCustomer(state, workerName)
}

export const productionLine = (config) => (state, action) => {
  if (state === undefined)
    return initialState(config)
  switch (action.type) {
    case TICK:
      state = process(state, 's4', 'customer')
      state = process(state, 's3', 's4')
      state = process(state, 's2', 's3')
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
  return line.customer.todo.length
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
  batchesOf20: productionLine({
    defaultBatchSize: 20,
    initialDeveloperBatch: 20,
    batchSizeIncrement: 5
  }),
  batchesOf5:  productionLine({
    defaultBatchSize: 5,
    initialDeveloperBatch: 5,
    batchSizeIncrement: 0
  }),
  slowDev:     productionLine({
    defaultBatchSize: 5,
    initialDeveloperBatch: 10,
    batchSizeIncrement: 5
  }),
})

