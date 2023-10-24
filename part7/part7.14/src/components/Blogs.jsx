import Blog from './Blog'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlogsState } from '../reducers/blogReducer'

//Defining a Blogs component for displaying the data of all the existing blogs.
const Blogs = () => {

    /*Defining variables for the useDispatch hook and blogs array as well as
    the user variable with the useSelector hook. */
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)

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
                    loggedUser={user}
                />
            ))}
        </div>
    )
}

export default Blogs
