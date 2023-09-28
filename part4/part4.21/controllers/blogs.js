//Defining constants for express Router, blog and user modules.
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/*Defining the route for getting blogs from MongoDB and
populating their user value with the referred User object's
username, and name. */
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

/*Defining the route for saving a new blog with async / await, 
unless title or url have undefined or null values. Also decoding
the received autorization token to identify the logged in user. */
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const decoded = jwt.verify(request.token, process.env.SECRET)
    if (!decoded.id) {
        return response.status(401).json({ error: 'Invalid token.' })
    }

    const user = await User.findById(decoded.id)

    /*Defining the new blog object and giving it a
    a user._id value to refer to the user who created it. */
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    /*Saving the blog._id in the blog collection of the
    user as well and saving the user to the database
    with the blog._id defined. */
    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        const savedBlog = await blog.save()
        if (user.blogs.length === 0) {
            user.blogs = user.blogs[0] = savedBlog._id
            await user.save()
        } else {
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
        }      
        

        response.status(201).json(savedBlog)
    }

})

/*Defining the route for deleting an existing blog with
async / await, unless the given id is invalid. */
blogsRouter.delete('/:id', async (request, response) => {

    /*Decoding the received authorization token to identify the logged in user
    and making sure that only the user who has created the blog,
    can delete it. */
    const decoded = jwt.verify(request.token, process.env.SECRET)

    if (!decoded.id) {
        return response.status(401).json({ error: 'Invalid token.' })
    }

    blogToDelete = await Blog.findById(request.params.id)

    if (decoded.id.toString() !== blogToDelete.user.toString()) {
        return response.status(401).json({ error: 'Unauthorized.' })
    }

    if (blogToDelete !== null && blogToDelete !== undefined) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).end()
    }
})

/*Defining the route for updating an existing blog with
async / await, unless the given id is invalid. */
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
