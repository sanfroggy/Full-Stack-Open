//Define constants for bcrypt, express Router and the user module.
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/*Define the route for saving a new user with async / await, 
and use bcrypt to hash the given password. */
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

//Define the route for getting users from MongoDB.
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter
