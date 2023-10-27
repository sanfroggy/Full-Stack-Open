//Importing Apollo server and a function to start a standalone server.
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

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

//Defining an array of Book objects.
let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

/*Defining the object Schemas in a variable to be passed along to
the server. Two schemas are defined to be the object models and
one will define the query function implementations. */
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
        allBooks(author: String): [Book!]!
        findAuthor(name: String!): Author
        allAuthors: [Author!]!
    }`

/*Defining resolvers for 2 querys designed to get the length
of an array of objects, a query to find an author with a name
passed as parameter and a query to return all Book objects. */
const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        findAuthor: (root, args) =>
            authors.find(a => a.name === args.name),
        allBooks: (root, args) => 
            args.author ? books.filter(b => b.author === args.author) : books,
        allAuthors: () => authors
    },

    /*The book object needs to find the Author object, with
    the string given as value. Array.find is used to return an
    object that has a matching name field value. */
    Book: {
        author: (root) => authors.find(a => a.name === root.author)
    },

    /*The bookCount field of the Author object is given a value
    when responding to a query. The value is gotten by comparing 
    the name string set as author in each book to the name field of
    the root Author object. The length of the filtered array is the returned. */
    Author: {
        bookCount: (root) => {
            return books.filter(b => 
                    b.author === root.name ? b : null).length
            
        },
    },
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
