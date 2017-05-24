import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import { coins } from './reducer'

const Customer = ({ todo }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <div className='coins'> {todo} </div>
  </div>

export default ({ line }) =>
  <div className='production-line group'>
    <Worker {...coins(line.s1)} />
    <Worker {...coins(line.s2)} />
    <Worker {...coins(line.s3)} />
    <Worker {...coins(line.s4)} />
    <Customer {...line.customer} />
    <Stats line={line} />
  </div>

