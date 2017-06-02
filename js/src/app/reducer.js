import { combineReducers } from 'redux'
import simulation from '../simulation/reducer'
import controls from '../controls/reducer'

export default combineReducers({
  controls,
  simulation
})
