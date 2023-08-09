//Defining the Persons component containing a list of persons.
const Persons = (props) => {
    return (
        props.contactList.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
        )
    )
}

//Defining the Person component containing the information of a single contact.
const Person = (props) => {
    return (
        <p>{props.name}: {props.number}</p>
    )
}

export default Persons
