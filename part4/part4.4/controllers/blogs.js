//Define constants for express Router and the blog module.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Define the routes for getting blogs from MongoDB and saving a new one.
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter
