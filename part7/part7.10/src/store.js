//Import configureStore and the notificationReducer.
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

/*Defining a store for storing states with configureStore 
and the imported anecdotes, filter and message reducers 
and exporting the store. */
const store = configureStore({
    reducer: {
        notification: notificationReducer
    }
})

export default store

