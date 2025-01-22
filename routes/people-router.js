const express = require('express')
const router = express.Router()
const peopleController = require('../controllers/people-controller')
const verifyToken = require('../middleware/auth-middleware')

// Public routes
router.get('/search', peopleController.searchPeople)

// Protected routes or need to verify
router.get('/', verifyToken, peopleController.getAllPeople)
router.get('/:id', verifyToken, peopleController.getPersonById)

module.exports = router
