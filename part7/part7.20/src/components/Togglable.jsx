/*Importing the useState and useImperativeHandle hooks,
as well as forwardRef function. Also importing prop-types
and the Button component from react-bootstrap. */
import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

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
            toggleVisibility,
        }
    })

    //Returning the necessary buttons to show and hide a child component.
    return (
        <div>
            <div style={hideWhenVisible}>
                <Button variant='success' onClick={toggleVisibility}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <br />
                <Button variant='outline-secondary' onClick={toggleVisibility}>Cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

//Using prop-types to give a warning if necessary values are not received correctly.
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
