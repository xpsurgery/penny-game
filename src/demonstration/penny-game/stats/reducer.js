import { TICK } from '../../../controls/actionCreators'
import { RECEIVE_BATCH } from '../actionCreators'

const initialState = {
  ticks: 0,
  cycleTimes: []
}

const recordCycleTime = (state, action) => {
  let time = state.ticks - Math.max.apply(null, action.batch.map(coin => coin.createdAt))
  return {
    ...state,
    cycleTimes: state.cycleTimes.concat([time])
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
      return recordCycleTime(state, action)

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

export const cycleTimeHistory = (state) => {
  return state.cycleTimes
}

export const valueDeliveredHistory = (state) => {
  return [
    state.cycleTime,
    state.cycleTime,
    state.cycleTime
  ]
}

export const wipHistory = (state) => {
  return [
    state.cycleTime,
    state.cycleTime,
    state.cycleTime
  ]
}

