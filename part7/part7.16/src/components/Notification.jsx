//Importing the useSelector hook.
import { useSelector } from 'react-redux'

/*Defining the Notification component containing a message to be displayed,
when an operation is completed and setting a css-style to the div element
according to the type of message to be displayed. The 2 usable styles are
defined as inline styles successStyle and errorStyle */
const Notification = () => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '18px,',
        borderStyle: 'solid',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '25px',
    }
    const errorStyle = {
        color: 'darkred',
        background: 'lightgrey',
        fontSize: '18px,',
        borderStyle: 'solid',
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '25px',
    }

    //Getting the notification object state from the store.
    const notification = useSelector((state) => state.notification)

    /*If no message is defined, nothing is returned. If a message
    is defined the display style is defined according to the
    type of message displayed. */
    if (notification.message === null || notification.message === undefined) {
        return null
    } else {
        if (notification.error === false) {
            return (
                <div className="successMsg" style={successStyle}>
                    {notification.message}
                </div>
            )
        }
        if (notification.error === true) {
            return (
                <div className="errorMsg" style={errorStyle}>
                    {notification.message}
                </div>
            )
        }
    }
}

export default Notification
