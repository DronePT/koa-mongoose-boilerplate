const Responder = require('./../../../helpers/responder')
const logger = require('./../../../helpers/logger')
const {UnauthorizedError} = require('./../../../helpers/errors')

// database models
const User = require('./models/User')

class UserController {
  async list (ctx) {
    throw new UnauthorizedError()
    // const response = new Responder()

    // const result = await User.find({})
    //   .select('-password')

    // ctx.body = response
    //   .data(result)
    //   .json()
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
