import React from 'react'
import PropTypes from 'prop-types'
import KanbanColumn from './KanbanColumn'
import Parameter from './Parameter'

const Worker = ({ todo, wip, out, name, batchSize, batchIncrement, taskSize }) =>
  <div className='worker group'>
    <div className='kanban group'>
      <div className='title'>
        {name}
      </div>
      <KanbanColumn name='Todo' coins={todo} />
      <KanbanColumn name='Doing' coins={wip} />
      <KanbanColumn name='Done' coins={out} />
    </div>
    <div className='worker-config'>
      <Parameter label='Batch size' value={batchSize} />
      <Parameter label='Batch increment' value={batchIncrement} />
      <Parameter label='Task size' value={taskSize} />
    </div>
  </div>

Worker.displayName = 'Worker'
Worker.propTypes = {
  name: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  wip:  PropTypes.array.isRequired,
  out:  PropTypes.array.isRequired,
  batchSize:  PropTypes.number.isRequired,
  batchIncrement:  PropTypes.number.isRequired,
  taskSize:  PropTypes.number.isRequired,
}

export default Worker

