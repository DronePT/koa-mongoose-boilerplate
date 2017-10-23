// npm pacakages
const Koa = require('koa')

// our packages
const logger = require('./helpers/logger')

// database connect adapter
const connectDatabase = require('./config/database')

// app settings
const { handleErrors } = require('./app.helpers')
const applyMiddlwares = require('./app.middlewares')

// app routing
const api = require('./api')

const app = new Koa()

const bootApplication = app => {
  applyMiddlwares(app)

  // handle errors
  app.use(handleErrors)

  // add RESTful API routing
  app.use(api.routes())
}

connectDatabase()
  .then(bootApplication(app))
  .catch(logger.error)

module.exports = app
