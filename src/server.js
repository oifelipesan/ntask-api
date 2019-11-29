const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const auth = require('./app/middlewares/auth')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./services/logger')

const { port, env } = require('./config')
const app = express()

const routerUser = require('./routes/user')
const routerTask = require('./routes/task')
const routerAuth = require('./routes/auth')
const routerApi = require('./routes')

app.use(
  morgan('common', {
    stream: {
      write: message => logger.info(message)
    }
  })
)

app.use(helmet())

app.disable('x-powered-by')

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth.initialize())

app.use(express.static('public'))

app.use('/', routerApi)
app.use('/users', routerUser)
app.use('/tasks', routerTask)
app.use('/auth', routerAuth)

app.listen(port, err => {
  if (err) console.log('Error')
  else {
    if (!(env === 'test')) {
      console.log(`Server in running on port ${port}`)
    }
  }
})

module.exports = app
