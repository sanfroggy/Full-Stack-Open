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

/*Defining an "action creator" for creating a new anecdote. 
It returns an action with the received parameters. */
const createNewAnecdote = (anecdoteString) => {
    return {
        type: 'NEW',
        payload: {
            content: anecdoteString
        }
    }
}

/*Defining an "action creator" for voting an anecdote. 
It returns an action with the received parameters. */
const voteForAnecdote = (id) => {
    return {
        type: 'VOTE',
        payload: {
            id: id
        }
    }
}

/*Defining an "action creator" for sorting the anecdotes. 
It returns an action of type "SORT". */
const sortAnecdotes = () => {
    return {
        type: 'SORT'
    }
}

//Defining the initialState of anecdotes as an array of objects.
const initialState = anecdotesAtStart.map(asObject)

/*Defining a reducer that operations the action.types "VOTE" and "NEW".
If the action received is neither the state is returned as such. */
const reducer = (state = initialState, action) => {

    switch (action.type) {

        /*If the action type is "VOTE" find the anecdote with the
        id received in the action.payload, create a copy
        of it with the updated number of likes and return a new
        state with the updated anecdote object. */
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

        /*If the action type is "NEW" find get the desired content
        received in the action.payload, create a new anecdote object
        with the asObject function and return a new state with the 
        created anecdote object. */
        case "NEW":
            const newAnecdote = asObject(action.payload.content)
            return [...state, newAnecdote]

        /*If the action type is "SORT" return an array anecdotes sorted
        according to the number of likes. */
        case "SORT":
            return [...state].sort((a, b) => b.votes - a.votes)

        default: return state


    }
}

//Export the reducer function and action creators.
export default reducer

export { createNewAnecdote, voteForAnecdote, sortAnecdotes }
