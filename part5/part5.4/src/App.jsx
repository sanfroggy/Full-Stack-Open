//Importing the useState and useEffect hooks, as well as the necessary components and services.
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/Blogs'
import loginService from './services/Login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {

    /*Defining "state variables" for username, password, title, author, url,
    user object and blogs array, message and error value giving the nature of the message. */
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUserData'))
    const [user, setUser] = useState(loggedUser)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    //Getting the blogs from the MongoDB database on first render, with the useEffect hook.
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
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

    const handleTitleInputChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorInputChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlInputChange = (event) => {
        setUrl(event.target.value)
    }

    /*Defining a method to be passed on to the newBlogForm component. This method
    is responsible for getting the data of the user to be created from the form,
    getting the authorization token from the local storage and returning the data
    of the new blog item if the creation is successful. If not the exception is caught
    and printed to the console. The defined blogService is used to pass the token
    and the data of the new blog to the Node backend. */
    const addBlog = async (event) => {
        event.preventDefault()

        const newBlog = {
            title: title,
            author: author,
            url: url
        }

        try {
            const token = JSON.parse(window.localStorage.getItem('loggedUserData')).token
            if (token) {
                blogService.setToken(token)
                
                /*Setting the message "state variable" to be passed on to the 
                Notification component, in the case that the new blog is 
                added successfully. */
                setErrorMessage(null)
                const response = await blogService.createNew(newBlog)
                setMessage(`${response.title} was successfully created.`)
                setTimeout(() => {
                    setMessage(null)
                    setErrorMessage(null)
                }, 2500)
                setBlogs(await blogService.getAll())
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
    /*Defining a method to be passed on to the loginFrom component. This method is 
    responsible for the login event, when the form is submitted. The data of the user
    is returned in the response and stored in the user variable if the login is succesful.
    If not the exception is caught and printed to console. The defined loginService is used
    to pass the login data to the Node backend. */
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
            setBlogs(await blogService.getAll())
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

    /*If user has a null value, as in no user is logged in, the loginForm and the Notification components 
    are rendered. If not, the Notification component, form to create a new blog, the list of currently existing 
    blogs and the name of the logged in user are shown, as well as the logout button. */
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
                <NewBlogForm createMethod={addBlog} title={title} author={author} blogurl={url}
                    titleInputChangeMethod={handleTitleInputChange} authorInputChangeMethod={handleAuthorInputChange}
                    urlInputChangeMethod={handleUrlInputChange} />
                <br />
                <Blogs blogs={blogs} />
            </div>
        )
    }
}

export default App
