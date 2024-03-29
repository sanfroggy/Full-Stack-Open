//Importing the useDispatch hook and the action creators.
import { useDispatch } from 'react-redux'
import { newAnecdote, sort } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    //Defining a variable for the the useDispatch hook.
    const dispatch = useDispatch()

    /*Using async/await, createNew defined in anecdoteService and
    useDispatch hook to define a function for adding an anecdote and
    show a notification for 5 seconds using setTimeout. */
    const addAnecdote = async (event) => {

        event.preventDefault()

        const anecdoteString = event.target.anecdote.value
        event.target.anecdote.value = ''
        const anecdoteObj = await anecdoteService.createNew(anecdoteString)
        dispatch(newAnecdote(anecdoteObj))
        dispatch(setMessage(`Anecdote: ${anecdoteString} has been successfully created.`))
        setTimeout(() => {
            dispatch(resetMessage())
        }, 5000)
        dispatch(sort())
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
