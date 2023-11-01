/*Importing Apollo server, a function to start a standalone server, dotenv library
mongoose and the mongoose models for Book and Author objects. */
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()

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
of a collection of odocuments in the database, 
a query to find an author with a name passed as parameter and a query 
to return all Book objects. Also defining a mutation to create a new Book
object entry and one to edit the birthyear of an Author.*/
const resolvers = {

    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        findAuthor: async (root, args) =>
            Author.findOne({ name: args.name }),

        /*If allBooks contains arguments return an array filtered
        using the author's name, the genre or both given as an argument. */
        allBooks: async (root, args) => {

            if (args.author && !args.genre) {
                let filteredByAuthor = await Book.find({}).populate('author', { name: 1, born: 1 })
                filteredByAuthor = filteredByAuthor.filter(b => b.author.name === args.author)
                return filteredByAuthor
            }

            if (args.genre && !args.author) {
                return await Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1 })
            }

            if (args.genre && args.author) {
                let filtered = await Book.find({}).populate('author', { name: 1, born: 1 })
                filtered = filtered.filter(b => b.author.name === args.author)
                return filtered.filter(b => b.genres.includes(args.genre) ? b : null)
            }

            return await Book.find({}).populate('author', { name: 1, born: 1 })
        },

        allAuthors: async () => {

            return Author.find({})
        },
    },

    /*The bookCount field of the Author object is given a value
    when responding to a query. The value is gotten by comparing 
    the id string set as author in each book to the id field of
    the root Author object. The length of the filtered array is the returned. */
    Author: {
         bookCount: async (root) => {
            const all = await Book.find({}).populate('author', { name: 1, born: 1 })
            return all.filter(b =>
                b.author.id === root.id ? b : null).length
        },
    },

    Mutation: {

        /*Defining a mutation to create a new Book object. If
        the author can be found in the database, it is returned.
        If not, a new author object is created and added to the database. */
        addBook: async (root, args) => {

            let author = await Author.findOne({ name: args.author })

            if (!author) {
                const newAuthor = new Author({
                    name: args.author,
                    born: null
                })

                /*Checking if correct parameters are provided for the author of the book to
                be created and throwing a GraphQLError if that is not the case. */
                try { 
                    await newAuthor.save()
                } catch (error) {
                    throw new GraphQLError('Creating an author failed. Name must have at least' +
                        ' 4 characters and must be unique. ', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: [args.author],
                            error
                        }
                    })
                }

                author = await Author.findOne({ name: args.author })

                const book = new Book({
                    ...args,
                    author: author.id
                })

                /*Checking if correct parameters are provided for the book to
                be created and throwing a GraphQLError if that is not the case. */
                try {
                    await book.save()
                } catch (error) {
                    throw new GraphQLError('Adding book failed. Title must have at least' +
                    ' 5 characters and must be unique. Data for author and year of publication must also be provided.', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: [args.title, args.author, args.published, args.genres],
                            error
                        }
                    })
                }

                return book.populate('author', { name: 1, born: 1 })

            } else {
                const book = new Book({ ...args, author: author.id })

                /*Checking if correct parameters are provided for the book to
                be created and throwing a GraphQLError if that is not the case. */
                try {
                    await book.save()
                } catch (error) {
                    throw new GraphQLError('Adding book failed. Title must have at least' +
                        ' 5 characters and must be unique. Data for year of publication must also be provided.', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: [args.title, args.published, args.genres],
                            error
                        }
                    })
                }

                return book.populate('author', { name: 1, born: 1 })
            }

        },

        /*Defining a mutation to check if an author with the name received as an 
        argument exists and if it doesn't null is returned. If it does however
        the value of te born field of the author is replaced by the setBornTo
        received as an argument. */
        editAuthor: async (root, args) => {

            const oldAuthor = await Author.findOne({ name: args.name })

            /*If an author is not found with the name given as a parameter
            a GraphQLError is thrown. Otherwise the number of that author is updated. */
            if (!oldAuthor) {
                throw new GraphQLError('Invalid author name provided. Author does not exist. ', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: [args.name]
                    }
                })
            } else {
                const newAuthor = {
                    name: oldAuthor.name,
                    born: args.setBornTo
                }
                return Author.findByIdAndUpdate(
                        oldAuthor.id, newAuthor, { new: true })
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
