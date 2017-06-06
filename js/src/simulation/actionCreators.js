export const CONTINUE_TASK = 'CONTINUE_TASK'

export const continueTask = (simulationName, workerName) => ({
  type: CONTINUE_TASK,
  simulationName: simulationName,
  workerName: workerName
})

export const DELIVER_BATCH = 'DELIVER_BATCH'

export const deliverBatch = (simulationName, fromWorker, toWorker, batch) => ({
  type: DELIVER_BATCH,
  simulationName: simulationName,
  from: fromWorker,
  to: toWorker,
  batch: batch
})

export const PICK_UP_NEXT_TASK = 'PICK_UP_NEXT_TASK'

export const pickUpNextTask = (simulationName, workerName) => ({
  type: PICK_UP_NEXT_TASK,
  simulationName: simulationName,
  workerName: workerName
})

export const RECEIVE_NEW_BATCH = 'RECEIVE_NEW_BATCH'

export const newBatchFromCustomer = (simulationName, workerName) => ({
  type: RECEIVE_NEW_BATCH,
  simulationName: simulationName,
  workerName: workerName
})

