import React from 'react'
import PropTypes from 'prop-types'
import 'highcharts'
import ReactHighcharts from 'react-highcharts'

var lineChart = {
  chart: {
    zoomType: 'x'
  },
  xAxis: {
    labels: { enabled: false }
  },
  yAxis: {
    min: 0,
    title: { text: '' }
  },
  plotOptions: {},
  legend: {
    layout: 'vertical',
    align: 'left',
    x: 120,
    verticalAlign: 'top',
    y: 100,
    floating: true,
    backgroundColor: '#FFFFFF'
  }
}

const TrendChart = ({ dataSeries, title }) => {
  return (
    <div className='trends-chart'>
      <ReactHighcharts config={{
        ...lineChart,
        title: { text: title },
        series: dataSeries
      }} isPureConfig={true} />
    </div>
  )
}

TrendChart.propTypes = {
  dataSeries: PropTypes.array,
  title: PropTypes.string
}

export default TrendChart

