const APIError = require('./APIError')

module.exports = class NotFoundError extends APIError {
  constructor (message = 'Sorry, 404 not found!') {
    super(message, 404, 1004, true)
    this.name = this.constructor.name
  }
}
