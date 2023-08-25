/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

//Defining a Country component containing the information of a given country.
const Country = (props) => {

    const imgStyle = {
        width: 300,
        height: 200
    }

    useEffect(() => {
        if (props.capital !== undefined && props.capital.length === 1) { 
            props.wthrFnct(props.capital)
        }
        if (props.capital !== undefined && props.capital.length > 1) {
            props.wthrsFnct(props.capital)
        }
        /*if (props.capital !== undefined && props.capital.length > 1) {
            props.capital.forEach(capital => {
                props.wthrFnct(capital)
                const newWeatherObj = {
                    name: capital.name,
                    temperature: props.wthrObj.temperature,
                    iconCode: props.wthrObj.iconCode,
                    description: props.wthrObj.description,
                    wind: props.wthrObj.wind
                }

                setWeatherObjects(weatherObjects.concat(newWeatherObj))
            })         
        }*/
    }, [])

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
                    <div>
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
                    </div>

                    <>
                        {Object.values(props.wthrsObj).map((value) =>
                            <div key={`${value.name}Div`}>
                                <h2>{`Weather in ${value.name}:`}</h2>
                                <p>Temperature: {`${value.temperature} Celsius`}</p>
                                <img src={`https://openweathermap.org/img/wn/${value.iconCode}.png`} alt={value.description} />
                                <p>Wind: {`${value.wind} m/s`}</p>
                            </div>
                        )}
                    </>
                </>
            )
        } else {
            
            const weatherObject = props.wthrObj
            const iconUrl = `https://openweathermap.org/img/wn/${weatherObject.iconCode}.png`
            return (
                <>
                    <div>
                        <h1>{props.name} {"\n"}</h1>
                        <p>Capital: {props.capital}</p>
                        <p>Area: {props.area} {"\n"}</p>
                        <h4>Languages: </h4>
                        <p>
                            {props.languages === undefined ? 'N/A' : Object.values(props.languages).map((value) =>
                                <li key={value}>{value}</li>
                            )}
                        </p>
                    </div>
                    <img style={imgStyle} src={props.flagUrl} alt={`Flag of ${props.name}`} />
                    <div>
                        <h2>{`Weather in ${props.capital}:`}</h2>
                        <p>Temperature: {weatherObject.temperature === '' ? 'N/A' : `${weatherObject.temperature} Celsius`}</p>
                        <img src={weatherObject.iconCode === '' ? null : iconUrl}
                            alt={weatherObject.description === '' ? 'N/A' : weatherObject.description} />
                        <p>Wind: {weatherObject.wind === '' ? 'N/A' : `${weatherObject.wind} m/s`}</p>
                    </div>
                </>
            )
        }
    }
}

export default Country
