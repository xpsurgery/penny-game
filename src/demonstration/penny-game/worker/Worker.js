import React from 'react'
import PropTypes from 'prop-types'
import KanbanColumn from '../KanbanColumn'

const Worker = ({ todo, wip, out, name }) =>
  <div className='worker group'>
    <div className='title'>
      {name}
    </div>
    <KanbanColumn name='Todo' coins={todo} />
    <KanbanColumn name='Doing' coins={wip} />
    <KanbanColumn name='Done' coins={out} />
  </div>

Worker.displayName = 'Worker'
Worker.propTypes = {
  name: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  wip:  PropTypes.array.isRequired,
  out:  PropTypes.array.isRequired,
}

export default Worker

