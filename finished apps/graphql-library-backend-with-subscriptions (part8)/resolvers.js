/*Importing the mongoose models for Book, Author and User objects. Also
importing GraphQLError to handle errors, jwt for token handling
and PubSub object for using subscriptions. */
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub()

/*Defining resolvers for 2 querys designed to get the length
of a collection of odocuments in the database, 
a query to find an author with a name passed as parameter, a query to
get the currently logged in user and a query to return all Book and 
all Author objects. Also defining a mutation to create a new User object entry,
a new Book object entry, one to login and one to edit the birthyear of an Author,
as well as 1 subsription. */
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

            if (!user || args.password !== 'secret') {
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

                //Publishing the data of a new book added using the defined subscription bookAdded with pubsub.
                pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author', { name: 1, born: 1 }) })

                //Returning a book object populated with the data of it's Author.
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

                //Publishing the data of a new book added using the defined subscription bookAdded with pubsub.
                pubsub.publish('BOOK_ADDED', { bookAdded: book.populate('author', { name: 1, born: 1 } )})

                //Returning a book object populated with the data of it's Author.
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
    },

    /*Defining a subscription bookAdded used to notify clients 
    when a book is added and send the data of the new book. */
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers
