import { combineReducers } from 'redux'
import demonstration from '../demonstration/reducer'
import controls from '../controls/reducer'

export default combineReducers({
  controls,
  demonstration
})

