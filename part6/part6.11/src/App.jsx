/*Importing the useSelector, useDispatch hooks, "action creators" and the form
used to create a new anecdote. */
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {

    /*Displaying the filter input field, array of anecdotes and the form
    used to create new ones. */
    return (
        <div>
            <h2>Anecdotes: </h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
