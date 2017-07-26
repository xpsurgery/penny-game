import { TICK } from '../../controls/actionCreators'
import { RECEIVE_BATCH } from '../penny-game/actionCreators'

const initialState = [0]

const extendHistory = (state) => {
  let last = state[state.length - 1]
  return state.concat([last])
}

const recordValue = (state, action) => {
  let previous = state.slice(0, -1)
  let last = state[state.length - 1]
  return previous.concat([last + action.batch.length])
}

export default (simulationName) => (state=initialState, action) => {
  switch (action.type) {

    case TICK:
      return extendHistory(state)

    case RECEIVE_BATCH:
      if (action.simulationName !== simulationName)
        return state
      if (action.workerName !== 'customer')
        return state
      return recordValue(state, action)

    default:
      return state
  }
}

