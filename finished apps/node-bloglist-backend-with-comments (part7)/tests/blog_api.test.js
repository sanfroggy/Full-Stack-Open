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
    initialBlogs array into it. Also clearing the MongoDB database
    User collection and inserting a User into it. */
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'Jarmo Juuri', passwordHash })

        await user.save()
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

        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })
})

describe('when a post request is made', () => {
    beforeEach(async () => {
        if (!User.find({ username: 'root' })) {
            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', name: 'Jarmo Juuri', passwordHash })

            await user.save()
        }
    })

    /*Creating a test using async and await to test that
    a new blog is added to the database when a post request is
    sent and that the data is in json form. */
    test('blogs can be added to the database successfully', async () => {
        const newBlog = {
            title: 'A blog about software testing',
            author: 'San',
            url: 'http://www.mytestblog.com',
            likes: 3560,
        }

        const userInfo = {
            username: 'root',
            password: 'sekret',
        }

        const response = await api.post('/api/login').send(userInfo)
        const token = response.body.token

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    /*Creating a test using async and await to test that
    if a new blog is added to the database without having
    a value, having null or undefined for likes, that value is set 
    to zero. */
    test('if the added blog is not given a value for likes it is' + ' set to zero', async () => {
        const userInfo = {
            username: 'root',
            password: 'sekret',
        }

        const loginResponse = await api.post('/api/login').send(userInfo)
        const token = loginResponse.body.token

        const newBlog = {
            title: 'A blog no one likes',
            author: 'Unknown',
            url: 'http://www.conspiracytheorist.net',
        }

        let response = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`)

        expect(response.body.likes).toBe(0)

        const anotherNewBlog = {
            title: 'Cooking magnificent food',
            author: 'HomeChef',
            url: 'http://www.foodfanatics.org',
            likes: null,
        }

        response = await api.post('/api/blogs').send(anotherNewBlog).set('Authorization', `bearer ${token}`)

        expect(response.body.likes).toBe(0)

        const yetAnotherNewBlog = {
            title: 'Pet pictures',
            author: 'CCL',
            url: 'http://www.crazycatlady.com',
            likes: undefined,
        }

        response = await api.post('/api/blogs').send(yetAnotherNewBlog).set('Authorization', `bearer ${token}`)

        expect(response.body.likes).toBe(0)
    })

    /*Creating a test using async and await to test that
    if a new blog is not given a title or a url, or they have 
    null or undefined value, the response has an approppriate
    400 status code. */
    test(
        'if the added blog is not given a value for title or url a' + ' response is invoked with status code 400.',
        async () => {
            let newBlog = {
                author: 'Unknown',
                url: 'http://www.untitled.net',
                likes: 5000,
            }

            const userInfo = {
                username: 'root',
                password: 'sekret',
            }

            const loginResponse = await api.post('/api/login').send(userInfo)
            const token = loginResponse.body.token

            let response = await api
                .post('/api/blogs')
                .send(newBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(400)

            let anotherNewBlog = {
                title: 'Blog without an url',
                author: 'Unknown',
                likes: 0,
            }

            response = await api
                .post('/api/blogs')
                .send(anotherNewBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(400)

            newBlog.title = null

            response = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(400)

            newBlog.title = undefined

            response = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(400)

            anotherNewBlog.url = null

            response = await api
                .post('/api/blogs')
                .send(anotherNewBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(400)

            anotherNewBlog.url = undefined

            response = await api
                .post('/api/blogs')
                .send(anotherNewBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(400)

            anotherNewBlog.title = null

            response = await api
                .post('/api/blogs')
                .send(anotherNewBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(400)

            newBlog.title = 'A blog with a title'

            response = await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(201)

            anotherNewBlog.title = 'A blog that now has an url.'
            anotherNewBlog.url = 'http://www.ablogwithanurl.com'

            response = await api
                .post('/api/blogs')
                .send(anotherNewBlog)
                .set('Authorization', `bearer ${token}`)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 6)
        },
    )

    test('blogs cannot be added if the token is missing or invalid', async () => {
        const newBlog = {
            title: 'Amish Life',
            author: 'Yankowich',
            url: 'http://www.lifeinamishsociety.org',
            likes: 12032,
        }

        const userInfo = {
            username: 'root',
            password: 'sekret',
        }

        const response = await api.post('/api/login').send(userInfo)
        const token = response.body.token

        await api.post('/api/blogs').send(newBlog).expect(401)

        await api.post('/api/blogs').send(newBlog).set('Authorization', token).expect(401)

        await api.post('/api/blogs').send(newBlog).set('Authorization', 'token').expect(401)

        await api.post('/api/blogs').send(newBlog).set('Authorization', `bearer ${token}`).expect(201)
    })
})

describe('when a delete request is made', () => {
    beforeEach(async () => {
        if (!User.find({ username: 'root' })) {
            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', name: 'Jarmo Juuri', passwordHash })

            await user.save()
        }
    })

    /*Creating a test using async and await to test that
    a blog is successfully deleted when the request is given a valid id.  
    If not the response has an approppriate 404 status code. */
    test('the first note created by a user is succesfully deleted', async () => {
        const userInfo = {
            username: 'root',
            password: 'sekret',
        }

        const loginResponse = await api.post('/api/login').send(userInfo)

        const token = loginResponse.body.token

        const blogsAtStart = await helper.blogsInDb()

        let response = await api
            .delete(`/api/blogs/${blogsAtStart[3].id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        let blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
        expect(blogsAtEnd.map((blog) => blog.id)).not.toContain(blogsAtStart[3].id)

        response = await api
            .delete(`/api/blogs/${blogsAtStart[3].id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(500)

        blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const nonExistentId = await helper.nonExistingId()
        response = await api.delete(`/api/blogs/${nonExistentId}`).set('Authorization', `bearer ${token}`).expect(500)

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
            url: 'http://www.mygamerdiary.org',
            likes: 50213,
        }

        let response = await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(updatedBlog).expect(200)

        let updatedBlogs = await helper.blogsInDb()

        updatedBlog = {
            title: blogsAtStart[1].title,
            author: blogsAtStart[1].author,
            url: blogsAtStart[1].url,
            likes: blogsAtStart[1].likes + 1,
        }

        response = await api.put(`/api/blogs/${blogsAtStart[1].id}`).send(updatedBlog).expect(200)

        updatedBlogs = await helper.blogsInDb()

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

        const nonExistentId = await helper.nonExistingId()
        response = await api.put(`/api/blogs/${nonExistentId}`).send(updatedBlog).expect(404)
    })
})

describe('when there is initially one user at db', () => {
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

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    /*Creating a test using async and await to test that
    the correct number of users is returned from MongoDB
    database. */
    test('correct number of users is returned', async () => {
        const response = await api.get('/api/users')

        expect(response.body).toHaveLength(2)
    })
})

describe('when a post request is made to add a user', () => {
    /*Creating a test using async and await to test that
    the user will not be saved to MongoDB database,
    if the username or password are too short or they are missing
    valid values entirely. Also checking that there are no
    other users in the database with the same name. */
    test('if necessary data is missing or faulty, ' + 'the user cannot be added', async () => {
        let newUser = {
            name: 'Sampson',
            password: 'Apinaz368',
        }

        let response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Username cannot have an empty value.')

        newUser.username = null

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Username cannot have an empty value.')

        newUser.username = undefined

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Username cannot have an empty value.')

        newUser.username = 'SN'

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Username must contain at least 3 characters.')

        newUser.username = 'San'

        response = await api.post('/api/users').send(newUser).expect(201)

        newUser = {
            username: 'Useri',
            name: 'Professori',
        }

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Password must have a value of at least 3 characters.')

        newUser.password = null

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Password must have a value of at least 3 characters.')

        newUser.password = undefined

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Password must have a value of at least 3 characters.')

        newUser.password = 'pw'

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('Password must have a value of at least 3 characters.')

        newUser.password = 'pwd'

        response = await api.post('/api/users').send(newUser).expect(201)

        newUser = {
            username: 'SanTheBlogger',
            name: 'Sampson',
            password: 'Jabadabaduu',
        }

        response = await api.post('/api/users').send(newUser).expect(400)
        expect(response.error.text).toContain('expected `username` to be unique')
    })

    /*Creating a test using async and await to test that
    the blogs array and user property are defined correctly.
    Also testing that they are filled correctly when populating 
    on receiving a get request. */
    test('user related blogs and blog related users are defined and ' + 'populated correctly.', async () => {
        const blogs = await (await api.get('/api/blogs')).body
        let userofblogs = []
        blogs.forEach((blog) => {
            if (blog.user !== null && blog.user !== undefined) {
                if (userofblogs.length === 0) {
                    userofblogs[0] = blog.user
                } else {
                    userofblogs.concat(blog.user)
                }
            }
        })
        const users = await (await api.get('/api/users')).body
        const blogsofauser = users[0].blogs
        expect(blogsofauser).toContainEqual({
            author: blogs[4].author,
            id: blogs[4].id,
            title: blogs[4].title,
            url: blogs[4].url,
        })

        expect(blogsofauser).toHaveLength(6)

        expect(userofblogs).toContainEqual({
            id: users[0].id,
            username: users[0].username,
            name: users[0].name,
        })

        expect(userofblogs).toHaveLength(1)
    })
})

//Closing the MongoDB connection.
afterAll(async () => {
    mongoose.connection.close()
})
