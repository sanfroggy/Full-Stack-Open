/*Importing the useEffect, useDispatch hooks, "action creators", the form
used to create a new anecdote, the component containing the list of anecdotes.
Filter and Notification components as well as the function to initialize the
state of anecdotes. */
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

    const dispatch = useDispatch()

    /*Using useEffect and the initializeAnecdotes method 
    imported from anecdoteReducer to get initial anecdotes
    from db.json through JSON server on first render. */
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

    /*Displaying the notification message, filter input field,
    array of anecdotes and the form used to create new ones. */
    return (
        <div>
            <h2>Anecdotes: </h2>
            <Notification />
            <br />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
