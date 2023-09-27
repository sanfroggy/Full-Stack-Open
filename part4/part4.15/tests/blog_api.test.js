/*Defining constants for mongoose, super test and app 
module to be used as "superagent", as well as other necessary
modules. */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')


describe('when there is initially some notes saved', () => {

    /*Clearing the MongoDB database blog collection and inserting 
    initialBlogs array into it. */
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

        await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

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
            .expect(400)

        blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const nonExistentId = await helper.nonExistingId()
        response = await api.delete(`/api/blogs/${nonExistentId}`)
            .expect(400)

        blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    })
})

describe('when a put request is made', () => {

    /*Creating a test using async and await to test that
    a blog is successfully updated when the request is given a valid id.  
    If given id is not valid the response has an approppriate 404 status code. */
    test('the note with the given id is succesfully updated', async () => {

        const blogsAtStart = await helper.blogsInDb()

        let updatedBlog = {
            title: 'Life as an esports pro',
            author: 'Geek99',
            url: "http://www.mygamerdiary.org",
            likes: 50213
        }

        let response = await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(updatedBlog)
            .expect(200)

        let updatedBlogs = await helper.blogsInDb()

        updatedBlog = {
            title: blogsAtStart[1].title,
            author: blogsAtStart[1].author,
            url: blogsAtStart[1].url,
            likes: blogsAtStart[1].likes + 1
        }

        response = await api.put(`/api/blogs/${blogsAtStart[1].id}`).send(updatedBlog)
            .expect(200)

        updatedBlogs = await helper.blogsInDb()

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

        const nonExistentId = await helper.nonExistingId()
        response = await api.put(`/api/blogs/${nonExistentId}`).send(updatedBlog)
            .expect(404)

    })
})

describe('when there is initially one user at db', () => {

    /*Clearing the MongoDB database User collection and 
    inserting a User into it. */
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'Jarmo Juuri', passwordHash })

        await user.save()
    })

    /*Creating a test using async and await to test that
    a user has been added to MongoDb database and that
    it has the given username. */
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'SanTheBlogger',
            name: 'Sampson',
            password: 'Apinaz368',
        }

        await api.post('/api/users').send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    /*Creating a test using async and await to test that
    the correct number of users is returned from MongoDB
    database. */
    test('correct number of users is returned', async () => {

        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(1)
    })
})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
