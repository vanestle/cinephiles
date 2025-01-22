const express = require('express')
const router = express.Router()
const tvController = require('../controllers/tv-controller')
const verifyToken = require('../middleware/auth-middleware')

// Public routes
router.get('/search', tvController.searchTvShows)
router.get('/now-airing', tvController.nowAiringTvShows)
router.get('/popular', tvController.popularTvShows)

// Protected routes or need to verify
router.get('/', verifyToken, tvController.getAllTvShows)
router.get('/:id', verifyToken, tvController.getTvShowById)

module.exports = router