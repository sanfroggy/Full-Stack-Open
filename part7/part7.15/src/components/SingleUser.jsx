
const SingleUser = ({ user }) => {

    if (user) {
        console.log(user)
        return (
            <div>
                <h2>{user.name}</h2>
                <p>Added blogs: </p>
                {user.blogs.map((blog) =>
                    <ul key={blog.id}>{blog.title}</ul>
                )}
            </div>
        )
    }

}

export default SingleUser

