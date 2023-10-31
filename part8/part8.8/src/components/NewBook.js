//Importing the useState hook.
import { useState } from 'react'

/*Defining a component to display a form used to 
create a new book. */
const NewBook = () => {

  /*Creating state variables to contain the desired
  values of the book object being created. */
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  /*Defining a method to empty the input fields
  and reset the state variables when a new book
  is being created. */
  const submit = async (event) => {
    event.preventDefault()

    console.log('Add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  //Adding a genre.
  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  /*Returning a form with input fields and a submit button. */
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            Add genre
          </button>
        </div>
        <div>Genres: {genres.join(' ')}</div>
        <button type="submit">Create book</button>
      </form>
    </div>
  )
}

export default NewBook