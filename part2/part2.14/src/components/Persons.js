import personService from './../services/Persons'

//Defining the Persons component containing a list of persons.
const Persons = (props) => {
    return (
        props.contactList.map(person =>
            <Person contact={person} key={person.name} name={person.name} number={person.number} updateFnct={props.updateFunction} />               
        )
    )
}

/*Defining the Person component containing the information of a single contact 
as well as a button for deleting the Person in question from the list of contacts displayed. */
const Person = (props) => {

    /*Defining a function that calls the deleteContact function defined in
    personService with the data of the person to be deleted. Also calls the 
    defined function that updates the list of contacts. */
    const deleteContact = contact => {
        personService.deleteContact(contact)
        props.updateFnct()
    }

    return (
        <><p>{props.name}: {props.number} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => { deleteContact(props.contact) }}>Delete</button></p></>          
    )
}

export default Persons
