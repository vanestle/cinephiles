const db = require('../config/database')

const createPeople = async ({people_id, name, birthday, biography}) => {
    try {
        const [result] = await db.execute(
            'INSERT INTO people (people_id, name, birthday, biography) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), birthday = VALUES(birthday), biography = VALUES(biography)',
            [people_id, name, birthday, biography]
        );
        return result

    } catch (error) {
        console.error('Error creating person:', error)
        throw error
    }
}

const findPeopleById = async (people_id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM people WHERE people_id = ?', [people_id])
        return rows[0]

    } catch (error) {
        console.error('Error finding person by ID:', error)
        throw error
    }
}

const existedPeople = async (people_id) => {
    try {
        const [rows] = await db.execute('SELECT 1 FROM people WHERE people_id = ?', [people_id])
        return rows.length > 0

    } catch (error) {
        console.error('Error checking person existence:', error)
        throw error;
    }
}

module.exports = {createPeople, findPeopleById, existedPeople}