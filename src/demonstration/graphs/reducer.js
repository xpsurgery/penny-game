import { TICK } from '../../controls/actionCreators'
import { RECEIVE_BATCH } from '../penny-game/actionCreators'

const initialState = {
  ticks: 0,
  cycleTimes: [0]
}

const extendHistory = (times) => {
  let last = times[times.length - 1]
  return times.concat([last])
}

const recordCycleTime = (state, action) => {
  let time = state.ticks - Math.max.apply(null, action.batch.map(coin => coin.createdAt))
  let previous = state.cycleTimes.slice(0, -1)
  return {
    ...state,
    cycleTimes: previous.concat([time])
  }
}

export default (simulationName) => (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        ticks: state.ticks + 1,
        cycleTimes: extendHistory(state.cycleTimes)
      }

    case RECEIVE_BATCH:
      if (action.simulationName !== simulationName)
        return state
      if (action.workerName !== 'customer')
        return state
      return recordCycleTime(state, action)

    default:
      return state
  }
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

