import { combineReducers } from 'redux'
import cycleTimeTrend from './cycleTimeTrend'

export default (name) => combineReducers({
  cycleTimeTrend: cycleTimeTrend(name)
})

export const cycleTimeHistory = (state) => {
  return state.cycleTimeTrend.cycleTimes
}

export const valueDeliveredHistory = (state) => {
  return [
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes
  ]
}

export const wipHistory = (state) => {
  return [
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes
  ]
}

