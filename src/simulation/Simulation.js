import React from 'react'
import { connect } from 'react-redux'
import Controls from '../controls/Controls'
import Scenario from './Scenario'

const Simulation = ({ waterfall, agile, scrum }) =>
  <div className='demonstration'>
    <Controls />
    <h2> "Waterfall" </h2>
    <Scenario simulation={waterfall} />
    <h2> "Agile" </h2>
    <Scenario simulation={agile} />
    <h2> "Scrum" </h2>
    <Scenario simulation={scrum} />
    <p>
      Note that these simulations are based on single piece flow.
      Imagine how much worse the above would be if each worker had
      multiple tasks ongoing simultaneously!
    </p>
    <p>
      Note also that we assume no rework arises from testing.
      This would slow the developer tasks, and that is assumed
      accounted for in the "Dev task size" configuration variable.
    </p>
  </div>

const mapStateToProps = ({ simulation }) => simulation

export default connect(mapStateToProps)(Simulation)

