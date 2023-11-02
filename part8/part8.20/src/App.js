/*Importing the necessary components and the useEffect, useApolloClient 
and useState hooks. */
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

const App = () => {

    //Defining "state variables" for the token and a potential error message.
    const [token, setToken] = useState(localStorage.getItem('libraryUserToken'))
    const [message, setMessage] = useState('')

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
