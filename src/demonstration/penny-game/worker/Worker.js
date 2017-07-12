import React from 'react'
import PropTypes from 'prop-types'
import Basket from '../Basket'

const Worker = ({ todo, wip, out, name }) =>
  <div className='worker group'>
    <div className='title'>
      {name}
    </div>
    <Basket name='Todo' coins={todo} />
    <Basket name='Doing' coins={wip} />
    <Basket name='Done' coins={out} />
  </div>

Worker.displayName = 'Worker'
Worker.propTypes = {
  name: PropTypes.string.isRequired,
  todo: PropTypes.array.isRequired,
  wip:  PropTypes.array.isRequired,
  out:  PropTypes.array.isRequired,
}

export default Worker

