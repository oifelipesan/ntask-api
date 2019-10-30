const express = require('express')
const userController = require('../app/controllers/userController')
const auth = require('../app/middlewares/auth')

const router = express.Router()

router.get('/', auth.authenticate, userController.index)
router.post('/register', userController.store)
router.put('/', auth.authenticate, userController.update)
router.delete('/', auth.authenticate, userController.destroy)

module.exports = router
