/*Importing the User component, useEffect, useSelector and useDispatch hooks,
as well as the updateUserState method from usersReducer. */
import User from './User'
import SingleUser from './SingleUser'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUsersState } from '../reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'
import { useGetMatch } from '../hooks'

//Defining the Users component.
const Users = () => {

    /*Defining the users variable for the stored users and
    the dispatch variable for using the dispatch hook. */
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    //Using a custom hook to return a User matching an id with useMatch.
    const user = useGetMatch()

    /*Initializing the users array using the updateUserssState method
    imported from usersReducer, on first render. */
    useEffect(() => {
        dispatch(updateUsersState())
    }, [])

    /*Returning a component containing the list of all existing users as
    User components. */
    const UserList = () => {
        return (
            <div>
                <h2>Users: </h2>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Blogs created:</b>
                {users.map(user => (
                    <User key={user.id} user={user} />
                ))}
            </div>
        )
    }


    //Returning the sontents of users array mapped into User components.
    if (users) {
        return (
            <Routes>
                <Route path='/users' element={<UserList />} />
                <Route path='/users/:id' element={<SingleUser user={user} /> } />
            </Routes>
        )
    }
}

export default Users