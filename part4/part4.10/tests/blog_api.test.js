/*Defining constants for mongoose, super test and app 
module to be used as "superagent". */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

/*Creating a test using async and await to test that
the correct number of blogs is returned from MongoDB
database. */
test('correct number of blogs is returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('the idenfitying field for a blog is id and not _id', async () => {

    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })  
})

test('blogs can be added to the database successfully', async () => {

    const comparisonResponse = await api.get('/api/blogs')
    const originalLength = comparisonResponse.body.length

    const newBlog = {
        title: 'A blog about software testing',
        author: 'San',
        url: "http://www.mytestblog.com",
        likes: 3560
    }

    await api.post('/api/blogs').send(newBlog)
        .expect('Content-Type', /application\/json/)
        
    const newResponse = await api.get('/api/blogs')

    expect(newResponse.body.length).toBe(originalLength + 1)

})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
