import PropTypes from 'prop-types'
import Blog from './Blog'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogsState } from '../reducers/blogReducer'

//Defining a Blogs component for displaying the data of all the existing blogs.
const Blogs = (props) => {

    /*Defining variables for the useDispatch hook and blogs array with the
    useSelector hook. */
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)

    /*Initializing the blogs array using the updateBlogsState method
    imported from blogReducer, on first render. */
    useEffect(() => {
        dispatch(updateBlogsState())
    }, [])

    return (
        <div id="blogsContainer">
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    loggedUser={props.currentUser}
                    deleteMethod={props.handleDelete}
                />
            ))}
        </div>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
Blogs.propTypes = {
    currentUser: PropTypes.object.isRequired,
}

export default Blogs
