/*Importing the necessary components and the useEffect, useApolloClient 
, useNavigate, useSubscription and useState hooks. Also importing
the defined BOOK_ADDED subscription. */
import Notification from './components/Notification'
import Authors from './components/Authors'
import Books from './components/Books'
import RecommendedBooks from './components/RecommendedBooks'
import { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from './services/subscriptions'
import { ALL_BOOKS } from './services/queries'

const App = () => {

    //Defining "state variables" for the token and a potential error message.
    const [token, setToken] = useState(localStorage.getItem('libraryUserToken'))
    const [message, setMessage] = useState('')

    const client = useApolloClient()

    /*Using the useSubscription hook to defined a subscription. The defined subscription
    will inform the user when a book is added to the database. */
    useSubscription(BOOK_ADDED, {
        onData: ({ data }) => {
            window.alert(`The book ${data.data.bookAdded.title} by
            ${data.data.bookAdded.author.name} was
            recently added to the list of books.`)

            /*Updating the client cache as the book is added, so that the new book 
            is rendered immediately. */
            client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
                return {
                    allBooks: allBooks.concat(data.data.bookAdded),
                }
            })
        }
    })

    /*Defining a Logout component used only to setToken to null, clear local storage,
    resetStore for client allowing the user to logout and navigate to the LoginForm. */
   const Logout = () => {

        const navigate = useNavigate()
        const client = useApolloClient()

        useEffect(() => {
            setToken(null)
            localStorage.clear()
            client.resetStore()
            navigate('/login')
        }, [])

   }

  /*Returning Links and Routes for page navigation and a Notification component to
  display an error message when necessary. */
  return (
    <div>
      <div>
        <Link to='/authors'>Authors</Link>&nbsp;&nbsp;&nbsp;
        <Link to='/books'>Books</Link>&nbsp;&nbsp;&nbsp;
        {token ? <Link to='/create'>Add book</Link> :
                 <Link to='/login'>Login</Link>} &nbsp;&nbsp;&nbsp;
        {token ? <Link to='/foryou'>Recommended</Link> :
                  null} &nbsp;&nbsp;&nbsp;
        {token ? <Link to='/logout'>Logout</Link> :
                  null}
        <br />
        <br />
        <Notification message={message} />
      </div>

          <Routes>
              <Route path='/authors' element={<Authors token={token} setMessage={setMessage} />} />
              <Route path='/books' element={<Books />} />
              <Route path='/foryou' element={<RecommendedBooks /> } />
              <Route path='/' element={<Books />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/create' element={<NewBook setMessage={setMessage} />} />
              <Route path='/login' element={<LoginForm setToken={setToken} setMessage={setMessage} />} />
          </Routes>
    </div>
  )
}

export default App
