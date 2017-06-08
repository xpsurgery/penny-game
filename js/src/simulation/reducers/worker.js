import {
  CONTINUE_TASK,
  DELIVER_BATCH,
  PICK_UP_NEXT_TASK,
  RECEIVE_NEW_BATCH
} from '../actionCreators'

const initialState = (config) => ({
  ...config,
  todo: [],
  wip: {occupied: false},
  out: []
})

export default (simulationName, name, config) => (state, action) => {
  if (state === undefined)
    return initialState(config)
  if (action.simulationName !== simulationName)
    return state
  if (action.workerName !== name)
    return state
  switch (action.type) {
    case CONTINUE_TASK:
      return state
    case DELIVER_BATCH:
      return state
    case PICK_UP_NEXT_TASK:
      return state
    case RECEIVE_NEW_BATCH:
      return {
        ...state,
        todo: Array(state.defaultBatchSize).fill('H')
      }

    default:
      return state
  }
}

