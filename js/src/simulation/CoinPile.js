import React from 'react'

const Heads = ({ type }) =>
  <svg className={type}>
    <circle cx='6' cy='6' r='6' />
  </svg>

export default ({ coins }) =>
  <div className='coins'>
    {
      coins.map((coin, i) => (
        <div className='coin' key={i}>
          {
            <Heads type={coin} />
          }
        </div>
      ))
    }
  </div>

