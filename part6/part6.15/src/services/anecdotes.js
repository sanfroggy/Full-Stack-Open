//Importing axios.
import axios from 'axios'

//Defining a baseUrl to communicate with the JSON server.
const baseUrl = 'http://localhost:3001/anecdotes'

/*Defining a function to return all anecdotes contained by 
db.json through the JSON server. */
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }