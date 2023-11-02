/*Importing useQuery hook from apollo client as well as the
useState and useEffect hooks and the defined ALL_BOOKS query. */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../services/queries'
import { useState, useEffect } from 'react'

/*Defining a component to display an array of books
in an html table. */
const Books = () => {

    /*Using the useQuery hook to get all book objects 
    from backend. */
    const result = useQuery(ALL_BOOKS)

    /*Defining "state variables" for books, selected genre 
    and the array of genres. */
    const [books, setBooks] = useState(result)
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState('')

    /*Defining an ALL_BOOKS query with variables to get
    only the books with a specific genre. */
    const resultWithGenre = useQuery(ALL_BOOKS, {
        variables: { genre: genre }
    })

    /*Defining a variable to periodically keep the genres gathered with map
    function from the books array. */
    const genreArr = []

    /*Using the useEffect hook to make sure, that whenever the books array
    changes e.g a new book is added, the array of filterable genres is
    updated accordingly as well. */
    useEffect(() => {
        if (!result.loading) {
            result.data.allBooks.map(b => b.genres.map(g => {
                if (!genreArr.includes(g)) {
                    genreArr.push(g)
                    
                }
            }))
        }
        setGenres(genreArr)
    }, [books])

    /*Using the useEffect hook, to make sure that whenever the result of
    ALL_BOOKS query without parameters changes, the book array is changed as well. */
    useEffect(() => {
        if (!result.loading) {
            setBooks(result.data.allBooks)
        }
    }, [result])

    /*Using the useEffect hook, to make sure that whenever the result of
    ALL_BOOKS query with parameters changes, the book array is filtered accordingly. */
    useEffect(() => {
        console.log(resultWithGenre)
        if (!resultWithGenre.loading) {
            setBooks(resultWithGenre.data.allBooks)
        }
    }, [resultWithGenre])

    //If results are still loading, only the text "Loading..." is returned.
    if (result.loading) {
        return <div><br />Loading...<br /></div>
    } 

    //Defining a button style for the genre filter buttons to keep them in row.
    const btnStyle = {
        display: 'inline-block'
    }

  /*Returning an html table with the title, author and year of
  publication of each book object in books array. Also returning
  a button for each existing genre to filter books shown. */
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
          {books.length > 0 ? books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;{a.author.name}</td>
                  <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{a.published}</td>
            </tr>
          )) : null}
        </tbody>
          </table>
        <br />
          <div>
              {genres.length > 0 ? genres.map((g) =>
                  <div key={g} style={btnStyle}><button key={g} onClick={() => setGenre(g)}> {g}</button>
                 &nbsp;&nbsp;&nbsp;&nbsp;</div>
        ) : null}
        </div>
    </div>
  )
}

export default Books
