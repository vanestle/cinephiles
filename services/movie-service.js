const tmdbAxios = require('../config/tmdb')

// Get all movies from the database
const getAllMovies = async (page = 1) => {
    try {
        const [rows] = await pool.query(
        'SELECT * FROM movies LIMIT ?, ?',
        [(page - 1) * 10, 10]
        )

        return rows;
    } catch (error) {
        console.error('Error getting all movies:', error);
        throw new Error('Error getting all movies');
    }
}  
  
// Get movie by ID from the database
const getMovieById = async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM movies WHERE movie_id = ?', [id])
      return rows[0]

    } catch (error) {
      console.error('Error getting movie by ID:', error)
      throw new Error('Error getting movie by ID')
    }
}

// Search movies by query
const searchMovies = async (query, page = 1) => {
    try {
        const response = await tmdbAxios.get('/search/movie', {
            params: {
                query,
                page,
                include_adult: false
            }
        })
        return response.data
    } catch (error) {
        console.error('TMDB Search Error:', error.response?.data || error.message);
        throw new Error('Error searching movies')
    }
}

// Get popular movies
const popularMovies = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/movie/popular', {
            params: { page }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Popular Error:', error.response?.data || error.message);
        throw new Error('Error getting popular movies')
    }
}

// Get upcoming movies
const upcomingMovies = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/movie/upcoming', {
            params: { page }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Upcoming Error:', error.response?.data || error.message)
        throw new Error('Error getting upcoming movies')
    }
}

// Get now playing movies
const nowPlayingMovies = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/movie/now-playing', {
            params: { page }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Now Playing Error:', error.response?.data || error.message);
        throw new Error('Error getting now playing movies')
    }
}

module.exports = {getAllMovies, getMovieById, searchMovies, popularMovies, upcomingMovies, nowPlayingMovies}
