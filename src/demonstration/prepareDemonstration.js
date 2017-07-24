import {
  cycleTimeHistory, valueDeliveredHistory, wipHistory
} from './graphs/reducer'

export default ({ demonstration }) => ({
  waterfall: demonstration['waterfall'].pennyGame,
  agile: demonstration['agile'].pennyGame,
  scrum: demonstration['scrum'].pennyGame,
  cycleTime: [
    { name: 'agile', data: cycleTimeHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: cycleTimeHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: cycleTimeHistory(demonstration['scrum'].graphs) }
  ],
  valueDelivered: [
    { name: 'agile', data: valueDeliveredHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: valueDeliveredHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: valueDeliveredHistory(demonstration['scrum'].graphs) }
  ],
  wip: [
    { name: 'agile', data: wipHistory(demonstration['agile'].graphs) },
    { name: 'waterfall', data: wipHistory(demonstration['waterfall'].graphs) },
    { name: 'scrum', data: wipHistory(demonstration['scrum'].graphs) }
  ]
})

