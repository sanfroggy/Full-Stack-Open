//Defining the Person component.
const Persons = (props) => {
    return (
        props.contactList.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
        )
    )
}

const Person = (props) => {
    return (
        <p>{props.name}: {props.number}</p>
    )
}

export default Persons
