import React from 'react'

export default ({ coins }) =>
  <div className='coins'>
    {
      coins.map((coin, i) => (
        <div className='coin' key={i}>{coin}</div>
      ))
    }
  </div>

