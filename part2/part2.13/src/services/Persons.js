import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//Creating a function to return all contacts from JSON server.
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Creating a function to add a new contact to JSON server.
const createContact = newContact => {
    const request = axios.post(baseUrl, newContact)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createContact }
