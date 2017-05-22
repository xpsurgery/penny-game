import React from 'react'
import Worker from './Worker'
import Stats from './Stats'

export default ({ line }) =>
  <div className='production-line group'>
    <Worker line={line} />
    <Worker line={line} />
    <Worker line={line} />
    <Worker line={line} />
    <Stats line={line} />
  </div>

