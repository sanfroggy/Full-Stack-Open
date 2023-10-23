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
    const blogs = useSelector((state) => state.blogs)

    useEffect(() => {
        dispatch(updateBlogsState())
    }, [])

    return (
        <div id="blogsContainer">
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateMethod={props.handleUpdate}
                    loggedUser={props.currentUser}
                    deleteMethod={props.handleDelete}
                />
            ))}
        </div>
    )
}

//Using prop-types to give a warning if necessary values are not received correctly.
Blogs.propTypes = {
    handleUpdate: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default Blogs
