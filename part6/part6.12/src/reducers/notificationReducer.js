//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'

/*Defining a notification reducer with createSlice. 
When the setMessage action is dispatched it returns 
the payload of the action, which is the string value to display */
const initialState = 'This is a default message.'

const notificationSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})

export default notificationSlice.reducer

export const { setMessage } = notificationSlice.actions