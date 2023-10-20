//Importing createSlice function.
import { createSlice } from '@reduxjs/toolkit'

/*Defining a filter reducer with createSlice, returning the 
string "ALL"" as an initial state, but when the setFilter action is
dispatched it returns the payload of the action, which
is the string value to filter by. */
const initialState = 'ALL'

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})

export default filterSlice.reducer

export const { setFilter } = filterSlice.actions
