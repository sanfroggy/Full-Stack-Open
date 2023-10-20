import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducer from './reducers/anecdoteReducer'

//Creating a store to use for saving anecdote states.
const store = createStore(reducer)

/*Rendering the app and using the Provider component to make
the created store accessible to the App. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
