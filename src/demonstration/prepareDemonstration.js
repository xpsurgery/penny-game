import {
  cycleTimeHistory, valueDeliveredHistory, wipHistory
} from './trends/reducer'

export default ({ demonstration }) => {
  let waterfall = demonstration['waterfall']
  let agile = demonstration['agile']
  let scrum = demonstration['scrum']
  return {
    waterfall: waterfall.pennyGame,
    agile: agile.pennyGame,
    scrum: scrum.pennyGame,
    times: [
      { name: 'agile', data: cycleTimeHistory(agile.trends) },
      { name: 'waterfall', data: cycleTimeHistory(waterfall.trends) },
      { name: 'scrum', data: cycleTimeHistory(scrum.trends) }
    ],
    values: [
      { name: 'agile', data: valueDeliveredHistory(agile.trends) },
      { name: 'waterfall', data: valueDeliveredHistory(waterfall.trends) },
      { name: 'scrum', data: valueDeliveredHistory(scrum.trends) }
    ],
    wips: [
      { name: 'agile', data: wipHistory(agile.trends) },
      { name: 'waterfall', data: wipHistory(waterfall.trends) },
      { name: 'scrum', data: wipHistory(scrum.trends) }
    ]
  }
}

