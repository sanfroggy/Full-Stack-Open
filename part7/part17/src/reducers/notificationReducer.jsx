//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'

/*Defining a notification reducer with createSlice to control
the state of the notification. It has an object with an
empty string and error boolean as an initialState. */
const initialState = {
    message: null,
    error: false,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        /*When the setMessage action is dispatched it returns
        the payload of the action, which is the string value to display. */
        setMessage(state, action) {
            return action.payload
        },

        /*When the resetMessage action is dispatched it returns
        an empty string. */
        resetMessage() {
            return initialState
        },
    },
})

/*Exporting the reducer function and action creators to set the
message for the Notification component and to reset the message after
a certain period of time. */
export default notificationSlice.reducer

export const { setMessage, resetMessage } = notificationSlice.actions

export const setMessageDisplay = (message, error, timeout) => {
    return async (dispatch) => {
        dispatch(
            setMessage({
                message,
                error,
            }),
        )
        setTimeout(() => {
            dispatch(resetMessage())
        }, timeout * 1000)
    }
}
