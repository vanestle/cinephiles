const tmdbAxios = require('../config/tmdb')

// Search TV shows by query
const searchTvShows = async (query, page = 1) => {
    try {
        const response = await tmdbAxios.get('/search/tv', {
            params: {
                query,
                page,
                include_adult: false
            }
        })
        return response.data

    } catch (error) {
        console.error('TMDB TV Search Error:', error.response?.data || error.message)
        throw new Error('Error searching TV shows')
    }
}

// Get popular TV shows
const popularTvShows = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/tv/popular', {
            params: { page }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Popular TV Error:', error.response?.data || error.message)
        throw new Error('Error getting popular TV shows')
    }
};

// Get now airing TV shows
const nowAiringTvShows = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/tv/airing-today', {
            params: { page }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Now Airing Error:', error.response?.data || error.message)
        throw new Error('Error getting now airing TV shows')
    }
}

module.exports = {searchTvShows, popularTvShows, nowAiringTvShows}

