/*Importing useQuery and useMutation hooks from apollo client, as well as
useState hook and the defined ALL_AUTHORS query. */
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../services/queries'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../services/mutations'

/*Defining a component to display an array of authors
in an html table. */
const Authors = () => {

  /*Using the useQuery hook to get all author objects 
  from backend. */
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  /*Defining a variable for the useMutation hook and making it
  also refetch the authors, when used to change an
  author's birthyear. */
  const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{ query: ALL_AUTHORS }]
  })

  /*Defining a function to submit the form receiving the 
  necessary input, reset the input fields and set the variables
  for the triggered mutation. */
  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name, setBornTo: born } })
    setName('')
    setBorn('')
  }

  if (result.loading) {
    return <div>Loading...</div>
    }

  const authors = [...result.data.allAuthors]

  /*Returning an html table with the name, birthyear and book written
  by each author object in the authors array. Also returning a form with
  input fields and a submit button, enabling the user to change
  an author's year of birth. */
  return (
    <div>
      <h2>Authors: </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
                      <th>&nbsp;&nbsp;&nbsp; Born:</th>
                      <th>&nbsp;&nbsp;&nbsp; Books:</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.born}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
          <form onSubmit={submit}>
         <h2>Set birthyear of an author: </h2>
         <br />
         <div>
            Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
               value={name}
               onChange={({ target }) => setName(target.value)}
            />
         </div>
         <br />
         <div>
           Born:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(parseInt(target.value))}
            />
         </div>
         <br />
         <button type="submit">Save changes</button>
      </form>
    </div>
  )
}

export default Authors
