//Importing useEffect and the custom useResource and useField hooks.
import { useEffect } from 'react'
import { useResource, useField } from './hooks/index'

const App = () => {

  /*Defining variables for the content, name and number values
  with the useField hook. */
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  /*Defining variables for notes and persons arrays with the custom useResource hook and
  the functions to manipulate them. */
  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  /*Using useEffect and get function defined in useResource to get notes and persons 
  from the db.json through JSON server on first render. */
  useEffect(() => {
    noteService.get()
    personService.get()
  }, [])

  //Defining a function to create a new note when the form is submitted.
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    noteService.get()
  }

  //Defining a function to create a new person when the form is submitted.
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
    personService.get()
  }

  /*Returning a form to create a new Note object, a list of existing notes,
  a form to create a new Person object and a list of existing persons. */
  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
              <input name="noteInput" {...content} />
              <br />
              <br />
        <button>Create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: &nbsp;&nbsp;&nbsp;&nbsp;<input name="nameInput" {...name} /> <br /><br />
              Number: &nbsp;&nbsp;&nbsp;&nbsp;<input name="numberInput" {...number} />
              <br />
              <br />
        <button>Create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App