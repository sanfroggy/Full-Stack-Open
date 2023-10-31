/*Importing useQuery hook from apollo client abd the 
defined ALL_AUTHORS query. */
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../services/queries'

/*Defining a component to display an array of authors
in an html table. */
const Authors = () => {

    /*Using the useQuery hook to get all author objects 
    from backend. */
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = [...result.data.allAuthors]

  /*Returning an html table with the name, birthyear and book written
  by each author object in the authors array. */
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
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.name}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.born}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
