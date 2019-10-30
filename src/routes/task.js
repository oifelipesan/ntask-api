const express = require('express')
const taskController = require('../app/controllers/taskController')
const auth = require('../app/middlewares/auth')

const router = express.Router()

router.use(auth.authenticate)

router.get('/', taskController.index)
router.post('/register', taskController.store)
router.get('/:id', taskController.show)
router.put('/:id', taskController.update)
router.delete('/:id', taskController.destroy)

module.exports = router
