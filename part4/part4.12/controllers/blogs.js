//Define constants for express Router and the blog module.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/*Define the routes for getting blogs from MongoDB and saving a new one
with async/await, unless title or url have undefined or null values. */
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

module.exports = blogsRouter
