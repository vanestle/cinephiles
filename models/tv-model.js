const db = require('../config/database')

const createTvShow = async ({tv_id, title, overview}) => {
    const [result] = await db.query(
        'INSERT INTO tv_shows (tv_id, title, overview) VALUES (?, ?, ?)',
        [tv_id, title, overview]
    )
    return result
}

const findTvShowById = async (tv_id) => {
    const [rows] = await db.query('SELECT * FROM tv_shows WHERE tv_id = ?', [tv_id])
    return rows[0];
}

const existedTvShow = async (tv_id) => {
    const [rows] = await db.query('SELECT tv_id FROM tv_shows WHERE tv_id = ?', [tv_id])
    return rows.length > 0;
}

module.exports = {createTvShow, findTvShowById, existedTvShow}