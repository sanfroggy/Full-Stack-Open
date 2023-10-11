/*Defining a NewBlogForm component with text type input
fields and a submit button. The required methods and data are received
from props. */
const NewBlogForm = (props) => {
    return (
        <form onSubmit={props.createMethod}>
            <h2>Create a new blog:</h2>
            <div>
                Title: <input type="text" value={props.title} onChange={props.titleInputChangeMethod} />
            </div>
            <br/>
            <div>
                Author: <input type="text" value={props.author} onChange={props.authorInputChangeMethod} />
            </div>
            <br />
            <div>
               Url: <input type="text" value={props.blogurl} onChange={props.urlInputChangeMethod} />
            </div>
            <br />
            <div>
                <button type="submit">Create</button>
            </div>
        </form>
    )
}

export default NewBlogForm
