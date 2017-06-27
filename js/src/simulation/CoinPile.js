import React from 'react'

const Heads = () =>
  <svg className='heads'>
    <circle cx='6' cy='6' r='6' />
  </svg>

const Tails = () =>
  <svg className='tails'>
    <circle cx='6' cy='6' r='6' />
  </svg>

export default ({ coins }) =>
  <div className='coins'>
    {
      coins.map((coin, i) => (
        <div className='coin' key={i}>
          {
            (coin === 'H') ? <Heads /> : <Tails />
          }
        </div>
      ))
    }
  </div>

