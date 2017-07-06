import React from 'react'
import CoinPile from './CoinPile'

export default ({ coins }) =>
  <div className='customer group'>
    <div className='title'> Accepted </div>
    <CoinPile coins={coins} />
  </div>
