import { TICK, ENABLE_REPEATER, DISABLE_REPEATER } from './actionCreators'

const initialState = {
  ticksSoFar: 0,
  enabled: false
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
        enabled: true
      }

    case DISABLE_REPEATER:
      return {
        ...state,
        enabled: false
      }

    default:
      return state
  }
}

