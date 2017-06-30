import React from 'react'
import { connect } from 'react-redux'
import Controls from '../controls/Controls'
import Scenario from './Scenario'

const Simulation = ({ waterfall, agile, scrum }) =>
  <div className='demonstration'>
    <h1> Penny game demonstration </h1>
    <Controls />
    <Scenario simulation={waterfall} />
    <Scenario simulation={agile} />
    <Scenario simulation={scrum} />
    <p>
      Note that these simulations are based on single piece flow.
      Imagine how much worse the above would be if each worker had
      multiple tasks ongoing simultaneously!
    </p>
  </div>

const mapStateToProps = ({ simulation }) => simulation

export default connect(mapStateToProps)(Simulation)

