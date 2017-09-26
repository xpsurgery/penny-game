import React from 'react'
import PropTypes from 'prop-types'
import 'highcharts'
import ReactHighcharts from 'react-highcharts'

var lineChart = {
  chart: {
    height: '140',
    zoomType: 'x'
  },
  xAxis: {
    labels: { enabled: false }
  },
  yAxis: {
    min: 0,
    title: { text: '' }
  },
  plotOptions: {
    series: {
      animation: false,
      marker: { enabled: false }
    }
  },
  legend: { enabled: false }
}

const TrendChart = ({ dataSeries, title }) => {
  return (
    <div className='trend-chart'>
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

