import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/'

//Creating a function to return all countries from the restcountries api.
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

//Creating a function to return weather data from the openweathermap api.
const getWeather = (city, api_key) => {
    const request = axios.get(`${weatherUrl}/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getWeather }