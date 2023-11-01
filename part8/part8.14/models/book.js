//Importing mongoose and mongoose-unique-validator libraries.
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

/*Defining a Schema for the Book object. 
The given title must be unique in the database. */
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String }
    ]
})

//Defining the use of mongoose-unique-validator.
schema.plugin(uniqueValidator)

//Exporting the defined schema for the Book model.
module.exports = mongoose.model('Book', schema)
