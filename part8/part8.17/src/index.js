import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router } from 'react-router-dom'

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

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
})

/*Defining an ApolloClient for the App to use, when sending 
queries to the backend. */
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

/*Using ApolloProvider  and Router to provide App with the necessary 
functionalities. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <ApolloProvider client={client} >
    <Router>
        <App />
    </Router>
    </ApolloProvider>)
