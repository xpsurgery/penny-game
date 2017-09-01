import React from 'react'
import PropTypes from 'prop-types'
import CoinPile from '../CoinPile'

const KanbanColumn = ({ name, coins }) =>
  <div className={`kanban-column ${name}`}>
    <div className='name'> {name} </div>
    <CoinPile coins={coins} />
  </div>

KanbanColumn.displayName = 'KanbanColumn'
KanbanColumn.propTypes = {
  name:  PropTypes.string.isRequired,
  coins: PropTypes.array.isRequired
}

export default KanbanColumn

