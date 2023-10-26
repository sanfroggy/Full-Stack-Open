//Defining a const for mongoose
const mongoose = require('mongoose')

//Set up mongoose.
mongoose.set('strictQuery', false)


/*Get the password and the username strings from the MONGODB_URI enviromental variable and
use EncodeURIComponent to ensure that special characters will be escaped correctly.
Those string will be then used when forming a URL to connect to. */

// eslint-disable-next-line no-undef
let splitfirst = process.env.MONGODB_URI.split(':')
let usrindex = splitfirst.indexOf(splitfirst.find(string => string.includes('cluster')))
let usrstring = ''

for (var i = 0; i < usrindex; i++) {
  if (splitfirst.length > 3) {
    if (i === 1) {
      usrstring += '://' + encodeURIComponent(splitfirst[i].substring(2) + ':')
    } else {
      if (i !== usrindex - 1 && i > 0) {
        usrstring += encodeURIComponent(splitfirst[i] + ':')
      } else {
        if (i === usrindex - 1) {
          usrstring += encodeURIComponent(splitfirst[i]) + ':'
        } else {
          usrstring += splitfirst[i]
        }
      }
    }
  } else {
    if (i === 1) {
      usrstring += '://' + encodeURIComponent(splitfirst[i].substring(2)) + ':'
    } else {
      if (i > 0) {
        usrstring += encodeURIComponent(splitfirst[i]) + ':'
      } else {
        usrstring += splitfirst[i]
      }
    }
  }
}

let splitsecond = splitfirst[usrindex].split('@')

let pwdindex = splitsecond.indexOf(splitsecond.find(string => string.includes('cluster')))
let encodedstring = ''

for (i = 0; i < pwdindex; i++) {
  if (splitsecond.length > 2) {
    if (i !== pwdindex - 1) {
      encodedstring += encodeURIComponent(splitsecond[i] + '@')
    } else {
      encodedstring += encodeURIComponent(splitsecond[i])
    }
  } else {
    encodedstring += encodeURIComponent(splitsecond[i])
  }
}

const url = `${usrstring}${encodedstring}@${splitsecond[pwdindex]}`

//Connect to MongoDB and print a message for successful and failed attempts.
console.log('connecting to', url)
mongoose.connect(url)

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

/*Define a schema to use as a model for a Contact object to be saved to MongoDB
and the appropriate validators. */
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'The name given must have a minimum of 3 characters.'],
    required: [true, 'Name cannot have an empty value.']
  },
  number: {
    type: String,
    minlength: [8, 'Number given must have a minimum of 8 characters.'],

    /*Defining a validator function to check that the give input follows the
        correct pattern. */
    validate: {
      validator: function (v) {
        return /^\d{2,2}-\d{6}/.test(v) && /-\d+$/.test(v) ||
                    /^\d{3,3}-\d{5}/.test(v) && /-\d+$/.test(v)
      },
      message: 'Number must be of format dd-dddddd or ddd-ddddd. ' +
                'Last part can have more digits than in the given example.'
    },
    required: [true, 'Number cannot have an empty value.']

  }
})

/*Define the properties of the objects that are returned by the toJSON method.
Exclude the _id value as well as the MongoDB version field __v.
Also transform the value of _id from object to a string */
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id,
    delete returnedObject.__v
  }
})

//Exporting the Contact model.
module.exports = mongoose.model('Contact', contactSchema)