import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Controls from '../controls/Controls'
import Scenario from '../simulation/Scenario'

const Demonstration = ({ waterfall, agile, scrum }) =>
  <div className='demonstration'>
    <Controls />
    <h2> "Waterfall" </h2>
    <Scenario simulation={waterfall} />
    <h2> "Agile" </h2>
    <Scenario simulation={agile} />
    <h2> "Scrum" </h2>
    <Scenario simulation={scrum} />
  </div>

Demonstration.displayName = 'Demonstration'
Demonstration.propTypes = {
  waterfall: PropTypes.object.isRequired,
  agile:     PropTypes.object.isRequired,
  scrum:     PropTypes.object.isRequired,
}

const mapStateToProps = ({ demonstration }) => demonstration

export default connect(mapStateToProps)(Demonstration)

