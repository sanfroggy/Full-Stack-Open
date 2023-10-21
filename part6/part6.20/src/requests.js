//Importing axios.
import axios from 'axios'

//Exporting a function to get all anecdotes from JSON server.
export const getAnecdotes = () => axios.get(
    'http://localhost:3001/anecdotes').then(res => res.data)
