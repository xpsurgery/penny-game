import { TICK } from '../../controls/actionCreators'
import { RECEIVE_BATCH } from '../actionCreators'

const initialState = {
  ticks: 0
}

const recordCycleTime = (state, action) => {
  return {
    ...state,
    cycleTime: state.ticks - action.batch[0].createdAt
  }
}

const recordFirstValue = (state) => {
  if (state.ticksToFirstValue)
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
      if (action.workerName !== 'customer')
        return state
      return recordFirstValue(recordCycleTime(state, action))

    default:
      return state
  }
}

export const cycleTime = (state) => {
  return state.cycleTime
}

export const ticksToFirstValue = (state) => {
  return state.ticksToFirstValue
}

