import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import CoinPile from './CoinPile'
import { coins } from './reducer'

const Customer = ({ todo }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <CoinPile coins={todo} />
  </div>

export default ({ line }) =>
  <div className='production-line group'>
    <Worker {...coins(line.s1)} name={line.s1.name} />
    <Worker {...coins(line.s2)} name={line.s2.name} />
    <Worker {...coins(line.s3)} name={line.s3.name} />
    <Worker {...coins(line.s4)} name={line.s4.name} />
    <Customer {...line.customer} />
    <Stats line={line} />
  </div>

