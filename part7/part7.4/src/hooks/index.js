//Importing useState hook.
import { useState } from "react"

/*Creating a custom hook meant for form input
handling called useField. input type received as
a parameter. */
const useField = (type) => {

    //Defining the value "state variable" and onChange functions.
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    /*Returning all variables and onChange function, so that the
    field can easily be given the required props with the spread syntax. */
    return {
        type,
        value,
        onChange,
    }
}

//Exporting the custom useField hook.
export { useField }
