import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/Users'

//Defining a reducer with the createSlice function. As an initialState it has an empty array.
const initialState = []

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        /*Defining an action to be able to set a value for
        the array of users. */
        setUsers(state, action) {
            return action.payload
        },
    }
})

export default userSlice.reducer

export const { setUsers } = userSlice.actions

//Exporting an action creator to update the array of users.
export const updateUsersState = () => {
    return async (dispatch) => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}
