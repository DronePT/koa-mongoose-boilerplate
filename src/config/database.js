const mongoose = require('mongoose')
const logger = require('./../helpers/logger')

const { DATABASE_URI } = process.env

// set mongoose default promise
mongoose.Promise = global.Promise

mongoose.connection
  .once('open', _ => logger.info('Connected to database with success.'))
  .on('error', _ => logger.error('Error connecting to database', _))

module.exports = () => mongoose.connect(DATABASE_URI, { useMongoClient: true })
