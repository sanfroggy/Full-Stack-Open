//Importing the createAnecdote, useMutation and useQueryClient functions.
import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMessageDispatch } from './MessageContext'

const AnecdoteForm = () => {

    const messageDispatch = useMessageDispatch()

    /*Defining variables for useQueryClient and useMutation, that are used to
    add a newAnecdote with the createAnecdote function and to have the list update 
    immediately after a successful operation with invalidateQueries. On error
    the imported useMessageDispatch function is used to display an error message.*/
    const queryClient = useQueryClient()
    const newAnecdoteMutation = useMutation({mutationFn: createAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
        onError: (response) => { 
            const payload = response.response.data.error
            messageDispatch({
                type: 'SHOW', payload
            })
            setTimeout(() => {
                messageDispatch({
                    type: 'HIDE'
                })
            }, 5000)
        }
    })

    /*Defining a method for creating a new Anecdote
    when the button is pressed and the form is submitted. */
    const newAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        newAnecdoteMutation.mutate({ content, votes: 0 })

        /*Creating a method for showing and hiding the Notification 
        component, with the use of setTimeout, useReducer and useContext. */
        const payload = `${content} has successfully been added.`
        messageDispatch({
            type: 'SHOW', payload
        })
        setTimeout(() => {
            messageDispatch({
                type: 'HIDE'
            })
        }, 5000)
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
