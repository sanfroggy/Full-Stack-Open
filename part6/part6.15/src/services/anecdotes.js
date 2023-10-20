﻿//Importing axios.
import axios from 'axios'

//Defining a baseUrl to communicate with the JSON server.
const baseUrl = 'http://localhost:3001/anecdotes'

/*Defining a function to return all anecdotes contained by 
db.json through the JSON server and returning the response data. */
const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

/*Defining a function to create a new anecdote in db.json 
through the JSON server and returning the response data. 
Id is generated by the backend. */
const createNew = async (content) => {
    const object = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export default { getAll, createNew }
