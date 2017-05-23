import { combineReducers } from 'redux'
import simulation from '../simulation/reducer'
import repeat from '../repeat/reducer'

export default combineReducers({
  repeat,
  simulation
})
