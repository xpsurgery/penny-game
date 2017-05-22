import React from 'react'
import { connect } from 'react-redux'
import Repeat from './Repeat'
import ProductionLine from './ProductionLine'
import { tick } from './actionCreators'

const Simulation = ({ batchesOf20, batchesOf5, slowDev }) =>
  <div className='simulation'>
    <Repeat action={tick} seconds={1} enabled={true} />
    <h1> Penny game simulation </h1>
    <ProductionLine line={batchesOf20} />
    <ProductionLine line={batchesOf5} />
    <ProductionLine line={slowDev} />
  </div>

const mapStateToProps = ({ simulation }) => ({
  batchesOf20: simulation.batchesOf20,
  batchesOf5: simulation.batchesOf5,
  slowDev: simulation.slowDev
})

export default connect(mapStateToProps)(Simulation)

