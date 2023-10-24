/*Importing the User component, useEffect, useSelector and useDispatch hooks,
as well as the updateUserState method from usersReducer. */
import User from './User'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateUsersState } from '../reducers/usersReducer'

//Defining the Users component.
const Users = () => {

    /*Defining the users variable for the stored users and
    the dispatch variable for using the dispatch hook. */
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    /*Initializing the users array using the updateUserssState method
    imported from usersReducer, on first render. */
    useEffect(() => {
        dispatch(updateUsersState())
    }, [])

    //Returning the sontents of users array mapped into User components.
    if (users) {
        return (
            <div>
                <h2>Users: </h2>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;<b>Blogs created:</b>
                {users.map((user) => (
                    <User key={user.id} name={user.name} blogs={user.blogs.length} />
                ))}
            </div>
        )
    }
}

export default Users