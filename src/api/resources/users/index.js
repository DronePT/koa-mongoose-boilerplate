const Router = require('koa-router')
const Controller = require('./controller')

// initial route configuration
const router = new Router({ prefix: '/users' })
const ctrl = new Controller()

// list all users
router
  .get('/', ctrl.list)
  .post('/', ctrl.create)

module.exports = router
