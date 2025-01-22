const db = require('../config/database')

const createMovie = async ({movie_id, title, overview, release_date}) => {
    const [result] = await db.query(
        'INSERT INTO movies (movie_id, title, overview, release_date) VALUES (?, ?, ?, ?)',
        [movie_id, title, overview, release_date]
    )
    return result
}

const findMovieById = async (movie_id) => {
    const [rows] = await db.query('SELECT * FROM movies WHERE movie_id = ?', [movie_id])
    return rows[0]
}

const existedMovie = async (movie_id) => {
    const [rows] = await db.query('SELECT movie_id FROM movies WHERE movie_id = ?', [movie_id])
    return rows.length > 0
}

module.exports = {createMovie, findMovieById, existedMovie}