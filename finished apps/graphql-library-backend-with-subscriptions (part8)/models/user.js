//Importing mongoose library.
const mongoose = require('mongoose')

/*Defining a Schema for the User object. */
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String
    },
})

//Exporting the defined schema for the User model.
module.exports = mongoose.model('User', schema)
