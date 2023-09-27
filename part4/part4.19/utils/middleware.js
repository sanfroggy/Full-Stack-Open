const logger = require('./logger')

//Defining an Express request logger middleware
const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:  ', req.path)
    logger.info('Body:  ', req.body)
    next()
}

//Defining an error handler for unknown endpoints.
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}

//Defining the use of Express error handler middleware.
const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    if (error.name === 'MongooseError') {
        return res.status(500).send({ error: 'Unable to connect to database.' })
    }

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted id.' })
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'Token missing or invalid.' })
    }

    next(error)
}

//Exporting the defined error handlers.
module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
