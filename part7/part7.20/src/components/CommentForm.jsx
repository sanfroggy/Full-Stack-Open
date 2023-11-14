/*Importing postComment function from blogReducer and useState and useDispatch hooks,
as well as Form and Button components from react-bootstrap. */
import { postComment } from '../reducers/blogReducer'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

/*Defining a from used to write comments ín a single blog view. It contains
an input field and a button to submit the form. */
const CommentForm = ({ blogId }) => {

    //Defining a "state variable" for comment value and a variable for useDispatch hook.
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    /*Defining a function to add a comment object to the Node backend by using useDispatch
    and the imported postComment action creator. */
    const addComment = (event) => {
        event.preventDefault()

        dispatch(postComment(blogId, { content: comment }))
    }

    /*Returning an input field to set the value of comment and a submit button to submit the form.
    When the form is submitted, the defined addComment method is called. */
    return (
        <div>
            <Form onSubmit={addComment}>
                <input
                    id="commentInput"
                    type="text"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Write a comment..."
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <Button variant="success" type="submit">
                    Add comment </Button>
            </Form>
        </div>
    )
}

export default CommentForm
