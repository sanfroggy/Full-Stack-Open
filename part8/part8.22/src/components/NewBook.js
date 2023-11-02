/*Importing the useState and useMutation hooks. Also importing
the necessary mutations and queries. */
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../services/mutations'
import { useState } from 'react'
import { ALL_BOOKS, ALL_AUTHORS } from '../services/queries'

/*Defining a component to display a form used to 
create a new book. */
const NewBook = ({ setMessage }) => {

  /*Creating state variables to contain the desired
  values of the book object being created. */
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  /*Defining a variable for the useMutation hook and making it
  also refetch the books and authors, when used to add a new book.
  If the query results in an error an appropriate error message is shown. */
  const [createBook] = useMutation(ADD_BOOK, {
      refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
      onError: (error) => {
          setMessage(error.message)

          setTimeout(() => {
              setMessage('')
          }, 5000)
      }
  })

  /*Defining a method to empty the input fields
  and reset the state variables when a new book
  is being created. */
  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: {title, author, published, genres} })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  //Adding a genre for the book.
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
    }

  /*Returning a form with input fields and a submit button. */
  return (
    <div>
        <form onSubmit={submit}>
        <br />
        <div>
          Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <br />
        <div>
          Author:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <br />
        <div>
          Published:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
          </div>
          <br />
          <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={addGenre} type="button">
             Add genre
             </button>
          </div>
          <br />
              <div>Genres: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{genres.join(', ')}</div>
          <br />
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}

export default NewBook