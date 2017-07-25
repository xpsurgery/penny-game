import {
  cycleTimeHistory, valueDeliveredHistory, wipHistory
} from './trends/reducer'

export default ({ demonstration }) => ({
  waterfall: demonstration['waterfall'].pennyGame,
  agile: demonstration['agile'].pennyGame,
  scrum: demonstration['scrum'].pennyGame,
  cycleTime: [
    { name: 'agile', data: cycleTimeHistory(demonstration['agile'].trends) },
    { name: 'waterfall', data: cycleTimeHistory(demonstration['waterfall'].trends) },
    { name: 'scrum', data: cycleTimeHistory(demonstration['scrum'].trends) }
  ],
  valueDelivered: [
    { name: 'agile', data: valueDeliveredHistory(demonstration['agile'].trends) },
    { name: 'waterfall', data: valueDeliveredHistory(demonstration['waterfall'].trends) },
    { name: 'scrum', data: valueDeliveredHistory(demonstration['scrum'].trends) }
  ],
  wip: [
    { name: 'agile', data: wipHistory(demonstration['agile'].trends) },
    { name: 'waterfall', data: wipHistory(demonstration['waterfall'].trends) },
    { name: 'scrum', data: wipHistory(demonstration['scrum'].trends) }
  ]
})

