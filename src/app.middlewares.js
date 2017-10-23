const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const bodyparser = require('koa-bodyparser')
const serverpush = require('koa-server-push')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')
const morgan = require('koa-morgan')

const { NODE_ENV } = process.env
const MORGAN_LOG_TYPE = NODE_ENV === 'development' ? 'dev' : 'combined'

module.exports = (app) => {
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
}
