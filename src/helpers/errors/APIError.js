module.exports = class APIError extends Error {
  /**
   *
   * @param {String|Object} message Error message to expose
   * @param {Number} httpStatus HTTP Status code
   * @param {Number} code Internal API error code
   * @param {Boolean} expose expose error to user?
   */
  constructor (
    message = 'Internal Server Error',
    httpStatus = 500,
    code = 0,
    expose = true
  ) {
    super(message.message || message)

    if (typeof message === 'object') this.data = message

    this.name = this.constructor.name
    this.status = httpStatus
    this.expose = expose
    this.code = code
  }
}
