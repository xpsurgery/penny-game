import { TICK, ENABLE_REPEATER, DISABLE_REPEATER } from './actionCreators'

const initialState = {
  playEnabled: false,
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
        playEnabled: true
      }

    case DISABLE_REPEATER:
      return {
        ...state,
        playEnabled: false
      }

    default:
      return state
  }
}

