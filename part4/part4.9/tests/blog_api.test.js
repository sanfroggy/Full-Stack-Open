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

/*Creating a test using async and await to test that
a id field exists for each of the blogs instead of an
_id field. */
test('the idenfitying field for a blog is id and not _id', async () => {

    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })  
})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
