/*Defining the object Schemas in a variable to be passed along to
the server. Four schemas are defined to be the object models,
six will define the query function implementations and four more define
implementations of mutations to add and to edit data. One also defines
existing subscriptions. */
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
    }
    
    type Subscription {
        bookAdded: Book!
    }`

module.exports = typeDefs
