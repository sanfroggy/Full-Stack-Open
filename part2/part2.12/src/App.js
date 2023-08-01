//Importing useState and the Person component.
import { useState, useEffect } from 'react'
import axios from 'axios'
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
    const [contactsToShow, setContactsToShow] = useState([...persons])

    /*Getting the data of 4 contacts from JSON server on initial render
    and providing the persons ánd contactsToShow arrays with the
    received data. */
    useEffect(() => { 
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
                setContactsToShow(response.data)
            })
    }, [])

    /*Creating a function to add a new person object to the existing
    persons Array when the button is pressed and preventing the 
    default behavior that would occur when submitting the form. Also checking
    if the given name is already in persons list and generating an
    alert if that is true. Updating the list of contacts to show
    according to the value of the filter input field, as well as
    updating the list of contacts on the JSON server. */
    const addPerson = (event) => {
        if (persons.some(person => person.name === newName)) {
            event.preventDefault()
            alert(`${newName} already exists in the list of contacts.`)
        } else {
            event.preventDefault()
            const personObject = {
                name: newName,
                number: newNumber
            }
            axios.post('http://localhost:3001/persons', personObject)
                .then(response => {
                    setContactsToShow([...persons].concat(response.data).filter(contact =>
                        contact.name.toLowerCase().indexOf(showNames.toLowerCase()) >= 0))
                    setPersons(persons.concat(response.data))
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
        setContactsToShow([...persons].filter(contact => contact.name.toLowerCase().indexOf(
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
            <Persons contactList={contactsToShow} />
        </div>
    )
}

export default App
