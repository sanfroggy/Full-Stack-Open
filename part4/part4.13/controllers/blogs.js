//Define constants for express Router and the blog module.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

//Define the route for getting blogs from MongoDB 
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

/*Define the route and saving a new one with async / await, 
unless title or url have undefined or null values. */
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete !== null && blogToDelete !== undefined) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter
