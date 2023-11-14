//Importing useState hook.
import { useState } from "react"

/*Creating a custom hook meant for form input
handling called useField. input type received as
a parameter. */
const useField = (type) => {

    //Defining the value "state variable", onChange and reset functions.
    const [value, setValue] = useState('')

    //Set value variable to the value of the input field.
    const onChange = (event) => {
        setValue(event.target.value)
    }

    //Set the input field value to an empty string.
    const reset = () => {
        setValue('')
    }

    /*Putting all variables and functions to be passed as props,
    to the input field into an object that is then returned. */
    const objectProps = {
        type,
        value,
        onChange
    }

    /*Returning all variables with onChange function and the reset function, 
    so that the field can easily be given the required props with the 
    spread syntax and also so that it can easily be reset. */
    return {
        objectProps,
        reset
    }
}

//Exporting the custom useField hook.
export { useField }
