import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/Blogs'
import loginService from './services/Login'
import LoginForm from './components/LoginForm'

const App = () => {

    //Defining "state variables" for username, password, user object and blogs array.
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    //Getting the blogs from the MongoDB database on first render, with the useEffect hook.
    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    /*Defining the methods to be passed on to the loginForm component. These methods
    will set username and password whenever the input in the text fields is changed. */
    const handleUsernameInputChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordInputChange = (event) => {     
        setPassword(event.target.value)
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

            setUser(response)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(exception)
        }
    }

    /*If user has a null value, as in no user is logged in, the loginForm component is rendered.
    If not the list of blogs and the name of the logged in user are shown. */
    if (user === null) {
        return (
            <div>
                <LoginForm usr={username} pwd={password} handleUsrInputChangeMethod={handleUsernameInputChange}
                    handlePwdInputChangeMethod={handlePasswordInputChange} loginMethod={handleLogin} />
            </div>
        )
    } else {
        return (
            <div>
                <h2>Blogs:</h2>
                <p>{`Currently logged in as ${user.name}`}.</p>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
            </div>
        )
    }
}

export default App
