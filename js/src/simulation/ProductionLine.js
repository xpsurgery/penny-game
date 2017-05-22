import React from 'react'
import Worker from './Worker'
import Stats from './Stats'

export default ({ line }) =>
  <div className='production-line group'>
    <Worker {...line.s1} />
    <Worker {...line.s2} />
    <Worker {...line.s3} />
    <Worker {...line.s4} />
    <Stats line={line} />
  </div>

