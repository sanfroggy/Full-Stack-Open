/*Defining and exporting a component containing the name
of a single user and blogs created by that user. */
const SingleUser = ({ user }) => {

    if (user) {
        return (
            <div>
                <h3>{user.name}</h3>
                <br />
                <p>Added blogs: </p>
                {user.blogs.map((blog) =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </div>
        )
    }

}

export default SingleUser

