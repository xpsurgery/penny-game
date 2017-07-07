import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PennyGame from '../simulation/PennyGame'

const Demonstration = ({ waterfall, agile, scrum }) =>
  <div className='demonstration'>
    <h2> "Waterfall" </h2>
    <PennyGame config={waterfall} />
    <h2> "Agile" </h2>
    <PennyGame config={agile} />
    <h2> "Scrum" </h2>
    <PennyGame config={scrum} />
  </div>

Demonstration.displayName = 'Demonstration'
Demonstration.propTypes = {
  waterfall: PropTypes.object.isRequired,
  agile:     PropTypes.object.isRequired,
  scrum:     PropTypes.object.isRequired,
}

const mapStateToProps = ({ demonstration }) => demonstration

export default connect(mapStateToProps)(Demonstration)

