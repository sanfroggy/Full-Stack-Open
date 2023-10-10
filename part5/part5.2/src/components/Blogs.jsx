import Blog from './Blog'

const Blogs = (props) => {
    return (
        <div>
            <h2>Blogs:</h2>
            <p>{`Currently logged in as ${props.user.name}`}.</p>

            <button onClick={props.logoutMethod}>Logout</button>
            <br />
            <br />
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs
