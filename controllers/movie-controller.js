const movieModel = require('../models/movie-model')
const pool = require('../config/database')
const movieService = require('../services/movie-service')

// Get movies
const getAllMovies = async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await movieService.getAllMovies(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getAllMovies:', error);
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Get movie by ID 
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params
        const movieData = await movieService.getMovieById(id)
        
        if (!await movieModel.exists(pool, id)) {
            await movieModel.create(pool, {
                movie_id: movieData.id,
                title: movieData.title,
                overview: movieData.overview,
                release_date: movieData.release_date
            })
        }
        
        res.json({ status: 'success', data: movieData })

    } catch (error) {
        console.error('Error in getMovieById:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Search movies using TMDB API
const searchMovies = async (req, res) => {
    try {
        const { query, page } = req.query
        const data = await movieService.searchMovies(query, page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in searchMovies:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Get popular movies from TMDB API
const popularMovies = async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await movieService.popularMovies(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getPopularMovies:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Get upcoming movies from TMDB API
const upcomingMovies = async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await movieService.upcomingMovies(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getUpcomingMovies:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

// Get now playing movies from TMDB API
const nowPlayingMovies = async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await movieService.nowPlayingMovies(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getAiringMovies:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {getAllMovies, getMovieById, searchMovies, popularMovies, upcomingMovies, nowPlayingMovies}