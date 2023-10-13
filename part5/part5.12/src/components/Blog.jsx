//Importing the useState and useEffect hooks as well as prop-types.
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

//Defining a Blog component for displaying the data of a single blog.
const Blog = (({ blog, updateMethod, loggedUser, deleteMethod }) => {

    /*Creating css inline styles to style the blog info display and
    to hide the borders and background from a button to make
    the blog title a clickable label. */
    const blogStyle = {
        border: 'solid',
        borderWidth: 2.5,
        marginBottom: 12,
        alignItems: 'center',
        backgroundColor: '#D7DBDD',
        color: 'black'
    }

    const titleButtonStyle = {
        border: 'none',
        backgroundColor: '#D7DBDD',
        fontSize: 14
    }

    /*Creating "state variables" to control the visibility of elements
    and the label of the view/hide button. */
    const [visible, setVisible] = useState(false)
    const [removable, setRemovable] = useState(false)
    const showWhenVisible = { display: visible ? '' : 'none' }
    const [buttonLabel, setButtonLabel] = useState('View')

    /*Using the useEffect hook to check if the blog was created
    by the same user that is currently logged in and to set
    the value of removable "state variable" correctly. */
    useEffect(() => {
        if (blog.user === undefined || blog.user === null) {
            setRemovable(false)
        } else {
            if (blog.user.username === loggedUser.username) {
                setRemovable(true)
            } else {
                setRemovable(false)
            }
        }
    }, [blog.user, loggedUser])

    //Creating a function to toggle visibility and button label.
    const toggleVisibility = () => {
        setVisible(!visible)
        if (buttonLabel === 'View') {
            setButtonLabel('Hide')
        }
        if (buttonLabel === 'Hide') {
            setButtonLabel('View')
        }
    }

    /*Creating a function to increase the likes of a blog by one
    when the like button is pressed. */
    const handleLikes = async (event) => {
        event.preventDefault()

        updateMethod({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
            user: blog.user
        })
    }

    /*Creating a function to send the id of the blog to the delete function
    received as a parameter. */
    const handleDelete = async (event) => {
        event.preventDefault()
        deleteMethod(blog.id)
    }

    /*Returning the elements desired to be visible by using the 
    toggleVisibility function and the defined showWhenVisible style.
    Also checking if the blog has a defined user to return and if
    the blog is removable by the user currently loggged in. */
    return (
        <div style={blogStyle}>
            <b>Title:</b> <button style={titleButtonStyle} onClick={toggleVisibility}> {blog.title}</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={toggleVisibility}>{buttonLabel}</button>
            <div style={showWhenVisible}>
                <br /><b>Url:</b> {blog.url}<br />
                <br /><b>Likes:</b> {blog.likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={handleLikes}>Like</button><br />
                <br /><b>Author:</b> {blog.author}<br />
                {blog.user && <div><br /><b>Added by:</b> {blog.user.name}</div>}
                {removable === true && <div><br /><button onClick={handleDelete}>Remove</button></div>}
            </div>
        </div>
    )
})

//Using prop-types to give a warning if necessary values are not received correctly.
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateMethod: PropTypes.func.isRequired,
    loggedUser: PropTypes.object.isRequired,
    deleteMethod: PropTypes.func.isRequired
}

export default Blog            