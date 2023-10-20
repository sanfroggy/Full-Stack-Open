//Importing configureStore function and the reducers.
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

/*Defining a store for storing states with configureStore 
and the imported reducers and exporting the store. */
const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer
    }
})

export default store
