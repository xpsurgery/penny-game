import { combineReducers } from 'redux'

const productionLine = (state={}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  batchesOf20: productionLine,
  batchesOf5:  productionLine,
  slowDev:     productionLine,
})
