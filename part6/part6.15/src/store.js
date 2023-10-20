//Importing configureStore function and the reducers.
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

/*Defining a store for storing states with configureStore 
and the imported reducers and exporting the store. */
const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        message: notificationReducer
    }
})

export default store