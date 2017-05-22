import { combineReducers } from 'redux'
import { TICK } from './actionCreators'

const initialState = {
  s1: {in: [], wip: [], out: []},
  s2: {in: [], wip: [], out: []},
  s3: {in: [], wip: [], out: []},
  s4: {in: [], wip: [], out: []}
}

const productionLine = (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      if (state.s1.out.length == 0 && state.s1.wip.length == 0 && state.s1.in.length == 0)
        return {
          ...state,
          s1: {
            ...state.s1,
            in: ['H', 'H', 'H', 'H', 'H']
          }
        }
      else
        return state
    default:
      return state
  }
}

export const valueDelivered = (line) => {
  return line.s4.out.length
}

export const workInProgress = (line) => {
  return line.s1.in.length + line.s1.wip.length + line.s1.out.length +
    line.s2.in.length + line.s2.wip.length + line.s2.out.length +
    line.s3.in.length + line.s3.wip.length + line.s3.out.length +
    line.s4.in.length + line.s4.wip.length
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})

