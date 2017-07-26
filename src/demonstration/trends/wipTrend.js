import { TICK } from '../../controls/actionCreators'
import {
  NEW_BATCH_FROM_CUSTOMER,
  RECEIVE_BATCH
} from '../penny-game/actionCreators'

const initialState = [0]

const extendHistory = (state) => {
  let last = state[state.length - 1]
  return state.concat([last])
}

const increaseWip = (state, amount) => {
  let previous = state.slice(0, -1)
  let last = state[state.length - 1]
  return previous.concat([last + amount])
}

const reduceWip = (state, amount) => {
  let previous = state.slice(0, -1)
  let last = state[state.length - 1]
  return previous.concat([last - amount])
}

export default (simulationName) => (state=initialState, action) => {
  switch (action.type) {

    case TICK:
      return extendHistory(state)

    case NEW_BATCH_FROM_CUSTOMER:
      if (action.simulationName !== simulationName)
        return state
      return increaseWip(state, action.batch.length)

    case RECEIVE_BATCH:
      if (action.simulationName !== simulationName)
        return state
      if (action.workerName !== 'customer')
        return state
      return reduceWip(state, action.batch.length)

    default:
      return state
  }
}

