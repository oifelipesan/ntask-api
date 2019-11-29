require('dotenv').config()
const logger = require('../services/logger')

module.exports = {
  development: {
    database: 'ntask',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: 'ntasks.sqlite',
    logging: sql => {
      logger.info(`[${new Date()}] ${sql}`)
    },
    define: {
      undersored: true
    }
  },
  test: {
    database: 'ntask_test',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: 'ntasks_test.sqlite',
    logging: false,
    define: {
      undersored: true
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  }
}
