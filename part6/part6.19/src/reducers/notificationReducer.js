//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'

/*Defining a notification reducer with createSlice. It
has an empty string as an initialState. When the setMessage 
action is dispatched it returns the payload of the action, 
which is the string value to display */
const initialState = ''

const notificationSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage(state, action) {
            return action.payload
        },
        resetMessage() {
            return ''
        }
    }
})

export default notificationSlice.reducer

export const { setMessage, resetMessage } = notificationSlice.actions

export const setMessageDisplay = (message, timeout) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
           dispatch(resetMessage())
        }, timeout * 1000)
    }
}