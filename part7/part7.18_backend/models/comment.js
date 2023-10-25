//Defining the constants for mongoose and Comment.
const mongoose = require('mongoose')
const Comment = require('./comment')

/*Define a schema to use as a model for a Comment object 
to be saved to MongoDB. */
const commentSchema = new mongoose.Schema({
    content: String,
})

/*Define the properties of the objects that are returned by the toJSON method.
Exclude the _id value as well as the MongoDB version field __v.
Also transform the value of _id from object to a string */
commentSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Comment', commentSchema)
