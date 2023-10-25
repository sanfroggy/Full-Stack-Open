/*Importing the useState, useDispatch and useEffect hooks as well as prop-types
and the updateBlogLikes and removeBlog methods. */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

//Defining a Blog component for displaying the data of a single blog.
const Blog = ({ blog }) => {

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

    const titleStyle = {
        border: 'none',
        backgroundColor: '#D7DBDD',
        fontSize: 14,
    }

    /*Returning the elements desired to be visible by using the
    toggleVisibility function and the defined showWhenVisible style.
    Also checking if the blog has a defined user to return and if
    the blog is removable by the user currently loggged in. */
    return (
        <div style={blogStyle}>
            <div style={titleStyle}>
                <Link to={`/blogs/${blog.id}`} style={titleStyle}>{blog.title}</Link>
            </div>
        </div>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog
