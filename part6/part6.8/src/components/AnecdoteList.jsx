//Importing the useDispatch, useSelector hooks and the action creators.
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, sortAnecdotes }
    from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    //Defining a variables for the list of anecdotes and the useDispatch hook.
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    //Using useDispatch hook to define a function for voting an anecdote.
    const vote = (id) => {
        dispatch(voteForAnecdote(id))
        dispatch(sortAnecdotes())
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
