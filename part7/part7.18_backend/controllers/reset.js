//Importing express Router and necessary models.
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/*Creating a route to reset the database deleting
all blogs and users for test purposes. */
router.post('/reset', async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = router
