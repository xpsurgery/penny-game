import React from 'react'
import Worker from './Worker'
import Stats from './Stats'

export default () =>
  <div className='production-line'>
    <Worker />
    <Worker />
    <Worker />
    <Worker />
    <Stats />
  </div>

