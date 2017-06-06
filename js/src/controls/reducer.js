import { ENABLE_REPEATER, DISABLE_REPEATER } from './actionCreators'

const initialState = {
  playEnabled: false,
  millisecondsPerTick: 333
}

export default (state=initialState, action) => {
  switch (action.type) {

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

