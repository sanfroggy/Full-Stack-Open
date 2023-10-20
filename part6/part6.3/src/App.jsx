//Importing the useSelector and useDispatch hooks.
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

    const anecdotes = useSelector(state => state)
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch()

    //Defining a function for voting an anecdote.
    const vote = (id) => {
        console.log('vote', id)
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
            <h2>create new</h2>
            <form>
                <div><input /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default App
