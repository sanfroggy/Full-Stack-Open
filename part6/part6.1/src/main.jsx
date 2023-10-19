/* eslint-disable react-refresh/only-export-components */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'

//Importing the createStore redux function and the reducer component.
import { createStore } from 'redux'
import reducer from './reducer'

//Creating a store that uses the imported reduce component.
const store = createStore(reducer)

const App = () => {

    //Defining a function to use the "GOOD" action of the reducer.
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }

    return (
        <div>
            <button onClick={good}>good</button>
            <button>ok</button>
            <button>bad</button>
            <button>reset stats</button>
            <div>good {store.getState().good}</div>
            <div>ok </div>
            <div>bad </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
