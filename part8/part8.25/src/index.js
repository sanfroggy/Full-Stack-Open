import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,
      split} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router } from 'react-router-dom'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

/*Defining a value for the authorization header using the
imported setContext function. If a user has logged in and a
token exists in localStorage the value is set to that of the token.
If not it is set to null. */
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('libraryUserToken')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    }
})

/*Defining a variable for the HttpLink created with the 
createHttpLink function. */
const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})

/*Defining a variable for the websocket connection created with the 
GraphQlWsLink and createClient functions. */
const wsLink = new GraphQLWsLink(
    createClient({ url: 'ws://localhost:4000' })
)

//Using splitLink to use the http-, and the websocket connection.
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    authLink.concat(httpLink)
)

/*Defining an ApolloClient for the App to use, when sending 
queries to the backend. */
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
})

/*Using ApolloProvider  and Router to provide App with the necessary 
functionalities. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client} >
    <Router>
        <App />
    </Router>
    </ApolloProvider>)