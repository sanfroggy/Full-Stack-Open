/*Importing useQuery hook from apollo client abd the 
defined ALL_BOOKS query. */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../services/queries'

/*Defining a component to display an array of books
in an html table. */
const Books = () => {

  /*Using the useQuery hook to get all book objects 
  from backend. */
  const result = useQuery(ALL_BOOKS, {
        pollInterval: 500
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = [...result.data.allBooks]

  /*Returning an html table with the title, author and year of
  publication of each book object in books array. */
  return (
    <div>
      <h2>Books:</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author:</th>
                      <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Published:</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;{a.author.name}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
