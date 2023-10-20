//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*Defining a reducer that offers operations for the action creators voteForAnecdote,
newAnecdote, sort and setAnecdotes. The defaultState is the array of anecdote objects
defined as initialState. */
const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {

        /*When the voteForAnecdote action is dispatched,
        the id received in the action.payload is used to find the anecdote, 
        a copy of it is created with the updated number of votes and a new
        state with the updated anecdote object is returned. */
        voteForAnecdote(state, action) {
            const votedAnecdote = state.find(anecdote =>
                anecdote.id === action.payload)

            const updatedAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }

            return state.map(anecdote =>
                anecdote.id === updatedAnecdote.id
                    ? updatedAnecdote : anecdote)
        },

        /*When the newAnecdote action is dispatched, asObject
         is used with state.push to turn the content in action.payload
         into an object and add it to the current state. */
        newAnecdote(state, action) {
            state.push(action.payload)
        },

        /*When the sort action is dispatched, the sort method is used
        to sort a copy of the array of anecdotes by votes and return the 
        sorted array. */
        sort(state) {
            return [...state].sort((a, b) => b.votes - a.votes)
        },

        /*When the setAnecdotes action is dispatched, the array of anecdotes
        in action.payload is returned. */
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

/*Exporting the reducer function and action creators to get the initial
array of anecdotes from db.json, to vote for an anecdote, to create a new one
and to sort and set the array of anecdotes. */
export default anecdoteSlice.reducer

export const { newAnecdote, voteForAnecdote, sort, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const anecdote = await anecdoteService.createNew(content)
        dispatch(newAnecdote(anecdote))
    }
}
