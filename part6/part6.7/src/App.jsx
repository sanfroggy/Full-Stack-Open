/*Importing the useSelector, useDispatch hooks, "action creators" and the form
used to create a new anecdote. */
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import { voteForAnecdote, sortAnecdotes }
    from './reducers/anecdoteReducer'

const App = () => {

    //Defining a variables for the list of anecdotes and the useDispatch hook.
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    //Using useDispatch hook to define a function for voting an anecdote.
    const vote = (id) => {
        dispatch(voteForAnecdote(id))
        dispatch(sortAnecdotes())
    }

    //Displaying the array of anecdotes.
    return (
        <div>
            <h2>Anecdotes: </h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes.
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => vote(anecdote.id)}>Vote</button>
                    </div>
                </div>
            )}
            <AnecdoteForm />

        </div>
    )
}

export default App
