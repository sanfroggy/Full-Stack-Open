//Importing axios.
import axios from 'axios'

//Defining a baseUrl to communicate with the JSON server.
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll }