/*Importing Apollo server, a function to start a standalone server, dotenv library
mongoose and the mongoose Schemas for Book and Author objects. */
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
require('dotenv').config()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose.set('strictQuery', false)

/*Get the password and the username strings from the MONGODB_URI enviromental variable and
use EncodeURIComponent to ensure that special characters will be escaped correctly.
Those string will be then used when forming a URL to connect to. */
const splitfirst = process.env.MONGODB_URI.split(':')
const usrindex = splitfirst.indexOf(splitfirst.find(string => string.includes('cluster')))
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

const splitsecond = splitfirst[usrindex].split('@')

const pwdindex = splitsecond.indexOf(splitsecond.find(string => string.includes('cluster')))
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

//Form an URI to connect by using the different strings.
const MONGODB_URI = `${usrstring}${encodedstring}@${splitsecond[pwdindex]}`

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

//Defining an array of Author objects.
let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e"
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e"
    },
]

/*Defining the object Schemas in a variable to be passed along to
the server. Two schemas are defined to be the object models,
one will define the query function implementations and two more define
implementations of mutations to add and to edit data. */
const typeDefs = `
    type Author {
        name: String!
        id: ID!
        bookCount: Int
        born: Int
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!      
        allBooks(author: String, genre: String): [Book!]!
        findAuthor(name: String!): Author
        allAuthors: [Author!]!
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
    }
    
    type Mutation {
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }`

/*Defining resolvers for 2 querys designed to get the length
of an array of objects, a query to find an author with a name
passed as parameter and a query to return all Book objects. Also defining
a mutation to create a new Book object entry and one to edit the birthyear
of an Author.*/
const resolvers = {

    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        findAuthor: async (root, args) =>
            Author.findOne({ name: args.name }),

        /*If allBooks contains arguments return an array filtered
        using the author's name or the genre given as an argument. */
        allBooks: async (/*root, args*/) => {

            /*let filtered = books

            if (args.author) {
                filtered = filtered.filter(b => b.author === args.author)
            }

            if (args.genre) {
                filtered = filtered.filter(b => b.genres.includes(args.genre))
            }

            return filtered*/

            return Book.find({})
        },

        allAuthors: async () => { return Author.find({}) }
    },

    /*The book object needs to find the Author object, with
    the string given as value. Array.find is used to return an
    object that has a matching name field value. */
    /*Book: {
        author: (root) => authors.find(a => a.name === root.author)
    },*/

    /*The bookCount field of the Author object is given a value
    when responding to a query. The value is gotten by comparing 
    the name string set as author in each book to the name field of
    the root Author object. The length of the filtered array is the returned. */
    /*Author: {
         bookCount: (root) => {
            return books.filter(b => 
                b.author === root.name ? b : null).length
            
        },
    },*/

    Mutation: {

        /*Defining a mutation to create a new Book object. If
        the author can be found in the array of authors, it is returned.
        If not, a new author object is created and added to the array. */
        addBook: async (root, args) => {
            /*if (!authors.find(a => a.name === args.author)) {
                const newAuthor = {
                    name: args.author,
                    id: uuid(),
                    born: null
                }

                authors = authors.concat(newAuthor)

                const book = {
                    ...args,
                    author: args.author,
                    id: uuid()
                }

                books = books.concat(book)
                return book

            } else {
                const book = {
                    ...args,
                    author: args.author,
                    id: uuid()
                }
                books = books.concat(book)
                return book
            }*/

            const book = new Book({ ...args, author: authors.find(a => a.name === args.name) })
            await book.save()

            return book
        },

        /*Defining a mutation to check if an author with the name received as an 
        argument exists and if it doesn't null is returned. If it does however
        the value of te born field of the author is replaced by the setBornTo
        received as an argument. */
        editAuthor: (root, args) => {

            const oldAuthor = authors.find(a => a.name === args.name)

            if (!oldAuthor) {
                return null
            } else {
                const newAuthor = {
                    ...oldAuthor,
                    born: args.setBornTo
                }

                authors = authors.map(a => a.name === args.name ? newAuthor : a)
                return newAuthor
            }
        }
    }
}

/*Defining a variable for the server with the defined variables
for the schemas and the resolver functions. */
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

//Starting the server at port 4000.
startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
