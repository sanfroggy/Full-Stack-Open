//Defining the constants for mongoose and User.
const mongoose = require('mongoose')
const User = require('./user')

/*Define a schema to use as a model for a Blog object 
to be saved to MongoDB, a refence to User object that created 
the Blog object in question as well as references
to an array of Comment objects. */
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
})

/*Define the properties of the objects that are returned by the toJSON method.
Exclude the _id value as well as the MongoDB version field __v.
Also transform the value of _id from object to a string */
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

//Export the Blog object model.
module.exports = mongoose.model('Blog', blogSchema)
