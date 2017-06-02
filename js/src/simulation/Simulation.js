import React from 'react'
import { connect } from 'react-redux'
import Repeat from '../controls/Repeat'
import { tick } from '../controls/actionCreators'
import Buttons from '../controls/Buttons'
import ProductionLine from './ProductionLine'

const Simulation = ({ batchesOf20, batchesOf5, slowDev }) =>
  <div className='simulation'>
    <Repeat action={tick} seconds={1} />
    <h1> Penny game simulation </h1>
    <Buttons />
    <ProductionLine line={batchesOf20} />
    <ProductionLine line={batchesOf5} />
    <ProductionLine line={slowDev} />
    <p>
      Note that these simulations are based on single piece flow.
      Imagine how much worse the above would be if each worker had
      multiple tasks ongoing simultaneously!
    </p>
  </div>

const mapStateToProps = ({ simulation }) => simulation

export default connect(mapStateToProps)(Simulation)

