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

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
