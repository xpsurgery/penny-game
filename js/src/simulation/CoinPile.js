import React from 'react'

const Heads = () =>
  <svg viewPort='0 0 200 200'>
    <circle cx='6' cy='6' r='6' fill='#daa520' />
  </svg>

const Tails = () =>
  <svg viewPort='0 0 200 200'>
    <circle cx='6' cy='6' r='6' fill='silver' />
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

