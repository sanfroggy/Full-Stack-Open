/*Importing the useDispatch, useSelector, useState, useMatch and useRef hooks, as well as the necessary
components and services. Also getting the necessary action creators from the reducers. */
import { Routes, Route, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/Blogs'
import { login, resetUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { create } from './reducers/blogReducer'
import Users from './components/Users'
import { updateBlogsState } from './reducers/blogReducer'
import SingleBlog from './components/SingleBlog'

const App = () => {

    //Defining a const for the useDispatch hook.
    const dispatch = useDispatch()

    /*Defining "state variables" for username, password values and the loggedUser variable
    as well as blogs variable using the useSelector hook. blogFormRef reference is used to
    refer to the method in Toggleable component, that is used to show and hide other components. */
    const blogFormRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loggedUser = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)

    /*Initializing the blogs array using the updateBlogsState method
    imported from blogReducer, on first render if it is not already
    initialized. */
    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(updateBlogsState())
        }
    }, [])

    /*Defining the methods to be passed on to the loginForm and the newBlogForm components.
    These methods will set values for the username, password, title, author and url "state variables"
    whenever the input in the text fields is changed. */
    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value)
    }

    /*Defining a method to be passed on to the newBlogForm component. This method
    is responsible for receiving the data of the blog that is to be created,
    getting the authorization token from the local storage. The imported create method
    defined in blogReducer is used to pass the token and the data of the new blog to the
    Node backend and to the store. */
    const addBlog = async (newBlog) => {

        console.log(loggedUser)
        const token = loggedUser.token
        if (token) {
            blogService.setToken(token)

            /*Passing the newBlog data and the blogFormRef reference used to
            hide the NewBlogForm component to the create method. */
            dispatch(create(newBlog, blogFormRef))
        }

    }

    /*Defining a method to empty the username and passwor dinput fields. This method is
    responsible for the login event, when the form is submitted. The data of the username
    and password variables is passed to the login method imported from userReducer, which is
    then dispatched. */
    const handleLogin = async (event) => {
        event.preventDefault()

        setUsername('')
        setPassword('')
        dispatch(login({ username, password }))
    }

    /*If user has a null value, as in no user is logged in, the loginForm and the Notification
    components are rendered. If not, the Notification component, the form to create a new blog,
    the list of currently existing blogs and the name of the logged in user are shown,
    as well as the logout button. And the Togglable component is used to make the blog
    creation form hideable. Routes for the list of blogs and a singular blog view are also
    defined here. */
    if (loggedUser) {
        return (
            <div>
                <h2>Blogs:</h2>
                <Notification />
                <p>{`Currently logged in as ${loggedUser.name}`}.</p>

                <button onClick={() => { dispatch(resetUser()) }}>Logout</button>
                <br />
                <br />
                <Routes>
                    <Route path='/' element={<div>
                        <Togglable buttonLabel="New blog" ref={blogFormRef}>
                            <NewBlogForm createMethod={addBlog} />
                        </Togglable>
                        <br />
                        <Blogs />
                    </div>} />
                    <Route path='/blogs' element={<div>
                        <Togglable buttonLabel="New blog" ref={blogFormRef}>
                            <NewBlogForm createMethod={addBlog} />
                        </Togglable>
                        <br />
                        <Blogs />
                    </div>} />

                    <Route path='/blogs/:id' element={<div><SingleBlog loggedUser={loggedUser} /> </div>} />
                </Routes>
                <Users />
            </div>
        )
    } else {
        return (
            <div>
                <Notification />
                <LoginForm
                    usr={username}
                    pwd={password}
                    handleUsrInputChangeMethod={handleUsernameInputChange}
                    handlePwdInputChangeMethod={handlePasswordInputChange}
                    loginMethod={handleLogin}
                />
            </div>
        )

    }
}

export default App
