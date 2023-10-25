import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateBlogsLikes, updateBlogsState, removeBlog } from '../reducers/blogReducer'

/*Defining a SingleBlog component to provide a more detailed view
of a single blog object, when a link is clicked. */
const SingleBlog = ({ loggedUser }) => {

    /*Using useSelector and useParams hooks to get existing blogs and
    an id from url parameters. Also using the id variable to search
    for the blog, that had it's title clicked and should be displayed. */
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)

    //Using useState to define if the blog is removable by currently logged in user.
    const [removable, setRemovable] = useState(false)

    /*Creating variable for the useDispatch and useNavigate hooks. */
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /*Initializing the blogs array using the updateBlogsState method
    imported from blogReducer, on first render if it is not already
    initialized. */
    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(updateBlogsState())
        }
    }, [])

    /*Using the useEffect hook to set removability of blog. If the currently
    logged in user is the one that has created the blog as usernames are unique
    in the system, removable is set tot true. This is checked whenever the
    blog item or the loggedUser have changed. */
    useEffect(() => {
        if (blog && loggedUser) {
            if (blog.user === undefined || blog.user === null) {
                setRemovable(false)
            } else {
                if (blog.user.username === loggedUser.username) {
                    setRemovable(true)
                } else {
                    setRemovable(false)
                }
            }
        }
    }, [loggedUser, blog])

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

    /*Creating a function to dispatch the removeBlog action creator
    if the removal is confirmed and navigate to "homepage" after removal. */
    const handleDelete = (event) => {

        event.preventDefault()

        if (window.confirm(`Do you really want to remove ${blog.title}
        from the list of blogs?`)) {
            dispatch(removeBlog(blog.id, blog.title, loggedUser))
            navigate('/')
        }
    }

    /*If blog has a proper defined value the details of the blog are returned,
    along with a like button and a remove button if the user is the same that
    added the blog. If a blog no longer exists, but is still set as the blog to be displayed,
    useNavigate is also used to take the user back to the "homepage". */
    if (blog) {
        return (
            <div>
                <h2>{blog.title} by {blog.author}</h2>
                <br />
                {blog.url}
                <br />
                <br />
                {blog.likes} likes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <button id='likeBtn' onClick={handleLikes}>Like</button>
                <br />
                {blog.user && (
                    <div>
                        <br />
                        <b>Added by:</b> {blog.user.name}
                    </div>
                )}
                <br />
                <b>Comments:</b>
                <br />
                <br />
                <div>
                    {blog.comments.length > 0 ? blog.comments.map(comment =>
                        <li key={ comment.id }>{ comment.content }</li>
                    ) : null}
                </div>
                {removable && (
                    <div>
                        <br />
                        <button onClick={handleDelete}>Remove</button>
                    </div>
                )}
            </div>
        )
    } else {
        navigate('/')
    }
}

export default SingleBlog

export { SingleBlog }
