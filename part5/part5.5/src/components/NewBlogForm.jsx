/*Defining a NewBlogForm component with text type input
fields and a submit button. The required methods and data are received
as parameters. */
const NewBlogForm = ({
    createMethod,
    titleInputChangeMethod,
    authorInputChangeMethod,
    urlInputChangeMethod,
    title,
    author,
    blogurl
}) => {
    return (
        <form onSubmit={createMethod}>
            <h2>Create a new blog:</h2>
            <div>
                Title: <input type="text" value={title} onChange={titleInputChangeMethod} />
            </div>
            <br/>
            <div>
                Author: <input type="text" value={author} onChange={authorInputChangeMethod} />
            </div>
            <br />
            <div>
               Url: <input type="text" value={blogurl} onChange={urlInputChangeMethod} />
            </div>
            <br />
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

export default NewBlogForm
