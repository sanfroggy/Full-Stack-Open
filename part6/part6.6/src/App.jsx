//Importing the useSelector, useDispatch hooks and the action creators.
import { useSelector, useDispatch } from 'react-redux'
import { createNewAnecdote, voteForAnecdote, sortAnecdotes }
    from './reducers/anecdoteReducer'

const App = () => {

    //Defining variables for the list of anecdotes and the useDispatch hook.
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    //Using useDispatch hook to define a function for adding an anecdote.
    const addAnecdote = (event) => {

        event.preventDefault()

        const anecdoteString = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createNewAnecdote(anecdoteString))
        dispatch(sortAnecdotes())
    }

    //Using useDispatch hook to define a function for voting an anecdote.
    const vote = (id) => {
        dispatch(voteForAnecdote(id))
        dispatch(sortAnecdotes())
    }

    /*Displaying the array of anecdotes and a form to
    create new anecdotes. */
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

            <h2>Create new: </h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default App
