import { TICK } from './actionCreators'

const initialState = {
  ticksSoFar: 0
}

export default (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      return {
        ...state,
        ticksSoFar: state.ticksSoFar + 1
      }
    default:
      return state
  }
}

