const Koa = require('koa')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const bodyparser = require('koa-bodyparser')
const serverpush = require('koa-server-push')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const morgan = require('koa-morgan')

const Responder = require('./helpers/responder')
const logger = require('./helpers/logger')
const connectDatabase = require('./config/database')
const api = require('./api')

const app = new Koa()

const { NODE_ENV } = process.env
const MORGAN_LOG_TYPE = NODE_ENV === 'development'
  ? 'dev' : 'combined'

const bootApplication = () => {
  // Specifically for adding HTTP2 Server Push headers for HTTP2 clients and proxies
  app.use(serverpush())
  // HTTP CORS configuration
  app.use(cors())
  // HTTP/Headers protection
  app.use(helmet())
  // use it upstream from etag so that they are present
  app.use(conditional())
  // add etags
  app.use(etag())
  // Request body parser
  app.use(bodyparser())
  // Request logger
  app.use(morgan(MORGAN_LOG_TYPE))

  // handle errors
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      const response = new Responder()
      const status = err.status || 500

      if (status === 500) logger.error(err)

      const data = status === 500 && NODE_ENV === 'production'
        ? { message: 'Internal Server Error' }
        : typeof err.message === 'string'
          ? { message: err.message }
          : err.message

      ctx.status = status

      ctx.body = response
        .error(data, status)
        .json()

      ctx.app.emit('error', err, ctx)
    }
  })

  // add RESTful API routing
  app.use(api.routes())
}

connectDatabase()
  .then(bootApplication)
  .catch(logger.error)

module.exports = app
