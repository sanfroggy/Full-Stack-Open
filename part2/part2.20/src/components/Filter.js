//Defining the Filter component containing an input field.
const Filter = (props) => {
    return (
        <div>
            Find countries: <input value={props.showCountries} onChange={props.handleFilterInputChangeMethod} />
        </div>
    )
}

export default Filter
