/*Importing the useState and useImperativeHandle hooks,
as well as forwardRef function. */
import { useState, useImperativeHandle, forwardRef } from 'react'

//Defining the Togglable component.
const Togglable = forwardRef((props, ref) => {

    /*Defining the visible "state variable" and 2 inline css styles,
    used to make the component visible and hidden. */
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    /*Defining a function to give the visible "state variable"
    the opposite of it's current value. */
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    /*Using useImperativeHandle hook to allow other components
    to use the toggleVisibility method. */
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    //Returning the necessary buttons to show and hide a child component.
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <br />
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
