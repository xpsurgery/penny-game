export const PICK_UP_NEXT_TASK = 'PICK_UP_NEXT_TASK'

export const pickUpNextTask = (simulationName, workerName) => ({
  type: PICK_UP_NEXT_TASK,
  simulationName: simulationName,
  workerName: workerName
})

export const CONTINUE_TASK = 'CONTINUE_TASK'

export const continueTask = (simulationName, workerName) => ({
  type: CONTINUE_TASK,
  simulationName: simulationName,
  workerName: workerName
})

export const DELIVER_BATCH = 'DELIVER_BATCH'

export const deliverBatch = (simulationName, workerName, batch) => ({
  type: DELIVER_BATCH,
  simulationName: simulationName,
  workerName: workerName,
  batch: batch
})

export const RECEIVE_BATCH = 'RECEIVE_BATCH'

export const receiveBatch = (simulationName, workerName, batch) => ({
  type: RECEIVE_BATCH,
  simulationName: simulationName,
  workerName: workerName,
  batch: batch
})

export const NEW_BATCH_FROM_CUSTOMER = 'NEW_BATCH_FROM_CUSTOMER'

export const newBatchFromCustomer = (simulationName, workerName) => ({
  type: NEW_BATCH_FROM_CUSTOMER,
  simulationName: simulationName,
  workerName: workerName
})

