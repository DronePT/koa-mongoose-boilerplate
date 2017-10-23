module.exports = class APIError extends Error {
  constructor (
    message = 'Internal Server Error',
    status = 500,
    code = 0,
    expose = true
  ) {
    super(message)

    this.name = this.constructor.name
    this.status = status
    this.expose = expose
    this.code = code
  }
}
