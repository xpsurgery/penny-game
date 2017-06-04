import React from 'react'
import Worker from './Worker'
import Stats from './Stats'
import CoinPile from './CoinPile'
import { coins } from './reducers/productionLine'

const Customer = ({ todo }) =>
  <div className='customer group'>
    <div className='label'> Accepted </div>
    <CoinPile coins={todo} />
  </div>

export default ({ line }) =>
  <div className='production-line group'>
    <Worker {...coins(line.s1)} name={line.s1.name} batchSize={line.s1.batchSize} />
    <Worker {...coins(line.s2)} name={line.s2.name} batchSize={line.s2.batchSize} />
    <Worker {...coins(line.s3)} name={line.s3.name} batchSize={line.s3.batchSize} />
    <Worker {...coins(line.s4)} name={line.s4.name} batchSize={line.s4.batchSize} />
    <Customer {...line.customer} />
    <Stats line={line} />
  </div>

