const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct number of blogs is returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

afterAll(async () => {
    mongoose.connection.close()
})
