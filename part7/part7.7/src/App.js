//Importing the hooks useState, useEffect and a custom hook useCountry.
import React, { useState } from 'react'
import { useCountry } from './hooks'

//Defining a custom hook useField to use with the input fields.
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

/*Defining a country component containing nothing if the country "state variable"
has no value. If country is not found a text message is displayed and if a country
is found the component returns the data of the country.*/
const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        Country is not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
          <div>Capital: {country.capital} </div>
      <br />
          <div>Population: {country.population}</div> 
      <br />
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  //Defining the nameInput object with the useField hook, name "state variable" and country variable.
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  //Defining a fetch function to set the state of the name variable when the button is pressed.
  const fetch = (e) => {
    e.preventDefault()
      setName(nameInput.value)
  }

  /*If the name variable does not contain a value because the input field is empty,
  no Country component is rendered. If it does contain a value the Country component
  is displayed. */
  if (name) {
    return (
      <div>
        <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>Find</button>
      </form>

      <Country country={country} />
      </div>
    )
  } else {
    return (
      <div>
        <form onSubmit={fetch}>
          <input {...nameInput} />
          <button>Find</button>
        </form>

      </div>
    )
  }

}

export default App
