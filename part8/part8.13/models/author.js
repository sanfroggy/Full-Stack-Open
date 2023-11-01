//Importing mongoose and mongoose-unique-validator libraries.
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

/*Defining a Schema for the Author object. 
The given name must be unique in the database. */
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
})

//Defining the use of mongoose-unique-validator.
schema.plugin(uniqueValidator)

//Exporting the defined schema for the Author model.
module.exports = mongoose.model('Author', schema)
