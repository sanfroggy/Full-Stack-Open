//Importing the useState hook.
import { useState } from 'react'

/*Defining a NewBlogForm component with text type input
fields and a submit button. The actual function that passes 
the data required for the creation of the new blog 
to the Node backend is received as parameter*/
const NewBlogForm = ({createMethod}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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

export default NewBlogForm
