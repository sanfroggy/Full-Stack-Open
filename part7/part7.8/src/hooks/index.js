//Importing useState hook and axios library.
import { useState } from 'react'
import axios from 'axios'

//Defining a custom useResource hook to handle input field props.
const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    /*Defining a function to get existing data of a resource
    from db.json through JSON server and set current the value of
    resources variable correspondingly. */
    const get = () => {
        const request = axios.get(baseUrl)
        request.then(response => {
            if (response.status === 200) {
                setResources(response.data)
            }
        })
    }

    /*Defining a function to post a new resource to db.json 
    through JSON server and set current the value of
    resources variable correspondingly with concat. */
    const create = (resource) => {
        const request = axios.post(baseUrl, resource)
        request.then(response => { 
            if (response.status === 204) {
                setResources(resources.concat(response.data))
            }
        })
    }

    //Defining a service object, which holds the defined get and create services.
    const service = {
        create,
        get
    }

    return [
        resources,
        service
    ]
}

//Defining a custom useField hook to handle input field props.
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

export { useResource, useField }
