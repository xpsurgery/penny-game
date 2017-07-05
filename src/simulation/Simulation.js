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
  </div>

const mapStateToProps = ({ simulation }) => simulation

export default connect(mapStateToProps)(Simulation)

