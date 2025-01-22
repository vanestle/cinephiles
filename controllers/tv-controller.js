const tvService = require('../services/tv-services')

const getAllTvShows = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tvService.getPopularTvShows(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getAllTvShows:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getTvShowById = async (req, res) => {
    try {
        const { id } = req.params;
        const tvData = await tvService.getTvShowDetails(id)
        res.json({ status: 'success', data: tvData })

    } catch (error) {
        console.error('Error in getTvShowById:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const searchTvShows = async (req, res) => {
    try {
        const { query, page } = req.query;
        const data = await tvService.searchTvShows(query, page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in searchTvShows:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const popularTvShows = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tvService.popularTvShows(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getPopularTvShows:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const nowAiringTvShows = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const data = await tvService.nowAiringTvShows(page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in nowAiringTvShows:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {getAllTvShows, getTvShowById, searchTvShows, popularTvShows, nowAiringTvShows}
