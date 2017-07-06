import React from 'react'
import PropTypes from 'prop-types'
import CoinPile from './CoinPile'

const Basket = ({ name, coins }) =>
  <div className={`basket ${name}`}>
    <div className='name'> {name} </div>
    <CoinPile coins={coins} />
  </div>

Basket.displayName = 'Basket'
Basket.propTypes = {
  name:  PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired
}

export default Basket

