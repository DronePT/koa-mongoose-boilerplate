require('dotenv').config()
// const http = require('uws').http
const http = require('http')
const app = require('./src/app')

const PORT = process.env.PORT || 3000

http
  .createServer(app.callback())
  .listen(
    PORT,
    _ => console.log(`API listnening on port ${PORT}`)
  )
