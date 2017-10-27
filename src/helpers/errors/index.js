const APIError = require('./APIError')
const UnauthorizedError = require('./UnauthorizedError')
const NotFoundError = require('./NotFoundError')
const BadRequestError = require('./BadRequestError')
const ForbiddenError = require('./ForbiddenError')

module.exports = {
  APIError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError
}
