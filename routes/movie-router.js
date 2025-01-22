const express = require('express');
const router = express.Router()
const movieController = require('../controllers/movie-controller')
const verifyToken = require('../middleware/auth-middleware')

// Public routes
router.get('/search', movieController.searchMovies)
router.get('/popular', movieController.popularMovies)
router.get('/upcoming', movieController.upcomingMovies)
router.get('/now-playing', movieController.nowPlayingMovies)

// Protected routes or need to verify
router.get('/', verifyToken, movieController.getAllMovies)
router.get('/:id', verifyToken, movieController.getMovieById)

module.exports = router
