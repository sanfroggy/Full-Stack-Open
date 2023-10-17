//Importing the necessary modules.
const Blog = require('../models/blog')
const User = require('../models/user')

/*Creating an array of blogs to initialize the MongoDB
database with. */
const initialBlogs = [
    {
        title: 'My fullstack studies',
        author: 'San',
        url: 'http://www.mydevblog.com',
        likes: 30502
    },
    {

        title: 'Crazy for cinema',
        author: 'FilmFanatic',
        url: 'http://www.allaboutthatav.org',
        likes: 126345
    },
    {
        title: 'Philosophical corner',
        author: 'NewSocrates',
        url: 'http://www.ithinkthereforeiam.org',
        likes: 1345
    }
]

/*Returning an id that is sure not to exist in the 
MongoDB database for testing purposes. */
const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon',
        author: 'nonrelevant',
        url: 'http://www.urlneedstobedefined.com',
        likes: 0
    })
    await blog.save()
    await Blog.findByIdAndRemove(blog._id)

    return blog._id.toString()
}

//Return all the blogs in the MongoDB database.
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

//Return all the users in the MongoDB database.
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(usr => usr.toJSON())
}


module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}
