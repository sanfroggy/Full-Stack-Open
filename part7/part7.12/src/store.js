//Import configureStore and the notificationReducer.
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

/*Using configureStore to initialize the store, with the
proper reducers. */
const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
    },
})

export default store
