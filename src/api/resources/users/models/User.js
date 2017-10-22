const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const logger = require('./../../../../helpers/logger')

const { Schema } = mongoose
const { SALT_ROUNDS } = process.env

const schema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: String
})

// password hasher
const hashPassword = function (next) {
  const { password } = this

  const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS || 10))

  this.password = bcrypt.hashSync(password, salt)

  next()
}

// middlewares
schema.pre('save', hashPassword)

module.exports = mongoose.model('User', schema)
