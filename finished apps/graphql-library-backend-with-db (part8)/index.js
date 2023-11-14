/*Importing Apollo server, a function to start a standalone server, dotenv library
mongoose, jsonwebtoken and the mongoose models for Book, User and Author objects. */
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

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
the server. Four schemas are defined to be the object models,
six will define the query function implementations and four more define
implementations of mutations to add and to edit data. */
const typeDefs = `

    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }

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
        me: User
    }
    
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }`

/*Defining resolvers for 2 querys designed to get the length
of a collection of odocuments in the database, 
a query to find an author with a name passed as parameter, a query to
get the currently logged in user and a query to return all Book and 
all Author objects. Also defining a mutation to create a new User object entry,
a new Book object entry, one to login and one to edit the birthyear of an Author.*/
const resolvers = {

    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        findAuthor: async (root, args) =>
            Author.findOne({ name: args.name }),
        me: (root, args, context) => { return context.loggedUser },

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

        /*Defining a mutation to create a new User object. If
        the given parameters are invalid a GraphQLError is thrown
        with an appropriate error message. */
        createUser: async (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating a user failed. Username must have at least' +
                        ' 3 characters and a favorite genre must be provided. ', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: [args.username, args.favoriteGenre],
                            error
                        }
                    })
                })
        },

        /*Defining a mutation for that receives a username and password as an argument.
        The parameters are then validated and on succesful validation an authorization token
        is returned using jsonwebtoken. */
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret123') {
                throw new GraphQLError('Invalid username or password', {
                    extensions: {
                        code: 'BAD_USER_INPUT'
                    }
                })
            }

            return { value: jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET) }
        },

        /*Defining a mutation to create a new Book object. If
        the author can be found in the database, it is returned.
        If not, a new author object is created and added to the database. */
        addBook: async (root, args, context) => {

            let author = await Author.findOne({ name: args.author })
            const loggedUser = context.loggedUser


            /*If a valid token is not received in context meaning a user is not logged in
            a GraphQLError with an appropriate error message is thrown. */
            if (!loggedUser) {
                throw new GraphQLError('Not logged in. Please log in with a valid user.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            /*If an author with a given name is not found a new author is created. This author has
            a null value for the born field. */
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

            /*If an author with a given name is found the id of the author is added as a reference
            to the author field of the created book. */
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
        editAuthor: async (root, args, context) => {

            const oldAuthor = await Author.findOne({ name: args.name })

            const loggedUser = context.loggedUser

            /*If a valid token is not received in context meaning a user is not logged in
            a GraphQLError with a proper error message is thrown. */
            if (!loggedUser) {
                throw new GraphQLError('Not logged in. Please log in with a valid user.', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

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

/*Starting the server at port 4000. Also defining context for the server
to store data of a logged in user if a valid token is provided with a request. */
startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ') || auth.startsWith('bearer ')) {
            const decodedToken = jwt.verify(
                auth.substring(7), process.env.JWT_SECRET
            )
            const loggedUser = await User
                .findById(decodedToken.id)
            return { loggedUser }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
