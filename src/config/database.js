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
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }
}
