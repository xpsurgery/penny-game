import React from 'react'
import PropTypes from 'prop-types'
import KanbanColumn from '../KanbanColumn'

const Customer = ({ coins }) =>
  <div className='customer group'>
    <div className='title'> Accepted </div>
    <KanbanColumn name='&nbsp;' coins={coins} />
  </div>

Customer.displayName = 'Customer'
Customer.propTypes = {
  coins: PropTypes.array.isRequired
}

export default Customer

