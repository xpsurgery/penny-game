import {
  RECEIVE_BATCH
} from '../actionCreators'

const initialState = {
  coins: []
}

export default (simulationName, name) => (state, action) => {
  if (state === undefined)
    return initialState
  if (action.simulationName !== simulationName)
    return state
  if (action.workerName !== name)
    return state

  switch (action.type) {

    case RECEIVE_BATCH:
      return {
        ...state,
        coins: state.coins.concat(action.batch)
      }

    default:
      return state
  }
}

