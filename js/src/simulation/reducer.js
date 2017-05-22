import { combineReducers } from 'redux'
import { TICK } from './actionCreators'

const initialState = {
  s1: {todo: [], wip: [], out: []},
  s2: {todo: [], wip: [], out: []},
  s3: {todo: [], wip: [], out: []},
  s4: {todo: [], wip: [], out: []}
}

const moveCoinIntoWip = (state, basketName) => {
  let basket = state[basketName]
  let coin = basket.todo.slice(0, 1)
  return {
    ...state,
    [basketName]: {
      todo: basket.todo.slice(1),
      wip: basket.wip.concat(coin),
      out: basket.out
    }
  }
}

const flipCoin = (state, basketName) => {
  let basket = state[basketName]
  let coin = basket.wip[0]
  coin = (coin == 'H') ? 'T' : 'H'
  return {
    ...state,
    [basketName]: {
      todo: basket.todo,
      wip: [coin],
      out: basket.out
    }
  }
}

const moveCoinToDone = (state, basketName) => {
  let basket = state[basketName]
  return {
    ...state,
    [basketName]: {
      todo: basket.todo,
      wip: [],
      out: basket.out.concat(basket.wip)
    }
  }
}

const newBatchFromCustomer = (state) => ({
  ...state,
  s1: {
    ...state.s1,
    todo: ['H', 'H', 'H', 'H', 'H']
  }
})

const productionLine = (state=initialState, action) => {
  switch (action.type) {
    case TICK:
      if (state.s1.out.length == 0)
        if (state.s1.wip.length == 0)
          if (state.s1.todo.length == 0)
            return newBatchFromCustomer(state)
          else
            return moveCoinIntoWip(state, 's1')
        else
          if (state.s1.wip[0] == 'H')
            return flipCoin(state, 's1')
          else
            return moveCoinToDone(state, 's1')
      else
        if (state.s1.wip.length == 0)
          return moveCoinIntoWip(state, 's1')
        else
          if (state.s1.wip[0] == 'H')
            return flipCoin(state, 's1')
          else
            return moveCoinToDone(state, 's1')
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

