import {
  CONTINUE_TASK,
  DELIVER_BATCH,
  PICK_UP_NEXT_TASK,
  RECEIVE_BATCH,
  NEW_BATCH_FROM_CUSTOMER
} from '../actionCreators'

const initialState = (config) => ({
  ...config,
  currentBatchSize: config.initialBatchSize,
  todo: [],
  wip: {occupied: false},
  out: []
})

const flipTheCoin = (coin) => ({
  ...coin,
  state: (coin.state == 'H') ? 'T' : 'H'
})

const flipCoin = (state) => ({
  ...state,
  wip: {
    ...state.wip,
    ticksRemaining: 0,
    coin: flipTheCoin(state.wip.coin)
  }
})

const wait = (state) => ({
  ...state,
  wip: {
    ...state.wip,
    ticksRemaining: state.wip.ticksRemaining - 1
  }
})

const moveCoinToDone = (state) => ({
  ...state,
  wip: {occupied: false},
  out: state.out.concat(state.wip.coin)
})

const continueTask = (state) => {
  if (state.wip.ticksRemaining > 1)
    return wait(state)
  else if (state.wip.ticksRemaining === 1)
    return flipCoin(state)
  else
    return moveCoinToDone(state)
}

export default (simulationName, name, config) => (state, action) => {
  if (state === undefined)
    return initialState(config)
  if (action.simulationName !== simulationName)
    return state
  if (action.workerName !== name)
    return state

  switch (action.type) {
    case NEW_BATCH_FROM_CUSTOMER:
      return {
        ...state,
        todo: Array(state.initialBatchSize).fill({state: 'H' })
      }

    case RECEIVE_BATCH:
      return {
        ...state,
        todo: action.batch
      }

    case PICK_UP_NEXT_TASK:
      return {
        ...state,
        todo: state.todo.slice(1),
        wip: {
          occupied:       true,
          ticksRemaining: state.taskTicks,
          coin:           state.todo.slice(0, 1)[0]
        }
      }

    case CONTINUE_TASK:
      return continueTask(state)

    case DELIVER_BATCH:
      return {
        ...state,
        out: state.out.slice(0, state.out.length - action.batch.length)
      }

    default:
      return state
  }
}

export const hasTaskInProgress = (worker) => {
  return (worker.wip.occupied)
}

export const hasBatchReady = (worker) => {
  return (worker.out.length >= worker.currentBatchSize)
}

export const isReadyForNextBatch = (worker, batch) => {
  return (
    worker.todo.length === 0 &&
    worker.wip.occupied === false &&
    batch.length >= worker.currentBatchSize
  )
}

export const hasWorkReadyToStart = (worker) => {
  return (worker.todo.length > 0)
}

export const coins = (worker) => ({
  todo: worker.todo.map(coin => coin.state),
  wip: (worker.wip.occupied) ? [worker.wip.coin.state] : [],
  out: worker.out.map(coin => coin.state)
})

