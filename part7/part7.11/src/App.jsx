/*Importing the useDispatch, useSelector, useState and useRef hooks, as well as the necessary
components and services. Also getting the setMessageDisplay and create action creators from
the reducers. */
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/Blogs'
import loginService from './services/Login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setMessageDisplay } from './reducers/notificationReducer'
import { create } from './reducers/blogReducer'

const App = () => {
    /*Defining "state variables" for username, password and user object,
    message and error value giving the nature of the message. blogs array
    gets the data from the store with the useSelector hook. blogFormRef reference
    is used to refer to the method in Toggleable component, that is used to show
    and hide other components. */
    const blogFormRef = useRef()
    const blogs = useSelector((state) => state.blogs)
    //const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUserData'))
    const [user, setUser] = useState(loggedUser)

    //Defining a const for the useDispatch hook.
    const dispatch = useDispatch()

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
        const token = JSON.parse(window.localStorage.getItem('loggedUserData')).token
        if (token) {
            blogService.setToken(token)

            /*Passing the newBlog data and the blogFormRef reference used to
            hide the NewBlogForm component to the create method. */
            dispatch(create(newBlog, blogFormRef))
        }
    }

    /*Defining a method to be passed on to the Blogs component. This method is
    responsible for updating the likes of a blog, when the like button is pressed
    and returning the data of the updated blog item if the creation is successful.
    If not the exception is caught and printed to console. The defined blogService is used
    to pass the updated blog data to the Node backend. The array is also sorted after the update. */
    const addLike = async (updatedBlog) => {
        try {
            await blogService.updateBlog(updatedBlog.id, updatedBlog)
            const newArray = blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
            //setBlogs(newArray.sort((a, b) => b.likes - a.likes))
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }

    /*Defining a method to be passed on to the Blogs component. This method is
    responsible for getting the authorization token from the local storage, deleting
    a blog from the database, when the remove button is pressed and displaying a message
    if the deletion is successful. If not the exception is caught and a message is displayed.
    The defined blogService is used to pass the updated blog data to the Node backend.
    The array is also sorted after the deletion. */
    const deleteBlog = async (blogId) => {
        try {
            const blogtitle = blogs.find((blog) => blog.id === blogId).title
            if (
                window.confirm(`Do you really want to remove ${blogtitle}
            from the list of blogs?`)
            ) {
                const token = JSON.parse(window.localStorage.getItem('loggedUserData')).token
                if (token) {
                    blogService.setToken(token)
                    await blogService.deleteBlog(blogId)
                    dispatch(setMessageDisplay(`${blogtitle} was successfully deleted.`, false, 2.5))
                    //const newArray = blogs.filter((blog) => blog.id !== blogId)
                    //setBlogs(newArray.sort((a, b) => b.likes - a.likes))
                }
            }
        } catch (exception) {
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }

    /*Defining a method to be passed on to the loginFrom component. This method is
    responsible for the login event, when the form is submitted. The data of the user
    is returned in the response and stored in the user variable if the login is succesful.
    If not the exception is caught and printed to console. The defined loginService is used
    to pass the login data to the Node backend. The array containing the blogs is also
    sorted after each login. */
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const response = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem('loggedUserData', JSON.stringify(response))
            blogService.setToken(response.token)
            setUser(response)
            setUsername('')
            setPassword('')
            //const unsorted = await blogService.getAll()
            //setBlogs([...unsorted].sort((a, b) => b.likes - a.likes))
        } catch (exception) {
            /*Setting the errorMessage to be passed on to the store for the
            Notification component, in the case of a failed login attempt. */
            dispatch(setMessageDisplay(exception.response.data.error, true, 2.5))
        }
    }

    /*Creating a method to set the value of user to null and remove it's data
    from local storage, when logging out. */
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUserData')
    }

    /*If user has a null value, as in no user is logged in, the loginForm and the Notification
    components are rendered. If not, the Notification component, the form to create a new blog,
    the list of currently existing blogs and the name of the logged in user are shown,
    as well as the logout button. And the Togglable component is used to make the blog
    creation form hideable */
    if (!user) {
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
    } else {
        return (
            <div>
                <h2>Blogs:</h2>
                <Notification />
                <p>{`Currently logged in as ${user.name}`}.</p>

                <button onClick={handleLogout}>Logout</button>
                <br />
                <br />
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <NewBlogForm createMethod={addBlog} />
                </Togglable>
                <br />
                <Blogs handleUpdate={addLike} currentUser={user} handleDelete={deleteBlog} />
            </div>
        )
    }
}

export default App
