import React from 'react'

const Basket = ({ label, coins }) =>
  <div className='basket'>
    <div className='label'> {label} </div>
    <div className='coins'> {coins.length} </div>
  </div>

export default ({ todo, wip, out }) =>
  <div className='worker group'>
    <Basket label='Todo' coins={todo} />
    <Basket label='WIP'  coins={wip} />
    <Basket label='Done' coins={out} />
  </div>

