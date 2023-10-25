/*Import App, BrowserRouter component with alias "Router", store
from the separate file and Provider from "react-redux". */
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

/*Rendering the app and using the Provider component to make
the imported store accessible to the App and Router component
to make Routes accessible. */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
