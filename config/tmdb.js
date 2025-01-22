const axios = require('axios')

const TMDB_Base_URL = 'https://api.themoviedb.org/3'
const TMDB_Access_Token = process.env.API_KEY

const tmdb = axios.create({
    baseURL : TMDB_Base_URL,
    headers : {
        Authorization : `Bearer ${TMDB_Access_Token}`,
        Accept : 'application/json'
    }
})

console.log('API Key:', process.env.API_KEY);
module.exports = tmdb