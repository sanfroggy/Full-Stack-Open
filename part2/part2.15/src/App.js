//Importing useState, useEffect as well as the necessary services and components.
import { useState, useEffect } from 'react'
import personService from './services/Persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.js'

const App = (props) => {

    /*Creating "state variables" for the person object to be stored
    and the values currently written on the input fields */
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [showNames, setShowNames] = useState('')
    const [contactsToShow, setContactsToShow] = useState([])

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
    the data of an existing person. Current data of persons is received
    from JSON server through getAll function defined in personService and filtered
    to make sure that the deleted contact is also deleted from the current arrays */
    const handleDelete = (id, name) => {
        if (window.confirm(`Do you really want to delete ${name}?`)) {
            personService.deleteContact(id)
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
    input field, as well as updating the list of contacts on the JSON server 
    through createContact function defined in personService. */
    const addPerson = (event) => {
        if (persons.some(person => person.name === newName)) {
            event.preventDefault()

            /*Using window.confirm to ask the user if he/she wants to replace the current
            phonenumber, when a person with the same name already exists in the phonebook.
            The number is the replaced with the entered one through updateContact function
            defined in personService and the person and contactToShow arrays are updated accordingly. */
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
                        setPersons(persons.map(person => person.id !== replacedId ? person : updatedContact))
                        personService.getAll().then(currentData => {
                            setContactsToShow(currentData.filter(contact =>
                                contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
                        })
                    }).catch(error => {
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
                    setContactsToShow([...persons].concat(createdContact).filter(contact =>
                        contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
                    setPersons(persons.concat(createdContact))
                })
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

    /*Displaying the Filter, PersonForm and Persons components resulting in a list of 
    filtered names and numbers of contacts and input fields and buttons 
    for filtering and adding data. */
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter showNames={showNames} handleFilterInputChangeMethod={handleFilterInputChange} />
            <PersonForm addPersonMethod={addPerson} newName={newName} handleNameInputChangeMethod={handleNameInputChange}
                newNumber={newNumber} handleNumberInputChangeMethod={handleNumberInputChange} />
            <h2>Numbers</h2>
            <Persons contactList={contactsToShow} deleteFunction={handleDelete} />
        </div>
    )
}

export default App
