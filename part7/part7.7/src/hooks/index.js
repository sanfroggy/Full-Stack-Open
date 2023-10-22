//Importing the useState and useEffect hooks as well as the axios library.
import { useState, useEffect } from 'react'
import axios from 'axios'

/*Defining a custom "useCountry" hook, that receives a name
and returns a country object. */
const useCountry = (name) => {

    //Defining a baseUrl for the api.
    const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    //Defining a "state variable" for the country to search for.
    const [country, setCountry] = useState(null)

    /*Using the useEffect hook to search for a country from the API, 
    whenever the variable name is changed. */
    useEffect(() => {
        const request = axios.get(baseUrl)
        const response = request.then(response => {
            setCountry(response.data.find(country => country.name.common === name))
        })
    }, [name])

    /*If country is found it's data is returned, if not an object 
    with the property found set to false is returned. */
    if (country) {
        const countryObj = {
            ...country,
            found: true
        }
        return countryObj
    } else {
        const countryObj = {
            found: false
        }
        return countryObj
    }

    
}

export { useCountry }
