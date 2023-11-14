/*Importing the useEffect, useSelector and useDispatch hooks. Also
importing the updateBlogsState function from blogReducer and Link component,
as well as Table component from react-bootstrap. */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogsState } from '../reducers/blogReducer'
import { updateUsersState } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

//Defining a Blogs component for displaying the data of all the existing blogs.
const Blogs = () => {

    /*Defining variables for the useDispatch hook and blogs array as well as
    the user variable with the useSelector hook. */
    const dispatch = useDispatch()

    //Using useSelector to store the array of blogs.
    const blogs = useSelector(state => state.blogs)

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

    /*Initializing the blogs array using the updateBlogsState method
    imported from blogReducer, on first render if it is not already
    initialized. */
    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(updateBlogsState())
        }
    }, [])

    /*Making sure that when a blog is added, the blogs array of
    all users is also updated. */
    useEffect(() => {
        dispatch(updateUsersState())
    }, [blogs.length])

    /*if blogs is truthy a list of currently existing blog is returned.
    Only the title is shown initially as a Link component that can be clicked to
    open a more detailed view with the SingleBlog component. */
    if (blogs) {
        return (
            <div id="blogsContainer">
                <Table striped>
                    <tbody>
                        {blogs.map((blog) => (
                            <div key={blog.id} style={blogStyle}>
                                <div style={titleStyle}>
                                    <Link key={blog.id} to={`/blogs/${blog.id}`} style={titleStyle}>{blog.title}</Link>
                                </div>
                            </div>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Blogs
