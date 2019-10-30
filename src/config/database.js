require('dotenv').config()

module.exports = {
  development: {
    database: 'ntask',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: 'ntasks.sqlite',
    define: {
      undersored: true
    }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
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
