/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//Defining the Persons component containing a list of persons.
const Persons = (props) => {
  return (
    props.contactList.map(person =>
      <Person contact={person} key={person.name} name={person.name} number={person.number}
        deleteFnct={props.deleteFunction} />
    )
  )
}

/*Defining the Person component containing the information of a single contact
as well as a button and a related function for deleting the Person in question
from the list of contacts displayed. */
const Person = (props) => {

  return (
    <><p>{props.name}: {props.number} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => { props.deleteFnct(props.contact.id, props.name) }}>Delete</button></p></>
  )
}

export default Persons
