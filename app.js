const express = require('express')
const cors = require('cors')
require('dotenv').config()

// Import router files
const userRouter = require('./routes/user-router')
const tvRouter = require('./routes/tv-router')
const peopleRouter = require('./routes/people-router')
const movieRouter = require('./routes/movie-router')

const app = express()

// Middleware untuk parsing JSON
app.use(express.json())
app.use(cors())

// Mount your routers
app.use('/api/users', userRouter)
app.use('/api/tv-shows', tvRouter)
app.use('/api/people', peopleRouter)
app.use('/api/movies', movieRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' })
})

// Default route for handling unknown endpoint
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' })
})

// Running server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})