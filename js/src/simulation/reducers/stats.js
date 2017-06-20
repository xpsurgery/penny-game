import { TICK } from '../../controls/actionCreators'
import { RECEIVE_BATCH } from '../actionCreators'

const initialState = {
  ticks: 0
}

const recordFirstValue = (state, action) => {
  if (state.ticksToFirstValue)
    return state
  if (action.workerName !== 'customer')
    return state
  return {
    ...state,
    ticksToFirstValue: state.ticks
  }
}

export default (simulationName) => (state=initialState, action) => {
  if (action.type === TICK)
    return {
      ...state,
      ticks: state.ticks + 1
    }
  if (action.simulationName !== simulationName)
    return state

  switch (action.type) {
    case RECEIVE_BATCH:
      return recordFirstValue(state, action)

    default:
      return state
  }
}

export const ticksToFirstValue = (state) => {
  return state.ticksToFirstValue
}

