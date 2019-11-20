const jwt = require('jwt-simple')

const { jwtSecret } = require('../../config')
const { User } = require('../models')

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password required' })
    }

    if (email && password) {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.status(404).json({ error: 'User not fould.' })
      }

      if (User.isPassword(user.password, password)) {
        const payload = { id: user.id }

        return res.status(200).json({ token: jwt.encode(payload, jwtSecret) })
      } else {
        return res.status(401).json({ error: 'Password invalid.' })
      }
    } else {
      return res.status(401).json(error)
    }
  }
}
