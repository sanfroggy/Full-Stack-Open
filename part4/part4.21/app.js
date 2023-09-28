/*Defining the constants for the use of Express, 
express-async-errors, cors, and mongoose.
as well as the necessary modules. */
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const { requestLogger, unknownEndpoint, errorHandler, tokenExtractor } = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

mongoose.set('strictQuery', false)

/*Showing a message indicating the status of the connection
attempt through the use of logger middleware. */
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

//Defining the use of middlewares.
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app