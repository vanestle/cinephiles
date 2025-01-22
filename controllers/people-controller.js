const peopleService = require('../services/movie-service')

const getAllPeople = async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await peopleService.getPopularPeople(page);
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in getAllPeople:', error) 
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getPersonById = async (req, res) => {
    try {
        const { id } = req.params;
        const personData = await peopleService.getPersonDetails(id)
        res.json({ status: 'success', data: personData })

    } catch (error) {
        console.error('Error in getPersonById:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
};

const searchPeople = async (req, res) => {
    try {
        const { query, page } = req.query;
        const data = await peopleService.searchPeople(query, page)
        res.json({ status: 'success', data })

    } catch (error) {
        console.error('Error in searchPeople:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {getAllPeople, getPersonById, searchPeople}
