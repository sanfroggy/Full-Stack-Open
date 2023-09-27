//Defining the constant for mongoose.
const mongoose = require('mongoose')

/*Define a schema to use as a model for a User object 
to be saved to MongoDB, as well as a refence to Blog
objects created by that user. */
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
})

/*Define the properties of the objects that are returned by the toJSON method.
Exclude the _id value as well as the MongoDB version field __v and the 
passwordHash. Also transform the value of _id from object to a string */
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User