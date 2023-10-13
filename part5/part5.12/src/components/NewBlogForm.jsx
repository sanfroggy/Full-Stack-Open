//Importing the useState hook and prop-types.
import { useState } from 'react'
import PropTypes from 'prop-types'

/*Defining a NewBlogForm component with text type input
fields and a submit button. The actual function that passes 
the data required for the creation of the new blog 
to the Node backend is received as parameter*/
const NewBlogForm = ({ createMethod }) => {

    //Defining the "state variables" for title, author and url.
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    /*Creating the new blog item with the data from the input
    fields and passing it to the received function that provides
    the Node backend with the data. Also resetting the values of 
    the input fields. */
    const addBlog = async (event) => {

        event.preventDefault()

        createMethod({
            title: title,
            author: author,
            url: url
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <h2>Create a new blog:</h2>
            <div>
                Title: <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <br/>
            <div>
                Author: <input type="text" value={author} onChange={event => setAuthor(event.target.value)} />
            </div>
            <br />
            <div>
                Url: <input type="text" value={url} onChange={event => setUrl(event.target.value)} />
            </div>
            <br />
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
NewBlogForm.propTypes = {
    createMethod: PropTypes.func.isRequired,
}

export default NewBlogForm
