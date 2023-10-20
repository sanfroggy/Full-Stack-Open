import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

//Combining the anecdotes and filter reducers into one.
const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer
})

//Creating a store to use for saving anecdote states.
const store = createStore(reducer)

/*Rendering the app and using the Provider component to make
the created store accessible to the App. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
