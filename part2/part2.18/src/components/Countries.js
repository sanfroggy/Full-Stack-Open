/* Defining the Countries component containing the names of 
countries in the received list.*/
const Countries = (props) => {
    return (
        props.countryList.map(country =>
            <p key={country.key}>{country.name}{"\n"}</p>
        )
    )   
}

export default Countries
