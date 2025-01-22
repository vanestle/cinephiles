const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const verifyToken = require('../middleware/auth-middleware')

// Public routes
router.post('/register', userController.register)
router.post('/login', userController.login)

// Protected routes or need to verify
router.get('/users', verifyToken, userController.getAllUsers)
router.get('/users/:id', verifyToken, userController.getUserById)
router.put('/users/:id', verifyToken, userController.updateUser)
router.delete('/users/:id', verifyToken, userController.deleteUser)

module.exports = router