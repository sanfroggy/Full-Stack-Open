//Importing the useState useEffect and useRef hooks, as well as the necessary components and services.
import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/Blogs'
import loginService from './services/Login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {

    /*Defining "state variables" for username, password, user object and blogs array,
    message and error value giving the nature of the message. blogFormRef reference 
    is used to refer to the method in Toggleable component, that is used to show 
    and hide other components. */
    const blogFormRef = useRef()
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUserData'))
    const [user, setUser] = useState(loggedUser)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    /*Getting the blogs from the MongoDB database on first render, with the useEffect hook
    and sorting them according to their amount of likes. */
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
        )
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
    getting the authorization token from the local storage and returning the data
    of the new blog item if the creation is successful. If not the exception is caught
    and an error message is shown. The defined blogService is used to pass the token
    and the data of the new blog to the Node backend. A new get request is sent to the
    Node backend to make sure that the user field of blogs is populated correctly
    and the received array is then sorted accordingly. */
    const addBlog = async (newBlog) => {

        try {
            const token = JSON.parse(window.localStorage.getItem('loggedUserData')).token
            if (token) {
                blogService.setToken(token)

                /*Setting the message "state variable" to be passed on to the
                Notification component, in the case that the new blog is 
                added successfully. Also using the blogFormRef reference
                to hide the NewBlogForm component, when a new blog is 
                successfully created. */
                setErrorMessage(null)
                const response = await blogService.createNew(newBlog)
                setMessage(`${response.title} was successfully created.`)

                blogFormRef.current.toggleVisibility()
                setTimeout(() => {
                    setMessage(null)
                    setErrorMessage(null)
                }, 2500)
                const unsorted = await blogService.getAll()
                setBlogs([...unsorted].sort((a, b) => b.likes - a.likes))
            }
        } catch (exception) {

            /*Setting the errorMessage "state variable" to be passed on to the
            Notification component, in the case that the new blog is 
            not added successfully. */
            setMessage(null)
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setMessage(null)
                setErrorMessage(null)
            }, 2500)
        }

    }

    /*Defining a method to be passed on to the Blogs component. This method is
    responsible for updating the likes of a blog, when the like button is pressed
    and returning the data of the updated blog item if the creation is successful.
    If not the exception is caught and printed to console. The defined blogService is used
    to pass the updated blog data to the Node backend. The array is also sorted after the update. */
    const addLike = async (updatedBlog) => {

        try {
            setErrorMessage(null)
            await blogService.updateBlog(updatedBlog.id, updatedBlog)
            const newArray = blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
            setBlogs(newArray.sort((a, b) => b.likes - a.likes))
        } catch (exception) {
            setMessage(null)
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setMessage(null)
                setErrorMessage(null)
            }, 2500)
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
                username, password
            })

            window.localStorage.setItem(
                'loggedUserData', JSON.stringify(response))
            blogService.setToken(response.token)
            setUser(response)
            setUsername('')
            setPassword('')
            const unsorted = await blogService.getAll()
            setBlogs([...unsorted].sort((a, b) => b.likes - a.likes))
        } catch (exception) {

            /*Setting the errorMessage "state variable" to be passed on to the
            Notification component, in the case of a failed login attempt. */
            setMessage(null)
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setMessage(null)
                setErrorMessage(null)
            }, 2500)
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
                <Notification msg={message} errorMsg={errorMessage} />
                <LoginForm usr={username} pwd={password} handleUsrInputChangeMethod={handleUsernameInputChange}
                    handlePwdInputChangeMethod={handlePasswordInputChange} loginMethod={handleLogin} />
            </div>
        )
    } else {
        return (
            <div>
                <h2>Blogs:</h2>
                <Notification msg={message} errorMsg={errorMessage} />
                <p>{`Currently logged in as ${user.name}`}.</p>

                <button onClick={handleLogout}>Logout</button>
                <br />
                <br />
                <Togglable buttonLabel="New blog" ref={blogFormRef}>
                    <NewBlogForm createMethod={addBlog} />
                </Togglable>
                <br />
                <Blogs blogs={blogs} handleUpdate={addLike} />
            </div>
        )
    }
}

export default App
