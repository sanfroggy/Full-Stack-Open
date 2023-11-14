import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'

/*Defining an ApolloClient for the App to use, when sending 
queries to the backend. */
const client = new ApolloClient({
    uri: 'http://localhost:4000',
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