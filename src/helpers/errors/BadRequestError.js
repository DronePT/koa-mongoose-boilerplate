const APIError = require('./APIError')

module.exports = class BadRequestError extends APIError {
  constructor (message = 'Bad request!') {
    super(message, 400, 1000, true)
    this.name = this.constructor.name
  }
}
