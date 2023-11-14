/*Importing WebSocketServer, useServer function, Apollo server, expressMiddleware, ApolloServerPluginDrainHttpServer
plugin, makeExecutableSchema function, express, cors, http, mongoosedotenv and jsonwebtoken libraries,
User mongoose model, as well as typeDefs containing schema definitions and resolvers containing resolver 
definitions. */
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

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


/*Defining a start variable for starting the server inside an async function
so that the graphQLServer is started before the Express application starts listening
to the port, as is required. A websocket server is used when subscriptions happen,
but GraphQL server still handles queries and mutations. */

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/'
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    /*Configuring the Apollo GraphQL server. The defined plugin
    is used to ensure that the server shuts down properly.
    When the GraphQL server shuts down the WebSocketServer is also
    shut down. */
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    })

    await server.start()

    /*Defining the context of the server, handling the authorization and
    returning the data of a logged in user. Also defining express and
    cors, so that there will be no cross-origin-resource-sharing issues. */
    app.use('/',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const auth = req ? req.headers.authorization : null
                if (auth && auth.startsWith('Bearer ') || auth.startsWith('bearer ')) {
                    const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
                    const loggedUser = await User.findById(decodedToken.id)
                    return { loggedUser }
                }
            },
        }),
    )

    //LIstening to port 4000.
    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log(`Server is now running on http://localhost:${PORT}`)
    )
}

//Calling the defined start function.
start()
