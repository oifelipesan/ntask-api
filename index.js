const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const auth = require('./src/app/middlewares/auth')
const cors = require('cors')

const { port, env } = require('./src/config')
const app = express()

const routerUser = require('./src/routes/user')
const routerTask = require('./src/routes/task')
const routerAuth = require('./src/routes/auth')
const routerApi = require('./src/routes/api')

app.use(helmet())

app.disable('x-powered-by')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth.initialize())

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
