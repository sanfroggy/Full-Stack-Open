//Define the use of necessary modules and cors middleware.
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')
const cors = require('cors')

/*Get the port to listen to from enviromental variable through
config module and show a message when server is running. */
app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})
