/*Importing the useSelector, useDispatch hooks, "action creators" and the form
used to create a new anecdote. */
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

    //Displaying the array of anecdotes and the form used to create new ones.
    return (
        <div>
            <h2>Anecdotes: </h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
