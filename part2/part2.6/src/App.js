//Importing useState and the Person component.
import { useState } from 'react'
import Person from './components/Person'

const App = (props) => {

    /*Creating "state variables" for the person object to be stored
    and the name currently written on the input field */
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    /*Creating a function to add a new person object to the existing
    persons Array when the button is pressed and preventing the 
    default behavior that would occur when submitting the form. */ 
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }
        setPersons(persons.concat(personObject))
    }

    /*Getting the value of the input field when it is changed
    and setting it as a new value for the newName "state variable". */
    const handleNameInputChange = (event) => {
        setNewName(event.target.value)
    }

    //Displaying the form components as well as the names in the persons Array.
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                Name: <input value={newName} onChange={handleNameInputChange} />
                <br></br>
                <button type="submit">Add</button>
            </form>
            <h2>Numbers</h2>
                {persons.map(person =>
                    <Person key={person.name} name={person.name} />
                )}
        </div>
    )

}

export default App
