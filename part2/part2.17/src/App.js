//Importing useState, useEffect as well as the necessary services and components.
import { useState, useEffect } from 'react'
import personService from './services/Persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.js'
import Notification from './components/Notification'

const App = (props) => {

    /*Creating "state variables" for the person object to be stored
    and the values currently written on the input fields */
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showNames, setShowNames] = useState('')
    const [contactsToShow, setContactsToShow] = useState([])
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    /*Getting the data of 4 persons from JSON server through 
    getAll function defined in personService on initial render 
    and providing the persons and contactsToShow arrays with the received data. */
    useEffect(() => {
        personService.getAll().then(initialData => {
            setPersons([...initialData])
            setContactsToShow([...initialData])
        })
    }, [])

    /*Using window.confirm to ask the user if he/she really wants to delete 
    the data of an existing person and defining a message informing the user that the
    delete operation was a success. Current data of persons is received
    from JSON server through getAll function defined in personService and filtered
    to make sure that the deleted contact is also deleted from the current arrays */
    const handleDelete = (id, name) => {
        if (window.confirm(`Do you really want to delete ${name}?`)) {
            personService.deleteContact(id).then(() => {
                setError(false)
                setMessage(`${name} was successfully deleted from contacts.`)
                setTimeout(() => {
                    setMessage(null)
                }, 3500)
            }).catch(error => {
                setError(true)
                setMessage(`The contact information of ${name} could not be deleted from server.`)
                setTimeout(() => {
                    setMessage(null)
                }, 3500)
                console.error('There was an error!', error);
            });
            personService.getAll().then(currentData => {
                setPersons(currentData.filter(contact => contact.id !== id))
                setContactsToShow(currentData.filter(contact => contact.id !== id).filter(contact =>
                    contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
            })

        }
    }

    /*Creating a function to add a new person object to the existing
    persons Array when the button is pressed and preventing the 
    default behavior that would occur when submitting the form.
    Updating the list of contacts to show according to the value of the filter 
    input field, defining a message to inform the user of a successfully
    created new contact, as well as updating the list of contacts on the JSON server 
    through createContact function defined in personService. */
    const addPerson = (event) => {
        if (persons.some(person => person.name === newName)) {
            event.preventDefault()

            /*Using window.confirm to ask the user if he/she wants to replace the current
            phonenumber, when a person with the same name already exists in the phonebook.
            The number is the replaced with the entered one through updateContact function
            defined in personService, a message is defined to inform the user
            of a successful update operation and the person and contactToShow arrays are updated accordingly. */
            if (window.confirm(`Contact ${newName} is already saved in the
            list of contacts, do you want to replace the currently saved phone number with
            ${newNumber}?`)) {
                const replacedId = persons.find(person => person.name === newName).id
                const replacingObject = {
                    name: newName,
                    number: newNumber,
                    id: replacedId
                }
                personService.updateContact(
                    replacedId, replacingObject)
                    .then(updatedContact => {
                        setError(false)
                        setMessage(`The number of ${updatedContact.name} was successfully updated.`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 3500)
                        setPersons(persons.map(person => person.id !== replacedId ? person : updatedContact))
                        personService.getAll().then(currentData => {
                            setContactsToShow(currentData.filter(contact =>
                                contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
                        })
                    }).catch(error => {
                        setError(true)
                        setMessage(`The contact information of ${replacingObject.name} has already been deleted from server.`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 3500)
                        console.error('There was an error!', error);
                    });
                setNewName('')
                setNewNumber('')
            }

        } else {
            event.preventDefault()
            const personObject = {
                name: newName,
                number: newNumber
            }
            personService.createContact(personObject)
                .then(createdContact => {
                    setError(false)
                    setMessage(`${createdContact.name} was successfully added to the list of contacts.`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3500)
                    setContactsToShow([...persons].concat(createdContact).filter(contact =>
                        contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
                    setPersons(persons.concat(createdContact))
                }).catch(error => {
                    setError(true)
                    setMessage(`${personObject.name} could not be added to the list of contacts.`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 3500)
                    console.error('There was an error!', error);
                });
            setNewName('')
            setNewNumber('')

        }
    }

    /*Getting the value of the input field when it is changed
    and setting it as a new value for the showNames "state variable". Also
    updating the contactsToShow "state variable" according to filter 
    input field value. */
    const handleFilterInputChange = (event) => {
        setShowNames(event.target.value)
        setContactsToShow(persons.filter(contact => contact.name.toLowerCase().indexOf(
            event.target.value.toLowerCase()) >= 0))
    }

    /*Getting the value of the input field when it is changed
    and setting it as a new value for the newName "state variable". */
    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    /*Getting the value of the input field when it is changed
    and setting it as a new value for the newNumber "state variable". */
    const handleNumberInputChange = (event) => {
        setNewNumber(event.target.value)
    }

    /*Displaying the Notification, Filter, PersonForm and Persons components resulting in a message
    to display when errors occur or when an operation is successful, list of 
    filtered names and numbers of contacts and input fields, as well as buttons 
    for filtering and adding data. */
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={error} />
            <Filter showNames={showNames} handleFilterInputChangeMethod={handleFilterInputChange} />
            <PersonForm addPersonMethod={addPerson} newName={newName} handleNameInputChangeMethod={handleNameInputChange}
                newNumber={newNumber} handleNumberInputChangeMethod={handleNumberInputChange} />
            <h2>Numbers</h2>
            <Persons contactList={contactsToShow} deleteFunction={handleDelete} />
        </div>
    )
}

export default App
