/*Importing useQuery and useMutation hooks from apollo client, as well as
useState hook and the defined ALL_AUTHORS query. */
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../services/queries'
import { useState, useEffect } from 'react'
import { EDIT_AUTHOR } from '../services/mutations'

/*Defining a component to display an array of authors
in an html table. */
const Authors = ({ token, setMessage }) => {

  /*Using the useQuery hook to get all author objects 
  from backend. */
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  /*Defining a variable for the useMutation hook and making it
  also refetch the authors, when used to change an
  author's birthyear. */
  const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
      refetchQueries: [{ query: ALL_AUTHORS }],
      onError: (error) => {
          setMessage(error.message)

          setTimeout(() => {
              setMessage('')
          }, 4000)
      }
  })

  /*Defining a function to submit the form receiving the 
  necessary input, reset the input fields and set the variables
  for the triggered mutation. */
    const submit = async (event) => {
        event.preventDefault()

        /*If born has a value of 'NaN' e.g. empty string, the mutation
        is not attempted. */
        if (born && born !== 'NaN') {
            changeBirthyear({ variables: { name, setBornTo: born } })
        }
    }

    /*Using the useEffect hook to make sure that the name
    "state variable" has a proper value, even if it is an
    empty string by default. */
    useEffect(() => {
        if (!result.loading && name === '') {
            setName(result.data.allAuthors[0].name)
        }
    }, [result.data])

  /*If the query is still processing results, only a
  descriptive text is returned. */
  if (result.loading) {
    return <div><br />Loading...<br /></div>
  }

  let authors = [...result.data.allAuthors]


  /*Returning an html table with the name, birthyear and book written
  by each author object in the authors array. Also returning a form with
  a select (dropdown) menu to choose from existing users and a submit button, 
  enabling the user to change an author's year of birth. This form is only
  returned if a proper token is present meaning that a user is logged in. */
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
          {token ? <form onSubmit={submit}>
              <h2>Set the birthyear of an author: </h2>
              <br />
              <div>
                  Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <select onChange={({ target }) => setName(target.value)}>
                      {authors.map(author =>
                          <option key={author.id} value={author.name} label={author.name} />
                      )}
                  </select>
              </div>
              <br />
              <div>
                  Born:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input
                      style={{ width: '80px' }}
                      type="number"
                      value={born !== 'NaN' ? born : ''}
                      onChange={({ target }) => target.value !== '' ? setBorn(parseInt(target.value)) : setBorn('NaN')}
                  />
              </div>
              <br />
              <button type="submit">Save changes</button>
          </form> : null}
    </div>
  )
}

export default Authors
