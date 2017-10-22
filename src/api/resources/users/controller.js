const Responder = require('./../../../helpers/responder')
const logger = require('./../../../helpers/logger')
const User = require('./models/User')

logger.debug(new Responder())

class UserController {
  async list (ctx) {
    const response = new Responder()

    const result = await User.find({})
      .select('-password')

    ctx.body = response
      .data(result)
      .json()
  }

  async create (ctx) {
    const response = new Responder()
    const { email, password } = ctx.request.body

    const user = new User({ email, password })

    await user.save()

    ctx.body = response
      .data(user)
      .json()
  }
}

module.exports = UserController
