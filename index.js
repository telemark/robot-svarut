'use strict'

const checkRetries = require('./lib/steps/check-retries')
const getNextJobFromQueue = require('./lib/steps/get-next-job-from-queue')
const getFileData = require('./lib/steps/get-file-data')
const prepareData = require('./lib/steps/prepare-data')
const postStatus = require('./lib/steps/post-data')
const saveToDone = require('./lib/steps/save-to-done')
const saveToErrors = require('./lib/steps/save-to-errors')
const saveToRetries = require('./lib/steps/save-to-retries')
const saveCallbackData = require('./lib/steps/save-callback-data')
const removeFromQueue = require('./lib/steps/remove-from-queue')
const logger = require('./lib/logger')

logger('info', ['index', 'start'])

checkRetries()
  .then(getNextJobFromQueue)
  .then(getFileData)
  .then(prepareData)
  .then(postStatus)
  .then(saveCallbackData)
  .then(saveToDone)
  .then(saveToErrors)
  .then(saveToRetries)
  .then(removeFromQueue)
  .then((data) => {
    logger('info', ['index', data._id, 'finished'])
    process.exit(0)
  })
  .catch((error) => {
    logger('error', ['index', 'error', JSON.stringify(error)])
    process.exit(1)
  })
