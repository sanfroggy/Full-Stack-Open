//Defining a Country component containing the information of a given country.
const Country = (props) => {

    const imgStyle = {
        width: 300,
        height: 200
    }

    /*Checking if a capital exists (E.g. Antarctica does not contain a capital.)
     and returning the information of the country. Also checking if the country has
     spoken languages. (Once again e.g. Antarctica.) */
    if (props.capital === null || props.capital === undefined) {
        return (
            <>
                <h1>{props.name} {"\n"}</h1>
                <p>Capital: N/A </p>
                <p>Area: {props.area} {"\n"}</p>
                <h4>Languages: </h4>
                <p>
                    {props.languages === undefined ? 'N/A' : Object.values(props.languages).map((value) =>
                        <li key={value}>{value}</li>
                    )}
                </p>
                <img style={imgStyle} src={props.flagUrl} alt={`Flag of ${props.name}`} />
            </>
        )     
    } else {

        /*Checking if the country has more than 1 capital (E.g. South Africa)
        and returning the information presented in an approppriate manner. */
        if (props.capital.length > 1) {

            const lastCapital = props.capital[props.capital.length - 1]
            const capitalString = props.capital.slice(0, -1).map((capital) => ` ${capital},`)

            return (
                <>
                    <h1>{props.name} {"\n"}</h1>
                    <p>
                        Capitals:
                        {capitalString} {lastCapital}
                    </p>
                    <p>Area: {props.area} {"\n"}</p>
                    <h4>Languages: </h4>
                    <p>
                        {props.languages === undefined ? 'N/A' : Object.values(props.languages).map((value) =>
                            <li key={value}>{value}</li>
                        )}
                    </p>
                    <img style={imgStyle} src={props.flagUrl} alt={`Flag of ${props.name}`} />
                </>
            )
        } else {
            return (
                <>
                    <h1>{props.name} {"\n"}</h1>
                    <p>Capital: {props.capital}</p>
                    <p>Area: {props.area} {"\n"}</p>
                    <h4>Languages: </h4>
                    <p>
                        {props.languages === undefined ? 'N/A' : Object.values(props.languages).map((value) =>
                            <li key={value}>{value}</li>
                        )}
                    </p>
                    <img style={imgStyle} src={props.flagUrl} alt={`Flag of ${props.name}`} />
                </>
            )
        }
    }
}

export default Country
