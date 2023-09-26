/*Defining constants for mongoose, super test and app 
module to be used as "superagent". */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

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

/*Clearing the MongoDB database and inserting initialBlogs
array into it. */
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)

})

/*Creating a test using async and await to test that
the correct number of blogs is returned from MongoDB
database. */
test('correct number of blogs is returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
