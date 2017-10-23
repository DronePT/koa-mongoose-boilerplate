const logger = require('./helpers/logger')
const Responder = require('./helpers/responder')

const { NODE_ENV } = process.env

exports.handleErrors = async (ctx, next) => {
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
      .error(data, err.code || status)
      .json()

    ctx.app.emit('error', err, ctx)
  }
}
