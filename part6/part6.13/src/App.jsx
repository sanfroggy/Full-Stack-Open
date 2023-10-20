/*Importing the useSelector, useDispatch hooks, "action creators" and the form
used to create a new anecdote. */
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

    /*Displaying the notification message, filter input field,
    array of anecdotes and the form used to create new ones. */
    return (
        <div>
            <h2>Anecdotes: </h2>
            <Notification />
            <br />
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
