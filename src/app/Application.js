import React from 'react'
import Controls from '../controls/Controls'
import Demonstration from '../demonstration/Demonstration'

const Application = () =>
  <div className='application'>
    <Controls />
    <Demonstration />
  </div>

Application.displayName = 'Application'

export default Application

