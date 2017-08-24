import React from 'react'
import PropTypes from 'prop-types'
import KanbanColumn from '../KanbanColumn'

const Worker = ({ todo, wip, out, name, batchSize }) =>
  <div className='worker group'>
    <div className='kanban'>
      <div className='title'>
        {name}
      </div>
      <KanbanColumn name='Todo' coins={todo} />
      <KanbanColumn name='Doing' coins={wip} />
      <KanbanColumn name='Done' coins={out} />
    </div>
    <div className='worker-config'>
      Batch size: {batchSize}
    </div>
  </div>

Worker.displayName = 'Worker'
Worker.propTypes = {
  name: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  wip:  PropTypes.array.isRequired,
  out:  PropTypes.array.isRequired,
  batchSize:  PropTypes.number.isRequired,
}

export default Worker

