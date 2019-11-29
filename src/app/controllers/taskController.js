const { Task } = require('../models')

const {
  successMessage,
  notFoundMessage,
  badRequestMessage,
  serverErrorMessage
} = require('../../services/answers')

module.exports = {
  // List all Tasks
  async index(req, res) {
    try {
      const tasks = await Task.findAll({
        where: { UserId: req.user.id },
        attributes: { exclude: ['UserId'] }
      })

      return successMessage(tasks, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Create a new Task
  async store(req, res) {
    req.body.UserId = req.user.id

    const { title } = req.body

    try {
      if (!title) {
        return badRequestMessage('Title is required.', res)
      }

      if (!/^[A-Za-z0-9]+([\ A-Za-z0-9]+)*$/.test(title)) {
        return badRequestMessage(
          'The title can only contain numbers and letters.',
          res
        )
      }

      const task = await Task.create(req.body)

      return successMessage(task, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Lists a specific task
  async show(req, res) {
    req.body.UserId = req.user.id

    const { id } = req.params
    const { UserId } = req.body

    try {
      const task = await Task.findOne({
        where: { id, UserId },
        attributes: { exclude: ['UserId'] }
      })

      if (!task) {
        return notFoundMessage('Tasks not found.', res)
      }

      return successMessage(task, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Update a task
  async update(req, res) {
    req.body.UserId = req.user.id

    const { id } = req.params
    const { UserId } = req.body

    try {
      const task = await Task.findOne({ where: { id } })

      if (!task) {
        return notFoundMessage('Tasks not found.', res)
      }

      Task.update(req.body, { where: { id, UserId } })

      const updatedTask = await Task.findOne({
        where: { id },
        attributes: { exclude: ['id', 'UserId'] }
      })

      return successMessage(updatedTask, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  },

  // Remove a task
  async destroy(req, res) {
    req.body.UserId = req.user.id

    const { id } = req.params
    const { UserId } = req.body

    try {
      const task = await Task.findOne({ where: { id } })

      if (!task) {
        return notFoundMessage('Could not find task.', res)
      }

      Task.destroy({ where: { id, UserId } })

      return successMessage({ msg: 'Task is removed.' }, res)
    } catch (err) {
      return serverErrorMessage(err, res)
    }
  }
}
