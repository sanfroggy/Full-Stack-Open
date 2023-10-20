//Importing the useDispatch hook and the action creators.
import { useDispatch } from 'react-redux'
import { newAnecdote, sort } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    //Defining a variable for the the useDispatch hook.
    const dispatch = useDispatch()

    //Using useDispatch hook to define a function for adding an anecdote.
    const addAnecdote = (event) => {

        event.preventDefault()

        const anecdoteString = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(anecdoteString))
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
