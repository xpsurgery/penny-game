import { combineReducers } from 'redux'
import cycleTimeTrend from './cycleTimeTrend'
import valueTrend from './valueTrend'

export default (name) => combineReducers({
  cycleTimeTrend: cycleTimeTrend(name),
  valueTrend: valueTrend(name)
})

export const cycleTimeHistory = (state) => {
  return state.cycleTimeTrend.cycleTimes
}

export const valueDeliveredHistory = (state) => {
  return state.valueTrend
}

export const wipHistory = (state) => {
  return [
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes,
    state.cycleTimeTrend.cycleTimes
  ]
}

