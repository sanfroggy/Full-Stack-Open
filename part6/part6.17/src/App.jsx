/*Importing the useSelector, useDispatch hooks, "action creators" and the form
used to create a new anecdote. */
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
