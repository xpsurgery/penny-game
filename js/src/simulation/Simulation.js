import React from 'react'
import Repeat from './Repeat'
import ProductionLine from './ProductionLine'
import { tick } from './actionCreators'

export default () =>
  <div className='simulation'>
    <Repeat action={tick} seconds={1} enabled={true} />
    <h1> Penny game simulation </h1>
    <ProductionLine line={'batchesOf20'} />
    <ProductionLine line={'batchesOf5'} />
    <ProductionLine line={'slowDev'} />
  </div>

