//Defining the constant for mongoose.
const mongoose = require('mongoose')

/*Define a schema to use as a model for a Blog object 
to be saved to MongoDB, as well as a refence to User
object that created the Blog object in question. */
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

/*Define the properties of the objects that are returned by the toJSON method.
Exclude the _id value as well as the MongoDB version field __v.
Also transform the value of _id from object to a string */
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//Export the Blog object model.
module.exports = mongoose.model('Blog', blogSchema)