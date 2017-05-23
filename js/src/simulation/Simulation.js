import React from 'react'
import { connect } from 'react-redux'
import Repeat from '../repeat/Repeat'
import { tick } from '../repeat/actionCreators'
import ProductionLine from './ProductionLine'
import { coins } from './reducer'

const Simulation = ({ batchesOf20, batchesOf5, slowDev }) =>
  <div className='simulation'>
    <Repeat action={tick} seconds={1} until={240} enabled={true} />
    <h1> Penny game simulation </h1>
    <ProductionLine line={batchesOf20} />
    <ProductionLine line={batchesOf5} />
    <ProductionLine line={slowDev} />
    <p>
      Note that these simulations are based on single piece flow.
      Imagine how much worse the above would be if each worker had
      multiple tasks ongoing simultaneously!
    </p>
  </div>

const mapStateToProps = ({ simulation }) => ({
  batchesOf20: {
    s1: coins(simulation.batchesOf20.s1),
    s2: coins(simulation.batchesOf20.s2),
    s3: coins(simulation.batchesOf20.s3),
    s4: coins(simulation.batchesOf20.s4)
  },
  batchesOf5: {
    s1: coins(simulation.batchesOf5.s1),
    s2: coins(simulation.batchesOf5.s2),
    s3: coins(simulation.batchesOf5.s3),
    s4: coins(simulation.batchesOf5.s4)
  },
  slowDev: {
    s1: coins(simulation.slowDev.s1),
    s2: coins(simulation.slowDev.s2),
    s3: coins(simulation.slowDev.s3),
    s4: coins(simulation.slowDev.s4)
  }
})

export default connect(mapStateToProps)(Simulation)

