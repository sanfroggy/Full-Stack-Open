//Importing the useDispatch, useSelector hooks and the action creators.
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, sort } from '../reducers/anecdoteReducer'
import { setMessage, resetMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    //Defining a variable for the useDispatch hook.
    const dispatch = useDispatch()

    /*Defining a variable used to display the list of anecdotes. If
    filter state in the store is "ALL" all anecdotes are set as value
    and if not anecdotes are filtered with the filter string returned 
    as the state of the filter by the filterReducer. */
    const anecdotes = useSelector(state => {
        if (state.filter === 'ALL') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(
                state.filter.toLowerCase()) >= 0)
        }
    })

    //Using useDispatch hook to define a function for voting an anecdote.
    const vote = (id) => {
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteForAnecdote(id))
        dispatch(setMessage(`Anecdote: "${anecdote.content}" has received a vote.`))
        setTimeout(() => {
            dispatch(resetMessage())
        }, 5000)
        dispatch(sort())
    }

    /*Returning the list of anecdotes, the number of individual votes and the
    button used to add a vote. */
    return (
        anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} votes.
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => vote(anecdote.id)}>Vote</button>
                </div>
            </div>
        )
    )
}

export default AnecdoteList
