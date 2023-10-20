//Importing the createSlice function.
import { createSlice } from '@reduxjs/toolkit'

//Creating an array of anecdote strings initially displayed.
const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

//Defining the initialState of anecdotes as an array of objects.
const initialState = anecdotesAtStart.map(asObject)

/*Defining a reducer that offers operations for the action.types voteForAnecdote,
newAnecdote and sort. The defaultState is the array of anecdote objects defined as 
initialState. */
const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
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
            state.push(asObject(action.payload))
        },


        sort(state) {
            return [...state].sort((a, b) => b.votes - a.votes)
        }
    }
})

//Export the reducer function and action creators.
export default anecdoteSlice.reducer

export const { newAnecdote, voteForAnecdote, sort } = anecdoteSlice.actions
