//Importing the useSelector and useDispatch hooks.
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    //Defining a function for voting an anecdote.
    const vote = (id) => {
        dispatch({
            type: 'VOTE',
            payload: {
                id: id
            }
        })
    }

    /*Displaying the array of anecdotes and a form to
    create new anecdotes. */
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <h2>Create new</h2>
            <form>
                <div><input /></div>
                <button>Create</button>
            </form>
        </div>
    )
}

export default App
