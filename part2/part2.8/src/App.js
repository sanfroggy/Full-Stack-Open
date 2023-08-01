//Importing useState and the Person component.
import { useState } from 'react'
import Person from './components/Person'

const App = (props) => {

    /*Creating "state variables" for the person object to be stored
    and the values currently written on the input fields */
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '+358 45 2235689' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    /*Creating a function to add a new person object to the existing
    persons Array when the button is pressed and preventing the 
    default behavior that would occur when submitting the form. Also checking
    if the given name is already in persons list and generating an
    alert if that is true. */
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
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
        }
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

    //Displaying the form components as well as the names and numbers in the persons Array.
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    Name: <input value={newName} onChange={handleNameInputChange} />
                </div>
                <br></br>
                <div>
                    Number: <input value={newNumber} onChange={handleNumberInputChange} />
                </div>
                <br></br>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <Person key={person.name} name={person.name} number={person.number} />
            )}
        </div>
    )

}

export default App
