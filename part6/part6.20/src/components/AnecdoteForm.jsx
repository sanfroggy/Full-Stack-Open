const AnecdoteForm = () => {

    /*Defining a method for creating a new Anecdote
    when the button is pressed and the form is submitted. */
    const onCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('new anecdote')
    }

    /*Returning a form containing an input field and a 
    submit button. */
    return (
        <div>
        <h3>Create new</h3>
        <form onSubmit={onCreate}>
            <input name='anecdote' />
            <button type="submit">Create</button>
        </form>
        </div>
    )
}

export default AnecdoteForm
