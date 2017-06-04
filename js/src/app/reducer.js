import { combineReducers } from 'redux'
import simulation from '../simulation/reducers'
import controls from '../controls/reducer'

export default combineReducers({
  controls,
  simulation
})
