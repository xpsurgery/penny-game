import {
  cycleTimeHistory, valueDeliveredHistory, wipHistory
} from './trends/reducer'

export default ({ demonstration }) => {
  let waterfall = demonstration['waterfall']
  let waterfallColour = '#d36868'
  let agile = demonstration['agile']
  let agileColour = '#97ad33'
  let scrum = demonstration['scrum']
  let scrumColour = '#476c87'
  return {
    waterfall: waterfall.pennyGame,
    agile: agile.pennyGame,
    scrum: scrum.pennyGame,
    times: [
      { name: 'waterfall', color: waterfallColour, data: cycleTimeHistory(waterfall.trends) },
      { name: 'agile', color: agileColour, data: cycleTimeHistory(agile.trends) },
      { name: 'scrum', color: scrumColour, data: cycleTimeHistory(scrum.trends) }
    ],
    values: [
      { name: 'waterfall', color: waterfallColour, data: valueDeliveredHistory(waterfall.trends) },
      { name: 'agile', color: agileColour, data: valueDeliveredHistory(agile.trends) },
      { name: 'scrum', color: scrumColour, data: valueDeliveredHistory(scrum.trends) }
    ],
    wips: [
      { name: 'waterfall', color: waterfallColour, data: wipHistory(waterfall.trends) },
      { name: 'agile', color: agileColour, data: wipHistory(agile.trends) },
      { name: 'scrum', color: scrumColour, data: wipHistory(scrum.trends) }
    ]
  }
}

