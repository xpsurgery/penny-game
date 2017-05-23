import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import { coins } from './reducer'

export default ({ line }) =>
  <div className='production-line group'>
    <Worker {...coins(line.s1)} />
    <Worker {...coins(line.s2)} />
    <Worker {...coins(line.s3)} />
    <Worker {...coins(line.s4)} />
    <Stats line={line} />
  </div>

