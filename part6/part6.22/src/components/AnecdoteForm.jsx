//Importing the createAnecdote, useMutation and useQueryClient functions.
import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const AnecdoteForm = () => {

    /*Defining variables for useQueryClient and useMutation, that are used to
    add a newAnecdote with the createAnecdote function and to have the list update 
    immediately after a successful operation with invalidateQueries. */
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({mutationFn: createAnecdote,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        }
    })

    /*Defining a method for creating a new Anecdote
    when the button is pressed and the form is submitted. */
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({ content, votes: 0 })
    }

    /*Returning a form containing an input field and a 
    submit button. */
    return (
        <div>
        <h3>Create new</h3>
        <form onSubmit={newAnecdote}>
            <input name='anecdote' />
            <button type="submit">Create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
