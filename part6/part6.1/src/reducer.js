//Set a initial state to return in case of reset or faulty received state.
const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

/*Create a reducer to return a value based of an action. It has a default values
of the initialState object, if the received state is undefined. */
const counterReducer = (state = initialState, action) => {

    switch (action.type) {

        /*If action.type is "GOOD", increment the "good" value of the state and
        return the new state object. */
        case 'GOOD':
            state = {
                good: state.good + 1, 
                ok: state.ok,
                bad: state.bad
            }
            return state 

        /*If action.type is "OK", increment the "ok" value of the state 
        is incremented and the new state object is returned. */
        case 'OK':
            state = {
                good: state.good,
                ok: state.ok + 1,
                bad: state.bad
            }
            return state

        /*If action.type is "BAD", increment the "bad" value of the state 
        is incremented and the new state object is returned. */
        case 'BAD':
            state = {
                good: state.good,
                ok: state.ok,
                bad: state.bad + 1
            }
            return state

        /*If action.type is "ZERO", the initialState object is returned. */
        case 'ZERO':
            return initialState

        /*If action.type is none of the above, but state has defined good, 
        ok and bad values it is returned as such. If not the initialState 
        is returned. */
        default:
            if (state.good && state.ok && state.bad) {
                return state
            } else {
                return initialState
            }
            
    }

}

export default counterReducer
