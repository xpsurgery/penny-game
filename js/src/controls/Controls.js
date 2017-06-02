import React from 'react'
import Repeat from './Repeat'
import { tick } from './actionCreators'
import Buttons from './Buttons'

export default () =>
  <div className='controls'>
    <Repeat action={tick} seconds={1} />
    <Buttons />
  </div>

