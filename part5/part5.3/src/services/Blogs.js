//Importing axios.
import axios from 'axios'

/*Defining a baseUrl variable for the blog related requests and a 
token variable for the authorization token. */
const baseUrl = '/api/blogs'
let token = null

/*Using axios.get method to return all blogs in the MongoDB database
through the Node backend and returning the response. */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Defining a function to set the value of the token variable.
const setToken = newToken => {
    token = `Bearer ${newToken}`
}

/*Using axios.post method to create a new Blog object in the
MongoDB database through Node backend and returning the response.
The authorization token is sent along with the data of the new 
object in the request. */
const createNew = async newBlog => {
    const config = {
        headers: { Authorization: token}
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

export default { getAll, setToken, createNew }
