/* eslint-disable no-case-declarations */
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

/*Defining a reducer that allows the user to vote an anecdote
with the action.type "VOTE". */
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "VOTE":
            const votedAnecdote = state.find(anecdote =>
                anecdote.id === action.payload.id)

            const updatedAnecdote = {
                ...votedAnecdote,
                votes: votedAnecdote.votes + 1
            }

            return state.map(anecdote =>
                anecdote.id === updatedAnecdote.id
                    ? updatedAnecdote : anecdote)
            
        default: return state
    }
}

export default reducer
