//Importing the useState hook.
import { useState } from 'react'

//Defining a Blog component for displaying the data of a single blog.
const Blog = ({ blog, updateMethod }) => {

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

    const showWhenVisible = { display: visible ? '' : 'none' }
    const [buttonLabel, setButtonLabel] = useState('View')

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

    /*Returning the elements desired to be visible by using the 
    toggleVisibility function and the defined showWhenVisible style.
    Also checking if the blog has a defined user to return. */
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
            </div>
        </div>
    )
}

export default Blog            
