/*Importing the useState, useEffect, useNavigate and useMutation hooks. Also importing
the necessary mutations */
import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../services/mutations'
import { useNavigate } from 'react-router-dom'

/*Defining a component to enable the user to login with a 
username and password. */
const LoginForm = ({ setToken, setMessage }) => {

    /*Defining "state variables" for the username and password,
    as well as a variable for the useNavigate hook and the use of the
    imported LOGIN mutation. */
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    /*Defining the use of the login mutation. If the mutation is
    unsuccessful an error message is shown. */
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            setMessage(error.message)

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    })

    /*Using the useEffect hook to set the token appropriately,
    when the LOGIN mutation is used successfully and useNavigate hook
    to navigate to the root view. */
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            localStorage.setItem('libraryUserToken', token)
            setToken(token)
            navigate('/')
        }
    }, [result.data])

    //Defining a function to attempt the LOGIN mutation on form submit.
    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username, password } })
    }

    //Returning a form with input fields and a submit button used to login.
    return (
        <div>
            <h2>Login: </h2>
            <div>
                <form onSubmit={submit}>
                    <div>
                        Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <br />
                    <div>
                        Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            type="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )

}

export default LoginForm
