require('dotenv').config()

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtSession: { session: false }
}
