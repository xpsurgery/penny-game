import React from 'react'
import CoinPile from './CoinPile'

const Basket = ({ name, coins }) =>
  <div className={`basket ${name}`}>
    <div className='name'> {name} </div>
    <CoinPile coins={coins} />
  </div>

export default ({ todo, wip, out, name }) =>
  <div className='worker group'>
    <div className='title'>
      {name}
    </div>
    <Basket name='Todo' coins={todo} />
    <Basket name='Doing'  coins={wip} />
    <Basket name='Done' coins={out} />
  </div>

