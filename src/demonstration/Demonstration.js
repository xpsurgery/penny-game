import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PennyGame from './penny-game/PennyGame'
import TrendChart from './graphs/TrendChart'

const fakeData = [
  {
    name: 'agile',
    data: [1,2,3]
  }, {
    name: 'waterfall',
    data: [4,3,2]
  }, {
    name: 'scrum',
    data: [1,4,5]
  }
]

const Demonstration = ({ waterfall, agile, scrum }) =>
  <div className='demonstration'>
    <div className='games'>
      <h2> "Waterfall" </h2>
      <PennyGame config={waterfall} />
      <h2> "Agile" </h2>
      <PennyGame config={agile} />
      <h2> "Scrum" </h2>
      <PennyGame config={scrum} />
    </div>
    <div className='graphs'>
      <TrendChart title='Cycle time' dataSeries={fakeData} />
      <TrendChart title='Value delivered' dataSeries={fakeData} />
      <TrendChart title='Work in process' dataSeries={fakeData} />
    </div>
  </div>

Demonstration.displayName = 'Demonstration'
Demonstration.propTypes = {
  waterfall: PropTypes.object.isRequired,
  agile:     PropTypes.object.isRequired,
  scrum:     PropTypes.object.isRequired,
}

const mapStateToProps = ({ demonstration }) => demonstration

export default connect(mapStateToProps)(Demonstration)

