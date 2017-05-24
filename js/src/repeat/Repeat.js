import React from 'react'
import { connect } from 'react-redux'

const Repeat = React.createClass({
  componentDidMount: function() {
    this.ping()
  },

  ping: function() {
    if (!this.isMounted())
      return
    if (this.props.ticksRemaining <= 0)
      return
    if (this.props.enabled)
      this.props.dispatch(this.props.action())
    setTimeout(this.ping, this.props.seconds * 1000)
  },

  render: function() {
    return null
  }
})

const mapStateToProps = ({ repeat }) => repeat

export default connect(mapStateToProps)(Repeat)

