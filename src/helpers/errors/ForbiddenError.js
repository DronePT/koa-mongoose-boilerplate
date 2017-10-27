const APIError = require('./APIError')

module.exports = class ForbiddenError extends APIError {
  constructor (message = 'Sorry, you\'ve no permissions!') {
    super(message, 403, 1003, true)
    this.name = this.constructor.name
  }
}
