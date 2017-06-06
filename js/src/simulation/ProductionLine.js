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

export default ({ simulation }) =>
  <div className='production-line group'>
    <Worker {...coins(simulation.line.s1)} name={simulation.line.s1.name} batchSize={simulation.line.s1.batchSize} />
    <Worker {...coins(simulation.line.s2)} name={simulation.line.s2.name} batchSize={simulation.line.s2.batchSize} />
    <Worker {...coins(simulation.line.s3)} name={simulation.line.s3.name} batchSize={simulation.line.s3.batchSize} />
    <Worker {...coins(simulation.line.s4)} name={simulation.line.s4.name} batchSize={simulation.line.s4.batchSize} />
    <Customer {...simulation.line.customer} />
    <Stats simulation={simulation} />
  </div>

