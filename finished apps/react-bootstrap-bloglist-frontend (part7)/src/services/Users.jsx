//Importing axios.
import axios from 'axios'

//Defining a baseUrl variable for the user related requests.
const baseUrl = '/api/users'

/*Using axios.get method to return all users in the MongoDB database
through the Node backend and returning the response. */
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

export default { getAll }
