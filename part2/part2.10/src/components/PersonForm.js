const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPersonMethod}>
            <h2>Add a new contact: </h2>
            <div>
                Name: <input value={props.newName} onChange={props.handleNameInputChangeMethod} />
            </div>
            <br></br>
            <div>
                Number: <input value={props.newNumber} onChange={props.handleNumberInputChangeMethod} />
            </div>
            <br></br>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
