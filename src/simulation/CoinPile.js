import React from 'react'
import PropTypes from 'prop-types'

const CoinPile = ({ coins }) =>
  <div className='coins'>
    {
      coins.map((coin, i) => (
        <div className='coin' key={i}>
          <svg viewBox='0 0 12 12' className={coin}>
            <circle cx='6' cy='6' r='6' />
          </svg>
        </div>
      ))
    }
  </div>

CoinPile.displayName = 'CoinPile'
CoinPile.propTypes = {
  coins: PropTypes.array.isRequired
}

export default CoinPile

