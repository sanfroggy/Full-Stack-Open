//Importing axios.
import axios from 'axios'

const baseUrl = '/api/persons'

/*Creating a function to return all contacts from MongoDB database
through Node backend. */
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
/*Creating a function to add a new contact to MongoDB database
through Node backend. */
const createContact = newContact => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

/*Creating a function to provide an already existing contact
with a new number on MongoDB database through Node backend. */
const updateContact = (contactId, newObject) => {
  const request = axios.put(`${baseUrl}/${contactId}`, newObject)
  return request.then(response => response.data)
}

/*Creating a function to delete a contact from MongoDB database
through Node backend. */
const deleteContact = (contactId) => {
  const request = axios.delete(`${baseUrl}/${contactId}`)
  return request.then(response => response.data)
}

export default { getAll, createContact, updateContact, deleteContact }