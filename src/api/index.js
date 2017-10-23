const Router = require('koa-router')
const { version } = require('./../../package')

// require API resources routing
const users = require('./resources/users')

// initial route config
const router = new Router({ prefix: '/v1' })

router.get('/', ctx => {
  ctx.body = {
    message: 'BiometridOn API',
    version
  }
})

// users resource routing
router.use(users.router)

module.exports = router
