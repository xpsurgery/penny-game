import { TICK, ENABLE_REPEATER, DISABLE_REPEATER, RESET_ALL } from './actionCreators'

const initialState = {
  running: false,
  millisecondsPerTick: 333,
  ticksSoFar: 0
}

export default (state=initialState, action) => {
  switch (action.type) {

    case TICK:
      return {
        ...state,
        ticksSoFar: state.ticksSoFar + 1
      }

    case ENABLE_REPEATER:
      return {
        ...state,
        running: true
      }

    case DISABLE_REPEATER:
      return {
        ...state,
        running: false
      }

    case RESET_ALL:
      return initialState

    default:
      return state
  }
}

