import { RECEIVE_BATCH } from '../actionCreators'
import { RESET_ALL } from '../../controls/actionCreators'

const initialState = {
  currentBatchSize: 0,
  coins: []
}

export default (simulationName, name) => (state, action) => {
  if (state === undefined)
    return initialState

  if (action.type === RESET_ALL)
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

