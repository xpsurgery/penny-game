import React from 'react'
import CoinPile from './CoinPile'

const Basket = ({ label, coins }) =>
  <div className={`basket ${label}`}>
    <div className='label'> {label} </div>
    <CoinPile coins={coins} />
  </div>

export default ({ todo, wip, out, name }) =>
  <div className='worker group'>
    <div className='title'>
      {name}
    </div>
    <Basket label='Todo' coins={todo} />
    <Basket label='Doing'  coins={wip} />
    <Basket label='Done' coins={out} />
  </div>

