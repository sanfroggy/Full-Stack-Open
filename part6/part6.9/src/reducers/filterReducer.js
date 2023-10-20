/*Defining an "action creator" for the 
"SET_FILTER" action of the filterReducer. */
const filterAnecdotes = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter    
    }
}


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