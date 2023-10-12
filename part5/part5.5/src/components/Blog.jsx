//Defining a Blog component for displaying the data of a single blog.
const Blog = ({ blog }) => (
    <div>
        <b>Title:</b> {blog.title} <br/><b>Author:</b> {blog.author}<br/><br/>
    </div>
)

export default Blog
