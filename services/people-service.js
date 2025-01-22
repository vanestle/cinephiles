const tmdbAxios = require('../config/tmdb')

// Search people by query
const searchPeople = async (query, page = 1) => {
    try {
        const response = await tmdbAxios.get('/search/person', {
            params: {
                query,
                page,
                include_adult: false
            }
        })
        return response.data

    } catch (error) {
        console.error('TMDB People Search Error:', error.response?.data || error.message);
        throw new Error('Error searching people')
    }
};

// Get person details by ID
const personDetails = async (personId) => {
    try {
        const response = await tmdbAxios.get(`/person/${personId}`, {
            params: {
                append_to_response: 'combined_credits'
            }
        })
        return response.data

    } catch (error) {
        console.error('TMDB Person Details Error:', error.response?.data || error.message)
        throw new Error('Error getting person details')
    }
}

// Get popular people
const popularPeople = async (page = 1) => {
    try {
        const response = await tmdbAxios.get('/person/popular', {
            params: { page }
        });
        return response.data

    } catch (error) {
        console.error('TMDB Popular People Error:', error.response?.data || error.message)
        throw new Error('Error getting popular people')
    }
}

module.exports = {searchPeople, personDetails, popularPeople}
