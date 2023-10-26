/*Importing the useState hook and prop-types, as well as
Form and Button components from react-bootstrap. */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Form onSubmit={addBlog}>
            <Form.Group>
                <h5>Create a new blog:</h5>
                <br />
                <div>
                    <Form.Label>Title:{' '}</Form.Label>
                    <Form.Control size="sm" style={ { width: "240px" }}
                        id="titleInput"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Enter blog title here."
                    />
                </div>
                <div>
                    <Form.Label>Author:{' '}</Form.Label>
                    <Form.Control size="sm" style={{ width: "240px" }}
                        id="authorInput"
                        type="text"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                    />
                </div>
                <div>
                    <Form.Label> Url:{' '}</Form.Label>
                    <Form.Control size="sm" style={{ width: "340px" }}
                        id="urlInput"
                        type="text"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="Enter blog url here."
                    />
                </div>
                <br />
                <div>
                    <Button variant="primary" id="newBlogBtn" type="submit">
                        Create
                    </Button>
                </div>
            </Form.Group>
        </Form>
    )
}

NewBlogForm.propTypes = {
    createMethod: PropTypes.func.isRequired,
}

export default NewBlogForm
