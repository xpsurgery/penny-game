import { combineReducers } from 'redux'
import { TICK } from './actionCreators'

const initialState = {
  s1: {todo: [], wip: [], out: []},
  s2: {todo: [], wip: [], out: []},
  s3: {todo: [], wip: [], out: []},
  s4: {todo: [], wip: [], out: []}
}

const productionLine = (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      if (state.s1.out.length == 0 && state.s1.wip.length == 0 && state.s1.todo.length == 0)
        return {
          ...state,
          s1: {
            ...state.s1,
            todo: ['H', 'H', 'H', 'H', 'H']
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
  return line.s1.todo.length + line.s1.wip.length + line.s1.out.length +
    line.s2.todo.length + line.s2.wip.length + line.s2.out.length +
    line.s3.todo.length + line.s3.wip.length + line.s3.out.length +
    line.s4.todo.length + line.s4.wip.length
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})

