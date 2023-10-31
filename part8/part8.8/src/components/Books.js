/*Defining a component to display an array of books
in an html table. */
const Books = () => {

  const books = []

  /*Returning an html table with the title, author and year of
  publication of each book object in books array. */
  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author:</th>
            <th>Published:</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
