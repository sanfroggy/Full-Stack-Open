import PropTypes from 'prop-types'
import Blog from './Blog'

//Defining a Blogs component for displaying the data of all the existing blogs.
const Blogs = (props) => {
    return (
        <div id="blogsContainer">
            {props.blogs.map((blog) => (
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
    blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleUpdate: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default Blogs
