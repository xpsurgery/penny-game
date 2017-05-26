import React from 'react'
import CoinPile from './CoinPile'

const Basket = ({ label, coins }) =>
  <div className={`basket ${label}`}>
    <div className='label'> {label} </div>
    <CoinPile coins={coins} />
  </div>

export default ({ todo, wip, out, name, batchSize }) =>
  <div className='worker group'>
    <div className='title'>
      {name}
      <span>{batchSize}</span>
    </div>
    <Basket label='Todo' coins={todo} />
    <Basket label='WIP'  coins={wip} />
    <Basket label='Done' coins={out} />
  </div>

