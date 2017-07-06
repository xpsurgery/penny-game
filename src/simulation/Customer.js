import React from 'react'
import PropTypes from 'prop-types'
import CoinPile from './CoinPile'

const Customer = ({ coins }) =>
  <div className='customer group'>
    <div className='title'> Accepted </div>
    <CoinPile coins={coins} />
  </div>

Customer.displayName = 'Customer'
Customer.propTypes = {
  coins: PropTypes.array.isRequired
}

export default Customer

