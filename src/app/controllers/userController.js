const jwt = require('jwt-simple')

const { jwtSecret } = require('../../config')
const { User } = require('../models')

const {
  successMessage,
  badRequestMessage,
  serverErrorMessage
} = require('../../services/answers')

module.exports = {
  // List the logged in user
  async index(req, res) {
    const { id } = req.user

    try {
      const user = await User.findByPk(id, {
        include: {
          association: 'tasks',
          attributes: { exclude: ['UserId'] }
        },
        attributes: { exclude: ['id', 'password'] }
      })

      return successMessage(user, res)
    } catch (err) {
      if (!id) {
        return badRequestMessage(
          'Session terminated or user does not exist',
          res
        )
      }
      return serverErrorMessage(err, res)
    }
  },

  // Create a new user
  async store(req, res) {
    const { name, email, password } = req.body

    try {
      if (!/^[A-Za-z]+([\ A-Za-z]+)*$/.test(name)) {
        return badRequestMessage('Please enter a valid name.', res)
      }

      if (!name) {
        return badRequestMessage('Name is required.', res)
      }

      if (!email) {
        return badRequestMessage('Email is requerid.', res)
      }

      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return badRequestMessage('Invalid email format.', res)
      }

      if (await User.findOne({ where: { email } })) {
        return badRequestMessage('E-mail already registered.', res)
      }

      if (!password) {
        return badRequestMessage('Password is requerid.', res)
      }

      if (!email)
        if (await User.findOne({ where: { email } })) {
          return badRequestMessage('User already exists.', res)
        }

      const user = await User.create(req.body)

      const payload = { id: user.id }

      const responseUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        token: jwt.encode(payload, jwtSecret)
      }

      return res.status(201).json(responseUser)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Update a user
  async update(req, res) {
    const { id } = req.user
    try {
      const user = await User.findByPk(id)

      if (!user) {
        return badRequestMessage('User not fould.', res)
      }

      await User.update(req.body, { where: { id }, individualHooks: true })

      const updatedUser = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] }
      })

      return successMessage(updatedUser, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Remove a user
  async destroy(req, res) {
    const { id } = req.user

    try {
      const user = await User.findByPk(id)

      if (!user) {
        return badRequestMessage('Could not find user.', res)
      }

      User.destroy({ where: { id } })

      return successMessage({ msg: 'User is removed.' }, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  }
}
