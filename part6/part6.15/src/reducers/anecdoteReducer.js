//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'

//Generating a random number to be used as id.
const getId = () => (100000 * Math.random()).toFixed(0)

/*Defining a method to give the anecdote an id, number of votes
and to make it into an object. */
const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

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

//Export the reducer function and action creators.
export default anecdoteSlice.reducer

export const { newAnecdote, voteForAnecdote, sort, setAnecdotes} = anecdoteSlice.actions
