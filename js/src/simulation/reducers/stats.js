import { DELIVER_BATCH } from '../actionCreators'

const initialState = {}

export default (simulationName) => (state, action) => {
  if (state === undefined)
    return initialState

  if (!action.simulationName || action.simulationName !== simulationName)
    return state
  switch (action.type) {
    case DELIVER_BATCH:
    default:
      return state
  }
}

export const ticksToFirstValue = (line) => {
  return line.ticksToFirstValue
}

