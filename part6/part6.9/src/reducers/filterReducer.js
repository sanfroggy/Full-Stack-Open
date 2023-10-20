/*Defining an "action creator" for the 
"SET_FILTER" action of the filterReducer. */
const filterAnecdotes = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter    
    }
}

/*Defining a filter reducer, retuning the string ALL
as a default state, but when the SET_FILTER action is
dispatched it returns the payload of the action, which
is the string value to filter by. */
const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload

        default:
            return state
    }
}

export default filterReducer

export { filterAnecdotes }
