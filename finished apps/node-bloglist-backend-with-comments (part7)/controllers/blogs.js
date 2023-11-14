/*Defining constants for blog model,
express Router, blog and user modules and 
userExtractor middleware. */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middleware')

/*Defining the route for getting blogs from MongoDB and
populating their user value with the referred User object's
username, and name. Also populating their comment value
with an array of referred objects and their content. */
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
    response.json(blogs)
})

/*Defining the route for saving a new blog with async / await, 
unless title or url have undefined or null values. Also using the 
defined middlewares to identify the logged in user by decoding
the jwt authorization token. */
blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    /*Defining the new blog object and giving it a
    a user._id value to refer to the user who created it. */
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    /*Saving the blog._id in the blog collection of the
    user as well and saving the user to the database
    with the blog._id defined. Returning an error
    message if required data is missing. */
    if (!blog.title || !blog.url) {
        response
            .status(400)
            .json({
                error: 'Blog must have a title and an url.',
            })
            .end()
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

/*Defining the route for saving a new comment with async / await. 
if the commented blog does not exist anymore, or given id is invalid,
an appropriate error message is returned. */
blogsRouter.post('/:id/comments', async (request, response) => {

    console.log(request.body)

    const body = request.body
    const blog = await Blog.findById(request.params.id)

    const comment = new Comment({
        content: body.content,
        blog: blog.id,
    })

    /*If the blog is found from the MongoDB database it is saved
    and the id of the comment is also saved to the blog data as
    a reference. */
    if (blog) {
        const savedComment = await comment.save()

        if (blog.comments.length === 0) {
            blog.comments = blog.comments[0] = savedComment._id
            await blog.save()
        } else {
            blog.comments = blog.comments.concat(savedComment._id)
            await blog.save()
        }

        response.status(201).json(savedComment)
    } else {
        response
            .status(404)
            .json({
                error: 'Blog does not exist. It has possibly been deleted.',
            })
            .end()
    }
})

/*Defining the route for deleting an existing blog with
async / await, unless the given id is invalid. Returning
an approppriate error message if given an invalid id. */
blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    /*Using the define dmiddlewares to identify the logged in user
    by decoding the jtw authorization token and making sure that 
    only the user who has created the blog, can delete it. */
    const blogToDelete = await Blog.findById(request.params.id)
    const user = request.user
    const id = blogToDelete.id

    /*Deleting all the Comment objects related to the blog to be deleted
    from the MongoDB database.*/
    const comments = Comment.find({})
    await comments.deleteMany({ blog: id.toString()})

    if (user.id.toString() !== blogToDelete.user.toString()) {
        return response.status(401).json({ error: 'Unauthorized.' })
    }

    if (blogToDelete !== null && blogToDelete !== undefined) {
        /*Deleting the blog with the received id and removing the reference to
        the deleted blog from the users.blogs array and saving the user. */
        const index = user.blogs.indexOf(blogToDelete.id)

        if (index > -1) {
            user.blogs.splice(index, 1)
        }

        await Blog.findOneAndRemove(blogToDelete)

        await user.save()

        response.status(204).end()
    } else {
        response.status(400).end()
    }
})

/*Defining a route to delete a comment with an id from the MongoDB database. */
blogsRouter.delete('/comments/:id', async (request, response) => {
    const comment = await Comment.findById(request.params.id)

    /*If the comment exists it is deleted and a reponse with 204 "no content"
    status code is sent with the response to signify the success of the operation. 
    If it does not exist or the given id is invalid an approppriate error message
    is returned. */
    if (comment) {
        await Comment.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response
            .status(404)
            .json({
                error: 'Comment does not exist. ',
            })
            .end()
    }
})

/*Defining a route to remove all the comment references from a blog with the given
id. */
blogsRouter.delete('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    /*If the blog exists and has comments in the blog.comments array, all those
    comments will be removed as the array is emptied. If the blog is not found
    or the given id is invalid an appropriate error message is returned. */
    if (blog) {
        if (blog.comments.length !== 0) {
            blog.comments = []
            await blog.save()
        }
        response.status(204).end()
    } else {
        response
            .status(404)
            .json({
                error: 'Blog does not exist. It has possibly been deleted.',
            })
            .end()
    }
})

/*Defining the route for updating an existing blog with
async / await, unless the given id is invalid and 
returning an error message. */
blogsRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findById(request.params.id)

    if (blogToUpdate !== null && blogToUpdate !== undefined) {
        const body = request.body

        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).json(updatedBlog)
    } else {
        response
            .status(404)
            .json({
                error: 'Blog does not exist. It has possibly been deleted.',
            })
            .end()
    }
})

module.exports = blogsRouter
