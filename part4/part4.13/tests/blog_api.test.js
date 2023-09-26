/*Defining constants for mongoose, super test and app 
module to be used as "superagent". */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


describe('when there is initially some notes saved', () => {
    /*Clearing the MongoDB database and inserting initialBlogs
    array into it. */
    beforeEach(async () => {

        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

    })

    /*Creating a test using async and await to test that
    the correct number of blogs is returned from MongoDB
    database. */
    test('correct number of blogs is returned', async () => {

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
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
})

describe('when a post request is made', () => {

    /*Creating a test using async and await to test that
    a new blog is added to the database when a post request is
    sent and that the data is in json form. */
    test('blogs can be added to the database successfully', async () => {

        const newBlog = {
            title: 'A blog about software testing',
            author: 'San',
            url: "http://www.mytestblog.com",
            likes: 3560
        }

        const response = await api.post('/api/blogs').send(newBlog)
            .expect(201)
        //expect(response.headers('Content-Type')).toContain(/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    })

    /*Creating a test using async and await to test that
    if a new blog is added to the database without having
    a value, having null or undefined for likes, that value is set 
    to zero. */
    test('if the added blog is not given a value for likes it is'
        + ' set to zero', async () => {

            const newBlog = {
                title: 'A blog no one likes',
                author: 'Unknown',
                url: "http://www.conspiracytheorist.net"
            }

            let response = await api.post('/api/blogs').send(newBlog)
            expect(response.body.likes).toBe(0)

            const anotherNewBlog = {
                title: 'Cooking magnificent food',
                author: 'HomeChef',
                url: "http://www.foodfanatics.org",
                likes: null
            }

            response = await api.post('/api/blogs').send(anotherNewBlog)
            expect(response.body.likes).toBe(0)

            const yetAnotherNewBlog = {
                title: 'Pet pictures',
                author: 'CCL',
                url: "http://www.crazycatlady.com",
                likes: undefined
            }

            response = await api.post('/api/blogs').send(yetAnotherNewBlog)

            expect(response.body.likes).toBe(0)

        })

    /*Creating a test using async and await to test that
    if a new blog is not given a title or a url, or they have 
    null or undefined value, the response has an approppriate
    400 status code. */
    test('if the added blog is not given a value for title or url a' +
        ' response is invoked with status code 400.', async () => {

            let newBlog = {
                author: 'Unknown',
                url: "http://www.untitled.net",
                likes: 5000
            }

            let response = await api.post('/api/blogs').send(newBlog)
                .expect(400)

            let anotherNewBlog = {
                title: 'Blog without an url',
                author: 'Unknown',
                likes: 0
            }

            response = await api.post('/api/blogs').send(anotherNewBlog)
                .expect(400)

            newBlog.title = null

            response = await api.post('/api/blogs').send(newBlog)
                .expect(400)

            newBlog.title = undefined

            response = await api.post('/api/blogs').send(newBlog)
                .expect(400)

            anotherNewBlog.url = null

            response = await api.post('/api/blogs').send(anotherNewBlog)
                .expect(400)

            anotherNewBlog.url = undefined

            response = await api.post('/api/blogs').send(anotherNewBlog)
                .expect(400)

            anotherNewBlog.title = null

            response = await api.post('/api/blogs').send(anotherNewBlog)
                .expect(400)

            newBlog.title = 'A blog with a title'

            response = await api.post('/api/blogs').send(newBlog)
                .expect(201)

            anotherNewBlog.title = 'A blog that now has an url.'
            anotherNewBlog.url = 'http://www.ablogwithanurl.com'

            response = await api.post('/api/blogs').send(anotherNewBlog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 6)

    })
})

describe('when a delete request is made', () => {

    /*Creating a test using async and await to test that
    a blog is successfully deleted when the request is given a valid id.  
    If not the response has an approppriate 404 status code. */
    test('the first note is succesfully deleted', async () => {

        const blogsAtStart = await helper.blogsInDb()

        let response = await api.delete(`/api/blogs/${blogsAtStart[0].id}`)
            .expect(204)

        let blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        expect(blogsAtEnd.map(blog => blog.id)).not.toContain(blogsAtStart[0].id)

        response = await api.delete(`/api/blogs/${blogsAtStart[0].id}`)
            .expect(404)

        blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        response = await api.delete(`/api/blogs/${helper.nonExistingId}`)
            .expect(404)

        blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)


    })
})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
