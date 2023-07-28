/*Defining the PersonForm component containing a form with two input fields and a submit button
used to add contacts to a list. */
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
