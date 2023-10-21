//Importing axios.
import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

//Exporting a function to get all anecdotes from JSON server.
export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

//Exporting a function to create a new anecdote to the JSON server.
export const createAnecdote = anecdote =>
    axios.post(baseUrl, anecdote).then(res => res.data)

/*Exporting a function to update the likes of an existing anecdotes
in the db.json through the JSON server. */
export const updateAnecdote = anecdote =>
    axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)

