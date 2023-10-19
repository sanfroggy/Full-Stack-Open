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

    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }

    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }

    const reset = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

    return (
        <div>      
            <button onClick={reset}>Reset stats</button>
            <br />
            <br />
            <div>Good: {store.getState().good} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={good}>Good</button></div>
            <br />
            <div>Ok: {store.getState().ok} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={ok}>Ok</button></div>
            <br />
            <div>Bad: {store.getState().bad} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={bad}>Bad</button></div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
