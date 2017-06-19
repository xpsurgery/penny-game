import React from 'react'
import { connect } from 'react-redux'
import Controls from '../controls/Controls'
import ProductionLine from './ProductionLine'

const Simulation = ({ waterfall, agile, scrum }) =>
  <div className='simulation'>
    <h1> Penny game simulation </h1>
    <Controls />
    <ProductionLine simulation={waterfall} />
    <ProductionLine simulation={agile} />
    <ProductionLine simulation={scrum} />
    <p>
      Note that these simulations are based on single piece flow.
      Imagine how much worse the above would be if each worker had
      multiple tasks ongoing simultaneously!
    </p>
  </div>

const mapStateToProps = ({ simulation }) => simulation

export default connect(mapStateToProps)(Simulation)

