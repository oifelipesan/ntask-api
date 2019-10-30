const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')

const { User } = require('../models')
const { jwtSecret, jwtSession } = require('../../config')

const params = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
  const user = await User.findByPk(payload.id)

  try {
    if (user) {
      return done(null, {
        id: user.id,
        email: user.email
      })
    } else {
      return done(null, false)
    }
  } catch (err) {
    return done(err, false)
  }
})

passport.use(strategy)

module.exports = {
  initialize() {
    return passport.initialize()
  },
  authenticate(req, res, next) {
    return passport.authenticate('jwt', jwtSession, (err, user) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({ error: 'Please login to access system!' })
      }
      req.user = user
      next()
    })(req, res, next)
  }
}
