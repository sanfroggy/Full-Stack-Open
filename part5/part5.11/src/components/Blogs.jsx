import Blog from './Blog'

//Defining a Blogs component for displaying the data of all the existing blogs.
const Blogs = (props) => {
    return (
        <div>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateMethod={props.handleUpdate}
                    loggedUser={props.currentUser} deleteMethod={props.handleDelete} />
            )}
        </div>
    )
}

export default Blogs
