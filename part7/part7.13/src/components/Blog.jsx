/*Importing the useState, useDispatch and useEffect hooks as well as prop-types
and the updateBlogLikes method. */
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { updateBlogsLikes, removeBlog } from '../reducers/blogReducer'

//Defining a Blog component for displaying the data of a single blog.
const Blog = ({ blog, loggedUser }) => {

    /*Creating css inline styles to style the blog info display and
    to hide the borders and background from a button to make
    the blog title a clickable label. */
    const blogStyle = {
        border: 'solid',
        borderWidth: 2.5,
        marginBottom: 12,
        alignItems: 'center',
        backgroundColor: '#D7DBDD',
        color: 'black',
    }

    const titleButtonStyle = {
        border: 'none',
        backgroundColor: '#D7DBDD',
        fontSize: 14,
    }

    /*Creating "state variables" to control the visibility of elements
    and the label of the view/hide button. */
    const dispatch = useDispatch()
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
    const handleLikes = (event) => {
        event.preventDefault()

        dispatch(updateBlogsLikes({
            id: blog.id,
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
            user: blog.user,
        }))
    }

    /*Returning the elements desired to be visible by using the
    toggleVisibility function and the defined showWhenVisible style.
    Also checking if the blog has a defined user to return and if
    the blog is removable by the user currently loggged in. */
    return (
        <div style={blogStyle}>
            <b>Title:</b>{' '}
            <button style={titleButtonStyle} onClick={toggleVisibility}>
                {' '}
                {blog.title}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={toggleVisibility}>{buttonLabel}</button>
            <div data-testid="blogInfo" className="blogInfoContainer" style={showWhenVisible}>
                <br />
                <b>Url:</b> {blog.url}
                <br />
                <br />
                <b>Likes:</b> {blog.likes}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button id="likeBtn" onClick={handleLikes}>
                    Like
                </button>
                <br />
                <br />
                <b>Author:</b> {blog.author}
                <br />
                {blog.user && (
                    <div>
                        <br />
                        <b>Added by:</b> {blog.user.name}
                    </div>
                )}
                {removable === true && (
                    <div>
                        <br />
                        <button onClick={() => { dispatch(removeBlog(blog.id, blog.title, loggedUser)) }}>Remove</button>
                    </div>
                )}
            </div>
        </div>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    loggedUser: PropTypes.object.isRequired,
}

export default Blog
