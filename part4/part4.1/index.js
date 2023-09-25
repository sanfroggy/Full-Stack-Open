//Defining the constants for the use of Express, cors, and mongoose.
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

/*Define a schema to use as a model for a Blog object to be saved to MongoDB. */
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

/*Define a password constant given as argument on startup as well
and use it to from a url to connect to. */
const pwd = encodeURIComponent(process.argv[2])
const mongoUrl = `mongodb+srv://San:${pwd}@cluster0.od5jh2q.mongodb.net/blogListApp?retryWrites=true&w=majority`
mongoose.connect(mongoUrl)

//Define the use of cors and express json parser middlewares.
app.use(cors())
app.use(express.json())

//Define the routes for getting blogs from MongoDB and saving a new one.
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

//Define a port to listen to.
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
