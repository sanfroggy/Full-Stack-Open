//Importing useMatch and useSelector hooks.
import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

//Defining a custom hook to return a user object matching an id.
const useGetUserMatch = () => {

    /*Defining a variable for all users received from the store with
    useSelector. */
    const users = useSelector(state => state.users)

    //Defining a variable for a user object received using getMatch.
    const match = useMatch('/users/:id')

    //Returning a user object if a match is found using the defined match variable.
    return match ? users.find(user => user.id === String(match.params.id)) : null
}

export { useGetUserMatch }