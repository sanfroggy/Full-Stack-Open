import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

//Creating a function to return all countries from the restcountries api.
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }