const db = require('../config/database')

const createUser = async (pool, { user_id, username, email, password }) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username), email = VALUES(email), password = VALUES(password)',
            [user_id, username, email, password]
        )
        return result

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

const getUserById = async (user_id) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [user_id])
        return rows[0]

    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw error;
    }
}

const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email])
        return rows[0]

    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}

const existedUser = async (user_id) => {
    try {
        const [rows] = await db.execute('SELECT 1 FROM users WHERE user_id = ?', [user_id]);
        return rows.length > 0

    } catch (error) {
        console.error('Error checking user existence:', error)
        throw error;
    }
}

const updateUser = async (user_id, updates) => {
    try {
        const setClause = Object.entries(updates)
            .map(([key, value]) => `${key} = ?`)
            .join(', ')
        const values = Object.values(updates).concat(user_id)

        const [result] = await db.execute(
            `UPDATE users SET ${setClause} WHERE user_id = ?`, values
        )
        return result

    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

const deleteUser = async (user_id) => {
    try {
        const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [user_id])
        return result

    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

module.exports = {createUser, getUserById, findUserByEmail, existedUser, updateUser, deleteUser };