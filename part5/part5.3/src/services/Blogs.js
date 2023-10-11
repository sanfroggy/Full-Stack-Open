//Importing axios.
import axios from 'axios'

//Defining a baseUrl variable for the blog related requests.
const baseUrl = '/api/blogs'
let token = null

/*Using axios.get method to return all blogs in the MongoDB database
through the Node backend and returning the response. */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const createNew = async newBlog => {
    const config = {
        headers: { Authorization: token}
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}
export default { getAll, setToken, createNew }
