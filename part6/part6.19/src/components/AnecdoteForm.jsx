//Importing the useDispatch hook and the action creators.
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessageDisplay } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    //Defining a variable for the the useDispatch hook.
    const dispatch = useDispatch()

    /*Using async/await, createAnecdote function imported from anecdoteReducer,
    setMessageDisplay function imported from notificationReducer and useDispatch hook 
    to define a function for adding an anecdote and showing a notification for 
    5 seconds using setTimeout. */
    const addAnecdote = async (event) => {

        event.preventDefault()

        const anecdoteString = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(anecdoteString))
        dispatch(setMessageDisplay(`Anecdote: ${anecdoteString} has been successfully created.`, 5))
    }

    //Returning the form to create new anecdotes.
    return (
        <div>
            <h2> Create new: </h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
