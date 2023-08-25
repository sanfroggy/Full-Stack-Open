/* eslint-disable react-hooks/exhaustive-deps */

//Importing useState, useEffect as well as the necessary services and components.
import { useState, useEffect } from 'react'
import countryService from './services/Countries'
import Countries from './components/Countries'
import Country from './components/Country'
import Filter from './components/Filter'
import Message from './components/Message'

const App = (props) => {

    /*Creating "state variables" in which all countries and countries to be shown 
    will be stored and also for the value currently written on the filter input field 
    Also creating a variable for the api_key and "state variables" for weather data.*/
    const api_key = process.env.REACT_APP_API_KEY
    const [countries, setCountries] = useState([])
    const [showCountries, setShowCountries] = useState('')
    const [countriesToShow, setCountriesToShow] = useState([])
    const [weatherObj, setWeatherObj] = useState({ temperature: '', iconCode: '', description: '', wind: '', })
    const [weatherObjects, setWeatherObjects] = useState([])

    /*Getting the data of all countries throught the restcountries api using
    the getAll function defined in the countryService on initial render. Also 
    using the useEffect hook to update the displayed data, whenever the value
    in the filter field is changed. */
    useEffect(() => {
        countryService.getAll().then(initialData => {
            setCountries([...initialData].map(countryData => countryData = {
                key: countryData.name.common,
                name: countryData.name.common,
                capital: countryData.capital,
                area: countryData.area,
                languages: countryData.languages,
                flagUrl: countryData.flags.png
            }))
            setCountriesToShow(countries.filter(country => country.name.toLowerCase().indexOf(
                showCountries.toLowerCase()) >= 0))
        })

    }, [])

    useEffect(() => {
        setCountriesToShow(countries.filter(country => country.name.toLowerCase().indexOf(
            showCountries.toLowerCase()) >= 0))

    }, [showCountries])

    /*Getting the value of the input field when it is changed
    and setting it as a new value for the showCountries "state variable". */
    const handleFilterInputChange = (event) => {
        setShowCountries(event.target.value)
    }

    /*Updating the countriesToShow array to show only the information
    of the country related to the button pressed. */
    const handleButtonPress = (name) => {
        setCountriesToShow(countries.filter(country => country.name === name))
    }

    /*Getting the weather data of a single capital through getWeather function
    defined in countryService. The function uses openweathermap.org api.*/
    const getWeather = (city) => {
        countryService.getWeather(city, api_key).then(weatherData => {
            const newObject = {
                temperature: weatherData.main.temp,
                iconCode: weatherData.weather[0].icon,
                description: weatherData.weather[0].description,
                wind: weatherData.wind.speed
            }
            setWeatherObj(newObject)
        }).catch (error => {
            console.log(error)
        })
        
    }

    /*Getting the weather data of a a country with multiple capitals (e.g. South Africa)
    through getWeather function defined in countryService. The function uses openweathermap.org api. */
    const getWeathers = (cities) => {
        setWeatherObjects([])
        cities.forEach(city => {
            countryService.getWeather(city, api_key).then(weatherData => {
                const newObject = {
                    name: city,
                    temperature: weatherData.main.temp,
                    iconCode: weatherData.weather[0].icon,
                    description: weatherData.weather[0].description,
                    wind: weatherData.wind.speed
                }
                setWeatherObjects((prev) => prev.concat(newObject))
            })
        })
    }

    /*Displaying the required components according to the size of the filtered data array.
    If the length of the countriesToShow array is more than 10 only message needs to be shown.
    If it is less than 10 either the information of a single country or multiple countries 
    is displayed in Country or Countries component. Filter component needs to be displayed always. */
    if (countriesToShow.length > 10 || (countriesToShow.length === 0 && showCountries === '')) {
        return (
            <div>
                <Filter showCountries={showCountries} handleFilterInputChangeMethod={handleFilterInputChange} />
                <Message message='Too many matches, specify filter value further' />
            </div>
        )
    } else {
        if (countriesToShow.length > 1) {
            return (
                <div>
                    <Filter showCountries={showCountries} handleFilterInputChangeMethod={handleFilterInputChange} />
                    <Countries countryList={countriesToShow} showFnct={handleButtonPress} />
                </div>
            )
        } else {
            return (
                <div>
                    <Filter showCountries={showCountries} handleFilterInputChangeMethod={handleFilterInputChange} />
                    {countriesToShow.map((country) =>
                        <Country key={country.name} name={country.name} capital={country.capital} area={country.area}
                            languages={country.languages} flagUrl={country.flagUrl} wthrFnct={getWeather} wthrObj={weatherObj}
                            wthrsFnct={getWeathers} wthrsObj={weatherObjects} />
                    )}

                </div>
            )
        }
    }

}

export default App
