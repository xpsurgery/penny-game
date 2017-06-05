export const DELIVER_BATCH = 'DELIVER_BATCH'

export const deliverBatch = (lineName, fromWorker, toWorker, batch) => ({
  type: DELIVER_BATCH,
  simulationName: lineName,
  from: fromWorker,
  to: toWorker,
  batch: batch
})

