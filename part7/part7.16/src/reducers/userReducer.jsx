/*Importing the createSlice function as well as necessary services and the
setMessageDisplay function from the messageReducer. */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/Blogs'
import loginService from '../services/Login'
import { setMessageDisplay } from './notificationReducer'

//Getting the initial user value from the localStorage.
const user = JSON.parse(window.localStorage.getItem('loggedUserData'))

//Setting the initialState to user or null if a logged in user is not found.
const initialState = user ? user : null

/*Defining a reducer to allow for setting the user to a certain value or resetting it
to null e.q. when logging out. */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        /*Setting the user to an object received as the payload of action.
        setting the localStorage "loggedUserData" item to this received value,
        so that it stores the relevant information of the logged in user.
        Also returning the User object received as action.payload*/
        setUser(state, action) {
            window.localStorage.setItem('loggedUserData', JSON.stringify(action.payload))
            blogService.setToken(action.payload.token)
            return action.payload
        },

        /*Resetting the user by returning null and removing "loggedUserData"
        from localStorage. */
        resetUser() {
            window.localStorage.removeItem('loggedUserData')
            return null
        }
    }
})

export default userSlice.reducer

export const { resetUser, setUser, getUser, getToken } = userSlice.actions

/*Exporting an action creator used to login. Received user data is vereified through the backend
and if a token is successfully received the whole response is passed in the setUser function.
If an exception occurs the imported setMessageDisplay function is dispatched with the error message. */
export const login = (userData) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login({
                ...userData
            })
            dispatch(setUser(response))
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }

}
