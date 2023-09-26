//Define constants for express Router and the blog module.
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//Define the route for getting blogs from MongoDB 
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

/*Define the route for saving a new blog with async / await, 
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

/*Define the route for deleting an existing blog with
async / await, unless the given id is invalid. */
blogsRouter.delete('/:id', async (request, response) => {
    blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete !== null && blogToDelete !== undefined) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {

    blogToUpdate = await Blog.findById(request.params.id)

    if (blogToUpdate !== null && blogToUpdate !== undefined) {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id, blog, { new: true })
        response.status(200).json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter
