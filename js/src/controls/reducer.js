import { ENABLE_REPEATER, DISABLE_REPEATER } from './actionCreators'

const initialState = {
  enabled: false
}

export default (state=initialState, action) => {
  switch (action.type) {

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

